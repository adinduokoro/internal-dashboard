import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { openai } from 'openai';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const db = new sqlite3.Database('./data.db');

// routes will go here...

app.listen(5000, () => console.log('Server running on port 5000'));
