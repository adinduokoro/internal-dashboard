import express from "express";
import sqlite3 from "sqlite3";

const router = express.Router();
const db = new sqlite3.Database("./data.db");

/**
 * 📥 POST /api/knowledge
 * Save a new Q&A entry (question, answer, tags)
 */
router.post("/", (req, res) => {
  const { question, answer, tags } = req.body;

  if (!question || !answer) {
    return res
      .status(400)
      .json({ error: "Both question and answer fields are required." });
  }

  const tagString = Array.isArray(tags) ? tags.join(",") : tags || "";

  db.run(
    `INSERT INTO knowledge_base (question, answer, tags) VALUES (?, ?, ?)`,
    [question, answer, tagString],
    function (err) {
      if (err) {
        console.error("❌ DB Insert Error:", err);
        return res.status(500).json({ error: "Failed to save knowledge entry." });
      }

      res.json({
        id: this.lastID,
        message: "✅ Knowledge entry saved successfully!",
      });
    }
  );
});

/**
 * 📤 GET /api/knowledge
 * Retrieve all Q&A entries (with optional tag filtering)
 */
router.get("/", (req, res) => {
  const { tag } = req.query;

  let query = "SELECT * FROM knowledge_base ORDER BY created_at DESC";
  let params = [];

  if (tag) {
    query = "SELECT * FROM knowledge_base WHERE tags LIKE ? ORDER BY created_at DESC";
    params.push(`%${tag}%`);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("❌ DB Fetch Error:", err);
      return res.status(500).json({ error: "Failed to fetch knowledge entries." });
    }

    res.json(rows);
  });
});

/**
 * 🗑️ DELETE /api/knowledge/:id
 * Optional — delete a knowledge entry by ID
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM knowledge_base WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error("❌ DB Delete Error:", err);
      return res.status(500).json({ error: "Failed to delete knowledge entry." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Entry not found." });
    }

    res.json({ message: "🗑️ Knowledge entry deleted successfully!" });
  });
});

export default router;
