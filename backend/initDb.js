import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./data.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS knowledge_base (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT,
      answer TEXT,
      tags TEXT,
      embedding TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Add embedding column if it doesn't exist (for existing databases)
  db.run(`
    ALTER TABLE knowledge_base ADD COLUMN embedding TEXT
  `, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
      console.error('Migration error:', err);
    }
  });
});

db.close();

console.log("✅ Database and tables created successfully!");
