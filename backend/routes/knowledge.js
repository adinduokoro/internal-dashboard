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

  // First, check the current count of entries
  db.get("SELECT COUNT(*) as count FROM knowledge_base", [], (err, row) => {
    if (err) {
      console.error("❌ DB Count Error:", err);
      return res.status(500).json({ error: "Failed to check knowledge base count." });
    }

    const currentCount = row.count;
    const maxEntries = 50;

    if (currentCount >= maxEntries) {
      return res.status(400).json({ 
        error: `Knowledge base is at maximum capacity (${maxEntries} entries). Please delete some entries before adding new ones.` 
      });
    }

    // Proceed with insertion if under the limit
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
          count: currentCount + 1,
          maxEntries: maxEntries
        });
      }
    );
  });
});

/**
 * 📤 GET /api/knowledge
 * Retrieve all Q&A entries (with optional tag filtering and search)
 */
router.get("/", (req, res) => {
  const { tag, search } = req.query;

  let query = "SELECT * FROM knowledge_base";
  let conditions = [];
  let params = [];

  // Add tag filtering
  if (tag) {
    conditions.push("tags LIKE ?");
    params.push(`%${tag}%`);
  }

  // Add search functionality (searches both question and answer)
  if (search) {
    conditions.push("(question LIKE ? OR answer LIKE ?)");
    params.push(`%${search}%`, `%${search}%`);
  }

  // Build the complete query
  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND ");
  }
  
  query += " ORDER BY created_at DESC";

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("❌ DB Fetch Error:", err);
      return res.status(500).json({ error: "Failed to fetch knowledge entries." });
    }

    // Get total count for limit information
    db.get("SELECT COUNT(*) as count FROM knowledge_base", [], (countErr, countRow) => {
      if (countErr) {
        console.error("❌ DB Count Error:", countErr);
        return res.json(rows); // Return entries without count info if count fails
      }

      res.json({
        entries: rows,
        count: countRow.count,
        maxEntries: 50,
        canAddMore: countRow.count < 50
      });
    });
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
