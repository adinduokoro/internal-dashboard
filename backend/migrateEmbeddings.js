import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const db = new sqlite3.Database('./data.db');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

console.log('🔄 Starting embedding migration for existing KB entries...');

// Fetch all entries without embeddings
db.all("SELECT id, question, tags FROM knowledge_base WHERE embedding IS NULL OR embedding = ''", [], async (err, rows) => {
  if (err) {
    console.error('❌ Error fetching entries:', err);
    db.close();
    return;
  }

  if (rows.length === 0) {
    console.log('✅ No entries need embedding generation');
    db.close();
    return;
  }

  console.log(`📝 Found ${rows.length} entries without embeddings. Generating embeddings...`);

  for (const entry of rows) {
    try {
      console.log(`🔍 Generating embedding for entry ${entry.id}: "${entry.question}"`);
      
      const comparisonText = `${entry.question} ${entry.tags || ''}`;
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-large",
        input: comparisonText,
      });
      
      const embedding = JSON.stringify(embeddingResponse.data[0].embedding);
      
      // Update the entry with the embedding
      await new Promise((resolve, reject) => {
        db.run(
          'UPDATE knowledge_base SET embedding = ? WHERE id = ?',
          [embedding, entry.id],
          function(updateErr) {
            if (updateErr) {
              reject(updateErr);
            } else {
              console.log(`✅ Generated and stored embedding for entry ${entry.id}`);
              resolve();
            }
          }
        );
      });
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Error generating embedding for entry ${entry.id}:`, error);
    }
  }

  console.log('✅ Migration complete!');
  db.close();
});
