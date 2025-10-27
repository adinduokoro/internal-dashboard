# 🧠 Internal Team Dashboard with AI Assistant

- An internal company dashboard that combines a **Knowledge Base** and a **Chat Assistant** powered by OpenAI.
- Employees can search policies, ask questions, and manage internal knowledge all from one interface — no login required. 
- The AI assistant intelligently answers employee questions by first searching the internal knowledge base, rephrasing relevant answers, and using OpenAI for anything not found.

---

## ⚙️ Setup Instructions

Clone the repository and run the backend and frontend:

```bash
# 1️⃣ Backend Setup
cd backend
npm install
node index.js

# 2️⃣ Frontend Setup
cd frontend
npm install
npm run dev
```

**Environment Variables (create `.env` in `/backend`):**

```
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

---

## 🧩 Tech Stack

| Layer    | Technology                           |
| -------- | ------------------------------------ |
| Frontend | React (Vite)                         |
| Styling  | CSS Modules + Global Theme Variables |
| Backend  | Node.js + Express                    |
| Database | SQLite (persistent Q&A storage)      |
| AI       | OpenAI GPT-4-Turbo (via API)         |

---

## 🚀 Features

✅ **AI Chat Assistant**
Ask questions in plain English — the assistant searches the internal knowledge base first, and if no match is found, it uses OpenAI to generate a response.

✅ **Knowledge Base Management**

* Add, view, and delete entries
* Each entry includes **question**, **answer**, and **tags**

✅ **Smart Filtering & Search**

* Filter entries by tag
* Search dynamically within knowledge base
* Real-time updates after new entry submission

✅ **Interactive UI / UX**

* Clean modern layout
* “Add Entry” modal
* Scrollable chat interface
* Persistent light/dark mode toggle

✅ **AI Integration**

* Uses **semantic retrieval** logic to find the most relevant knowledge entry
* Automatically rephrases answers before responding
* Fallback to OpenAI when no answer is found in the database

---

## 🧠 How It Works

1. The user asks a question in the chat.
2. The backend compares the question against the **knowledge base** (using semantic similarity).
3. If a match is found → it rephrases and responds using that answer.
4. If no match is found → it queries OpenAI’s GPT-4-Turbo API.
5. Responses are displayed in a threaded chat interface.

---

## 🧪 Bonus Features

✨ Tagging System
✨ Search Bar for Instant Filtering
✨ Realtime Knowledge Updates
✨ Dark Mode Toggle (not available)
✨ Conversation Memory for Contextual Answers

---

## 🕒 Time Spent

- Before I started coding, I asked how to structure the entire project from the ground up, and with help from AI tools, I created a clear step-by-step roadmap that broke everything down into phases — from setting up the backend and database to building the frontend, integrating AI, and finishing with the README.

Approx **5 hours total**

| Phase   | Description            | Time   |
| ------- | ---------------------- | ------ |
| Phase 1 | Backend Setup + API    | 1 hr   |

- With help from AI tools, I set up a clean Express backend using SQLite and OpenAI’s API, featuring organized routes for chat, knowledge, and messages with full error handling and environment configuration.

| Phase   | Description            | Time   |
| ------- | ---------------------- | ------ |
| Phase 2 | Database + Routing     | 1 hr   |

- In Phase 2, I set up the database and backend routing with the help from AI tools. We used SQLite to store both the chat history and knowledge base entries. Then, we created Express routes to handle all communication between the frontend and backend. These included routes for the chat system (/api/chat), the knowledge base (/api/knowledge), and message history (/api/messages). I made sure the routes were correct using POSTMAN.

| Phase   | Description            | Time   |
| ------- | ---------------------- | ------ |
| Phase 3 | Chat Integration       | 1.5 hr |

- In Phase 3, I integrated the OpenAI API into the project to power the chat system. With AI help, we built a route that takes user messages, sends them to OpenAI, and then saves both the user’s question and the AI’s response to the SQLite database. We also added proper error handling, API key protection using dotenv, and made sure the chat could pull previous messages from the database for context — completing a fully functional AI-powered chat workflow.

| Phase   | Description            | Time   |
| ------- | ---------------------- | ------ |
| Phase 4 | Frontend Layout        | 1 hr   |

- In Phase 4, I built the frontend structure using React (Vite), using Figma Creator to help design's overall layout and user flow. I did structured the project with key components like ChatBox, Message, Sidebar, and Dashboard, ensuring each one connected smoothly to the backend; however, some componets did get replaced or deleted due to the compatiabiltyiy isues with the figma design. Axios was used to handle API calls, style css was used to design the app with the  the final design matching the Figma concept here --> https://www.figma.com/design/2umQNM7K8uzMzulRT6ZoIj/Untitled?node-id=25-2&m=dev.

| Phase   | Description            | Time   |
| ------- | ---------------------- | ------ |
| Phase 5 | Knowledge Base + Modal | 0.5 hr |

- In Phase 5, I utlizied Cursor to integrated the Knowledge Base and build the Add Entry modal. I connected the frontend to the backend API so users could add, view, and delete knowledge entries in real time. The modal allows new Q&A pairs (with tags) to be saved to the database, while the Knowledge List dynamically updates through API calls. I also added search and tag filtering features, ensuring the AI assistant could reference this stored data before using OpenAI — making the system smarter and more context-aware.

| Phase   | Description            | Time   |
| ------- | ---------------------- | ------ |
| Phase 6 | README + Cleanup       | 0.5 hr |

- Final checks. 

--- 

## 💡 Next Improvements

🔹 Add authentication (admin vs employee roles)
🔹 Add analytics (usage stats, top searched terms)
🔹 Integrate vector embeddings for deeper semantic matching
🔹 Save chat history per session
🔹 Add feedback/rating system for AI responses

---

## 🧑‍💻 Developer Notes

Built by **Adindu Okoro**
Project Type: Internal Tool / AI Assistant
Framework: **Full-Stack (MERN + OpenAI)**
Version: 1.0.0
License: MIT


