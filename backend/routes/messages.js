import express from "express";
import sqlite3 from "sqlite3";

const router = express.Router();
const db = new sqlite3.Database("./data.db");

/**
 * 📜 GET /api/messages
 * Fetch all chat messages (user + assistant)
 */
router.get("/", (req, res) => {
  db.all(
    `SELECT * FROM messages ORDER BY id ASC`,
    [],
    (err, rows) => {
      if (err) {
        console.error("❌ DB Fetch Error:", err);
        return res.status(500).json({ error: "Failed to fetch messages." });
      }
      res.json(rows);
    }
  );
});

/**
 * 🧹 DELETE /api/messages
 * Optional — clear the chat history (useful for testing or session resets)
 */
router.delete("/", (req, res) => {
  db.run(`DELETE FROM messages`, function (err) {
    if (err) {
      console.error("❌ DB Delete Error:", err);
      return res.status(500).json({ error: "Failed to clear messages." });
    }

    res.json({ message: "🗑️ Chat history cleared successfully!" });
  });
});

export default router;
