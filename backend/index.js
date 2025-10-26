import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';

import chatRoutes from "./routes/chat.js";
import knowledgeRoutes from "./routes/knowledge.js";

dotenv.config();
console.log("Loaded OpenAI Key:", process.env.OPENAI_API_KEY ? "✅ Found" : "❌ Missing");

const app = express();
app.use(cors());
app.use(express.json());
const db = new sqlite3.Database('./data.db');

app.use("/api/chat", chatRoutes);
app.use("/api/knowledge", knowledgeRoutes);

app.listen(5000, () => console.log('✅ Server running on port 5000'));
