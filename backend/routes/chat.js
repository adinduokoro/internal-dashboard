import dotenv from "dotenv";
dotenv.config();

import express from "express";
import sqlite3 from "sqlite3";
import OpenAI from "openai";

const router = express.Router();
const db = new sqlite3.Database("./data.db");

// ✅ Initialize OpenAI (key is now guaranteed to load properly)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
console.log("✅ OpenAI Key Loaded:", !!process.env.OPENAI_API_KEY);

// 📝 Store last KB context per session for follow-up questions
const sessionContexts = new Map();

/**
 * Calculate cosine similarity between two vectors
 */
function cosineSimilarity(vecA, vecB) {
  if (vecA.length !== vecB.length) {
    throw new Error("Vectors must have the same length");
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
}

/**
 * Check if a message looks like a follow-up question
 */
function isFollowUpQuestion(message) {
  const followUpPatterns = [
    /^(how many|how much|when|where|who|what about|what if|can you|will it|does it)/i,
    /^(tell me more|explain|elaborate)/i,
    /^(also|additionally|furthermore)/i,
  ];
  
  return followUpPatterns.some(pattern => pattern.test(message.trim()));
}

/**
 * Get embedding for text using OpenAI
 */
async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: text,
  });
  return response.data[0].embedding;
}

/**
 * Rephrase KB answer naturally using OpenAI
 */
async function rephraseAnswer(answer) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Rephrase the following answer conversationally and naturally for clarity. Keep it concise and professional.",
        },
        {
          role: "user",
          content: answer,
        },
      ],
      temperature: 0.7,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("❌ Error rephrasing answer:", error);
    // Return original if rephrasing fails
    return answer;
  }
}

router.post("/", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // Generate a session ID based on conversation history
  const sessionId = history?.length > 0 
    ? `session_${JSON.stringify(history.slice(0, 2).map(m => m.content || m.text)).substring(0, 50)}` 
    : `session_default`;

  try {
    // 🔍 Check if this looks like a follow-up and we have KB context
    const lastKBContext = sessionContexts.get(sessionId);
    if (lastKBContext && isFollowUpQuestion(message)) {
      console.log(`📎 Detected follow-up question, using last KB context: "${lastKBContext.question}"`);
      
      // Use the KB context to answer the follow-up with OpenAI
      console.log("🤖 Using OpenAI with KB context for follow-up...");
      
      const messages = [
        {
          role: "system",
          content: "You are an internal AI assistant. Answer the user's question based on the following context from our knowledge base first.",
        },
        {
          role: "user",
          content: `Context from knowledge base:\n\nQuestion: ${lastKBContext.question}\nAnswer: ${lastKBContext.answer}\n\nNow, the user is asking: ${message}`,
        },
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages,
      });

      const reply = completion.choices[0].message.content;

      // Save messages
      db.run(`INSERT INTO messages (role, content) VALUES (?, ?)`, ["user", message]);
      db.run(`INSERT INTO messages (role, content) VALUES (?, ?)`, ["assistant", reply]);

      return res.json({ 
        reply,
        source: "knowledge-base-context" 
      });
    }

    // 🔍 Step 1: Get embedding for the user's message
    console.log("🔍 Checking knowledge base for relevant matches...");
    const queryEmbedding = await getEmbedding(message);
    
    // 📚 Step 2: Fetch all knowledge base entries with their embeddings
    const knowledgeEntries = await new Promise((resolve, reject) => {
      db.all("SELECT id, question, answer, tags, embedding FROM knowledge_base", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    if (knowledgeEntries.length > 0) {
      console.log(`📚 Found ${knowledgeEntries.length} knowledge base entries, computing similarities...`);

      // 🔍 Step 3: Calculate similarity using stored embeddings
      const similarities = [];
      
      for (const entry of knowledgeEntries) {
        try {
          // Use stored embedding if available
          let kbVector;
          if (entry.embedding) {
            kbVector = JSON.parse(entry.embedding);
          } else {
            // If embedding is missing, skip this entry
            console.log(`⚠️ Missing embedding for entry ${entry.id}, skipping...`);
            continue;
          }
          
          const similarity = cosineSimilarity(queryEmbedding, kbVector);
          
          similarities.push({
            entry,
            similarity,
          });
        } catch (err) {
          console.error("❌ Error processing KB entry:", err);
        }
      }

      // 📊 Step 4: Sort by similarity and get top match
      similarities.sort((a, b) => b.similarity - a.similarity);
      const bestMatch = similarities[0];

      console.log("🎯 Best match:", bestMatch ? `${bestMatch.similarity.toFixed(4)} - "${bestMatch.entry.question}"` : "None");

      // ✅ Step 5: If similarity >= 0.7, use KB answer
      if (bestMatch && bestMatch.similarity >= 0.7) {
        console.log(`✅ Found relevant KB match (similarity: ${bestMatch.similarity.toFixed(4)})`);
        
        // Store KB context for potential follow-ups
        sessionContexts.set(sessionId, {
          question: bestMatch.entry.question,
          answer: bestMatch.entry.answer,
          timestamp: Date.now(),
        });

        // Rephrase the answer naturally
        const rephrasedAnswer = await rephraseAnswer(bestMatch.entry.answer);
        
        console.log("📝 Returning rephrased KB answer");
        
        // Save messages
        db.run(`INSERT INTO messages (role, content) VALUES (?, ?)`, ["user", message]);
        db.run(`INSERT INTO messages (role, content) VALUES (?, ?)`, ["assistant", rephrasedAnswer]);

        return res.json({
          reply: rephrasedAnswer,
          source: "knowledge-base",
        });
      } else {
        console.log("⚠️ No good KB match found (similarity below 0.7), falling back to OpenAI");
      }
    }

    // 🤖 Step 6: Fallback to OpenAI if no good KB match
    console.log("🤖 Proceeding with OpenAI completion...");
    
    const messages = [
      {
        role: "system",
        content:
          "You are an internal AI assistant that helps summarize meeting notes and answer process-related questions. Be concise and professional.",
      },
      ...(history || []),
      { role: "user", content: message },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const reply = completion.choices[0].message.content;

    // 💾 Save both user + assistant messages in SQLite
    db.run(`INSERT INTO messages (role, content) VALUES (?, ?)`, [
      "user",
      message,
    ]);
    db.run(`INSERT INTO messages (role, content) VALUES (?, ?)`, [
      "assistant",
      reply,
    ]);

    // 📤 Return AI reply to frontend
    res.json({ reply, source: "openai" });
  } catch (err) {
    console.error("❌ Chat route error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

export default router;
