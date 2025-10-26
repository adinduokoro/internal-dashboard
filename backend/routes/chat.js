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

router.post("/", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    // 🧠 Build the conversation context
    const messages = [
      {
        role: "system",
        content:
          "You are an internal AI assistant that helps summarize meeting notes and answer process-related questions. Be concise and professional.",
      },
      ...(history || []),
      { role: "user", content: message },
    ];

    // 🤖 Send request to OpenAI
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
    res.json({ reply });
  } catch (err) {
    console.error("❌ Chat route error:", err);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

export default router;
