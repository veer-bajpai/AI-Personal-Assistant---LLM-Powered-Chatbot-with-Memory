# FRIDAY: Local-First AI Developer & Knowledge Assistant

<p align="center">
  <strong>F.R.I.D.A.Y.</strong><br/>
  <em>Fast Retrieval, Intelligent Dialogue & Autonomous Yield</em>
</p>

<p align="center">
  A local-first AI workspace for conversational assistance, semantic search, document intelligence, and retrieval-augmented generation.
</p>

<p align="center">
   <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-TypeScript-blue?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Ollama-Local%20AI-white?style=for-the-badge" alt="Ollama"/>
  <img src="https://img.shields.io/badge/RAG-Semantic%20Search-purple?style=for-the-badge" alt="RAG"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License"/>
</p>

---

## 🧠 What is Friday?

**Friday** is a local-first personal AI workspace designed to combine conversational AI with document intelligence and semantic retrieval.

Instead of treating an AI assistant as only a chat window, Friday is designed as a complete knowledge workspace where users can:

- 💬 Chat with a local AI assistant
- 📄 Upload and manage documents
- 🔎 Search information semantically
- 🧠 Retrieve relevant document context
- 📚 Ground AI responses in user-provided sources
- 📊 Inspect assistant activity
- 🕘 Access conversation history
- ⚙️ Configure retrieval and model settings
- 🔒 Keep sensitive knowledge inside the local environment

The application is built around a **frontend → API → retrieval → model** architecture, allowing the user interface and AI engine to evolve independently.

## Current local deployment

The supported local setup runs three services:

- Next.js frontend at `http://localhost:3000`
- FastAPI backend at `http://localhost:8000`
- Ollama at `http://localhost:11434` when local AI is enabled

The frontend and backend can be started directly from PowerShell, or together with Docker Compose. SQLite data and uploaded files remain under `data/`, which is ignored by Git.

---

# ✨ Core Capabilities

### 💬 AI Conversation Workspace

Friday provides a modern conversational interface for interacting with the assistant.

Features include:

- Real-time chat composer
- User and assistant message states
- Conversation context
- Source references
- Model information
- Retrieval configuration
- Responsive desktop/mobile interface
- Local assistant status

The frontend communicates with the FastAPI service through REST endpoints.

---

### 📚 Document Intelligence

Friday is designed around a document-aware assistant rather than a generic chatbot.

The document layer provides the foundation for:

```text
Document
   ↓
Text extraction
   ↓
Chunking
   ↓
Embedding generation
   ↓
Vector indexing
   ↓
Semantic retrieval
   ↓
Relevant context
   ↓
LLM
   ↓
Grounded response
```

Documents can become searchable knowledge sources for future conversations.

---

### 🔎 Semantic Search

Traditional keyword search looks for exact words.

Friday is designed to understand the **meaning** behind a query.

For example:

```text
Query:
"How does the system find similar documents?"

        ↓

Semantic representation

        ↓

Vector similarity search

        ↓

Relevant document chunks
```

This allows conceptually related information to be retrieved even when the exact query words do not appear in the source document.

---

### 🧠 Retrieval-Augmented Generation

Friday follows a RAG-oriented architecture:

```text
User Question
      │
      ▼
Query Processing
      │
      ▼
Semantic Retrieval
      │
      ▼
Top-K Relevant Chunks
      │
      ▼
Context Assembly
      │
      ▼
Local LLM
      │
      ▼
Grounded Answer + Sources
```

The backend exposes a chat boundary with configurable retrieval count (`k`) and is structured to support local model integration.

---

# 🏗️ System Architecture

## High-Level Architecture

```text
                         ┌─────────────────────────┐
                         │        USER             │
                         │                         │
                         │  Chat / Search / Upload │
                         └────────────┬────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────┐
                    │      FRIDAY WEB CLIENT       │
                    │                              │
                    │       Next.js + React        │
                    │                              │
                    │  ┌────────────────────────┐  │
                    │  │ Chat                  │  │
                    │  │ Documents             │  │
                    │  │ Activity              │  │
                    │  │ History               │  │
                    │  │ Library                │  │
                    │  │ Settings               │  │
                    │  └────────────────────────┘  │
                    └──────────────┬───────────────┘
                                   │
                              REST / JSON
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │       FASTAPI BACKEND        │
                    │                              │
                    │      Python API Layer        │
                    │                              │
                    │  /health                     │
                    │  /api/status                 │
                    │  /api/documents              │
                    │  /api/documents/upload       │
                    │  /api/search                 │
                    │  /api/chat                   │
                    │  /api/chat/stream            │
                    │  /api/conversations          │
                    │  /api/collections            │
                    │  /api/settings               │
                    └──────────────┬───────────────┘
                                   │
                 ┌─────────────────┼─────────────────┐
                 │                 │                 │
                 ▼                 ▼                 ▼
        ┌────────────────┐ ┌───────────────┐ ┌─────────────────┐
        │ Document       │ │ Vector Search │ │ LLM Generation │
        │ Pipeline       │ │ Engine        │ │                 │
        │                │ │               │ │ Ollama          │
        │ Upload         │ │ HNSW          │ │ llama3.2        │
        │ Extraction     │ │ KD-Tree       │ │                 │
        │ Chunking       │ │ Brute Force   │ │ Embeddings      │
        └───────┬────────┘ └───────┬───────┘ │ nomic-embed     │
                │                  │         └────────┬────────┘
                └──────────────────┼──────────────────┘
                                   │
                                   ▼
                         ┌─────────────────────┐
                         │   RAG CONTEXT       │
                         │                     │
                         │ Relevant chunks     │
                         │ + metadata          │
                         │ + sources           │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ GROUNDED RESPONSE   │
                         │                     │
                         │ Answer + Sources    │
                         └─────────────────────┘
```

---

# 🔬 Retrieval Architecture

Friday's current retrieval layer ranks indexed chunks with a lightweight lexical scorer. Embeddings are generated during ingestion when Ollama is available and are stored with the chunk for future vector retrieval work.

```text
                         Query
                           │
                           ▼
              ┌─────────────────────────┐
              │      Retrieval Layer    │
              └────────────┬────────────┘
                           │
                           ▼
                 ┌──────────────────┐
                 │ Lexical Ranking  │
                 └────────┬─────────┘
                           │
                           ▼
                    Top-K Chunks
                           │
                           ▼
                    Context Builder
                           │
                           ▼
                         LLM
```

The product UI exposes retrieval count and maximum distance settings. The current backend uses lexical ranking; stored embeddings provide the extension point for a future vector index.

---

# 🧩 Application Architecture

Friday is separated into independent application layers.

```text
FRIDAY
│
├── Presentation Layer
│   └── Next.js / React
│
├── API Layer
│   └── FastAPI
│
├── Retrieval Layer
│   ├── Embeddings
│   ├── Vector Index
│   ├── Similarity Search
│   └── Top-K Retrieval
│
├── Knowledge Layer
│   ├── Documents
│   ├── Chunks
│   ├── Metadata
│   └── Sources
│
└── Intelligence Layer
    ├── Ollama
    ├── Embedding Model
    └── Generation Model
```

This separation makes it possible to replace individual components without rebuilding the entire application.

---

# 🖥️ Frontend Architecture

The frontend is built with:

- **Next.js**
- **React**
- **TypeScript**
- **Lucide React**
- **CSS**

The main workspace currently provides navigation for:

```text
┌─────────────────────────────┐
│ Friday                      │
├─────────────────────────────┤
│ + New conversation          │
│                             │
│ 💬 Chat                     │
│ 📄 Documents                │
│ ⚡ Activity                 │
│ 🗄 History                  │
│                             │
│ Workspace                   │
│ 📁 My Library               │
│ ▦ Collections               │
│                             │
│ Local Engine                │
│ ⚙ Settings                 │
└─────────────────────────────┘
```

The main interface also contains:

- Conversation workspace
- Context panel
- Attached sources
- Model selector
- Retrieval settings
- Document upload surface
- Responsive mobile navigation

The current frontend sends requests to `NEXT_PUBLIC_API_URL`, defaulting to the local FastAPI server at `http://localhost:8000`. Chat uses the streaming endpoint so generated tokens render as they arrive.

---

# ⚙️ Backend Architecture

The backend is implemented using **FastAPI**.

Current API boundary:

| Endpoint                |   Method | Purpose                      |
| ----------------------- | -------: | ---------------------------- |
| `/health`               |      GET | Service health check         |
| `/api/status`           |      GET | Model/engine status          |
| `/api/documents`        |      GET | List documents               |
| `/api/documents/upload` |     POST | Upload a document            |
| `/api/search`           |     POST | Search indexed chunks        |
| `/api/chat`             |     POST | RAG chat interface           |
| `/api/chat/stream`      |     POST | Streaming chat interface     |
| `/api/conversations`    | GET/POST | Conversation history         |
| `/api/collections`      | GET/POST | Document collections         |
| `/api/settings`         |  GET/PUT | Model and retrieval settings |

The API validates question and search lengths, retrieval counts, collection identifiers, model settings, and upload types with Pydantic and FastAPI.

---

# 🤖 Local AI Stack

Friday is designed to support local AI through **Ollama**.

### Embedding Model

```text
nomic-embed-text
```

Used for transforming text into vector representations.

### Generation Model

```text
llama3.2
```

Used as the local language model for generating responses from retrieved context.

Architecture:

```text
                    Ollama
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
  nomic-embed-text             llama3.2
          │                       │
          ▼                       │
     Embeddings                   │
          │                       │
          ▼                       │
     Vector Search                │
          │                       │
          ▼                       │
    Relevant Context ─────────────┘
                  │
                  ▼
               Answer
```

The repository's defaults specify both models as the intended local RAG stack. If Ollama is unavailable, document ingestion still completes and the API remains usable for non-generation features.

---

# 📁 Project Structure

```text
FRIDAY/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   │
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md
│
├── public/
│   ├── file.svg
│   ├── friday-preview.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       ├── login/
│       │   └── page.tsx
│       └── page.tsx
│
├── .env.example
├── docker-compose.yml
├── Dockerfile
├── .gitignore
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

# 🔄 Request Lifecycle

## Chat Request

```text
1. User enters a question
             │
             ▼
2. Next.js chat interface
             │
             ▼
3. POST /api/chat/stream
             │
             ▼
4. FastAPI validates request
             │
             ▼
5. Retrieval layer finds relevant context
             │
             ▼
6. Context is passed to local LLM
             │
             ▼
7. LLM generates response
             │
             ▼
8. API streams tokens and returns sources
             │
             ▼
9. Friday renders the response
```

---

# 📄 Document Request Lifecycle

```text
User
 │
 │ Upload document
 ▼
Next.js
 │
 │ multipart/form-data
 ▼
FastAPI
 │
 ▼
Document ingestion
 │
 ▼
Text extraction
 │
 ▼
Chunking
 │
 ▼
Embedding generation
 │
 ▼
Vector indexing
 │
 ▼
Knowledge Base
 │
 ▼
Available for semantic retrieval
```

---

# 🛠️ Tech Stack

## Frontend

| Technology   | Purpose                        |
| ------------ | ------------------------------ |
| Next.js      | Web application framework      |
| React        | UI component architecture      |
| TypeScript   | Type-safe frontend development |
| Lucide React | UI icons                       |
| CSS          | Responsive product interface   |

## Backend

| Technology | Purpose                 |
| ---------- | ----------------------- |
| Python     | Backend language        |
| FastAPI    | REST API framework      |
| Pydantic   | Request validation      |
| Uvicorn    | ASGI development server |

## AI / Retrieval

| Technology         | Purpose                                |
| ------------------ | -------------------------------------- |
| Ollama             | Local AI runtime                       |
| `nomic-embed-text` | Text embeddings                        |
| `llama3.2`         | Local generation                       |
| SQLite             | Persistent conversations and documents |
| Lexical ranking    | Current chunk retrieval                |

## Engineering

| Technology     | Purpose                     |
| -------------- | --------------------------- |
| Git            | Version control             |
| GitHub         | Source hosting              |
| GitHub Actions | CI automation               |
| npm            | Frontend package management |
| Python venv    | Backend isolation           |

---

# 🚀 Getting Started

## Requirements

Install:

- Node.js 20+
- npm 10+
- Python 3.11+
- Git

Optional for local AI:

- Ollama
- `nomic-embed-text`
- `llama3.2`

These requirements match the current project setup.

---

## 1. Clone the repository

```bash
git clone https://github.com/veer-bajpai/AI-Personal-Assistant-LLM-Powered-Semantic-Search.git
cd AI-Personal-Assistant-LLM-Powered-Semantic-Search
```

---

## 2. Install frontend dependencies

```bash
npm install
```

---

## 3. Configure environment

### Windows PowerShell

```powershell
Copy-Item .env.example .env.local
```

### macOS / Linux

```bash
cp .env.example .env.local
```

Configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

# 🐍 Start the Backend

Create a virtual environment:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r backend/requirements.txt
```

Start FastAPI from the backend package directory:

```powershell
Push-Location backend
uvicorn app.main:app --reload --port 8000
Pop-Location
```

Backend:

```text
http://localhost:8000
```

Health check:

```text
http://localhost:8000/health
```

API documentation:

```text
http://localhost:8000/docs
```

---

# ⚛️ Start the Frontend

Open another terminal:

```powershell
npm run dev
```

Open:

```text
http://localhost:3000
```

For a production-style local run after `npm run build`, use `npm run start`. The project uses standalone output, so `node .next/standalone/server.js` is the equivalent direct command.

---

# 🐳 Run with Docker Compose

Docker Desktop must be running before starting the full stack:

```powershell
docker compose up --build
```

This starts Ollama, FastAPI, and Next.js together. Open `http://localhost:3000`; the API is available at `http://localhost:8000` and Ollama at `http://localhost:11434`.

Stop the stack with:

```powershell
docker compose down
```

The Compose volume keeps Ollama models, while the bind-mounted `data/` directory keeps the Friday database and uploads.

---

# 🦙 Enable Local AI

Install Ollama and download the models:

```bash
ollama pull nomic-embed-text
ollama pull llama3.2
```

Verify:

```bash
ollama list
```

The intended local pipeline is:

```text
Friday
  ↓
FastAPI
  ↓
Ollama
  ├── nomic-embed-text
  │       ↓
  │   Embeddings
  │       ↓
  │   Vector Retrieval
  │
  └── llama3.2
          ↓
      Response Generation
```

---

# 🧪 Validation

Run frontend linting:

```bash
npm run lint
```

Build the production frontend:

```bash
npm run build
```

Validate Python syntax:

```bash
python -m compileall backend
```

---

# 🔐 Privacy Model

Friday is designed around a **local-first AI architecture**.

When configured with Ollama:

```text
User
 │
 ▼
Friday UI
 │
 ▼
Local FastAPI
 │
 ▼
Local Retrieval
 │
 ▼
Local Ollama
 │
 ▼
Local Response
```

The goal is to allow personal documents and knowledge to remain within the user's own environment rather than requiring every interaction to be sent to a hosted AI provider.

> Local execution depends on how the application is configured and which external services are enabled.

---

# 🧱 Engineering Principles

Friday follows several architectural principles.

### 1. Separation of concerns

```text
UI ≠ API ≠ Retrieval ≠ Model
```

Each layer should have a clear responsibility.

### 2. Model independence

The frontend should not depend directly on a particular LLM provider.

Instead:

```text
Frontend
   ↓
API
   ↓
AI abstraction
   ↓
Model provider
```

This makes it possible to change models without redesigning the application.

### 3. Retrieval-first AI

Instead of asking the model to remember everything:

```text
Question
   ↓
Retrieve relevant knowledge
   ↓
Give context to model
   ↓
Generate answer
```

### 4. Source-aware responses

RAG responses should retain the relationship between:

```text
Answer
  ↕
Retrieved context
  ↕
Original document
```

This makes responses easier to inspect and validate.

---

# 🗺️ Roadmap

## Phase 1 — Foundation

- [x] Next.js application
- [x] Responsive assistant interface
- [x] Login screen
- [x] Chat workspace
- [x] Documents view
- [x] Activity view
- [x] History view
- [x] FastAPI backend
- [x] Health endpoint
- [x] Document API
- [x] Search API boundary
- [x] Chat API boundary

## Phase 2 — Retrieval Engine

- [x] Document ingestion
- [x] PDF, Markdown, text, CSV, and image uploads
- [x] Text chunking
- [x] Optional Ollama embedding pipeline
- [x] SQLite persistence
- [x] Retrieval API
- [ ] Persistent vector index
- [ ] Retrieval benchmarking

## Phase 3 — RAG

- [x] Context assembly
- [x] Top-K retrieval
- [x] Prompt construction
- [x] Source metadata in API responses
- [x] Streaming responses
- [ ] Citation rendering in the UI
- [ ] Context-window optimization
- [ ] Hallucination reduction

## Phase 4 — Personal Memory

- [x] Conversation persistence
- [ ] Long-term memory
- [x] Model and retrieval settings
- [x] Document collections
- [ ] Conversation search

## Phase 5 — Developer Agent

- [ ] Repository ingestion
- [ ] Codebase indexing
- [ ] Semantic code search
- [ ] File-aware context
- [ ] Code understanding
- [ ] Tool calling
- [ ] Terminal integration
- [ ] Git integration
- [ ] Agentic workflows

## Phase 6 — Production

- [ ] Authentication
- [ ] Persistent database
- [ ] Background processing
- [ ] Streaming responses
- [ ] Observability
- [ ] Rate limiting
- [ ] Secure file handling
- [x] Local Docker Compose deployment
- [ ] Production CI/CD

---

# 🎯 Long-Term Vision

Friday is intended to evolve from a **local AI chat interface** into a complete personal AI system.

```text
                    ┌─────────────────────┐
                    │       FRIDAY        │
                    │   Personal AI OS    │
                    └──────────┬──────────┘
                               │
       ┌───────────────────────┼────────────────────────┐
       │                       │                        │
       ▼                       ▼                        ▼
 ┌───────────┐          ┌─────────────┐          ┌─────────────┐
 │ Knowledge │          │ Conversation│          │ Developer   │
 │   Engine  │          │    Engine   │          │   Agent     │
 └─────┬─────┘          └──────┬──────┘          └──────┬──────┘
       │                       │                        │
       ▼                       ▼                        ▼
 Documents                Memory                  Codebases
 Embeddings               History                 Repositories
 Vector Search             Context                 Tools
 RAG                       Personas                Automation
       │                       │                        │
       └───────────────────────┼────────────────────────┘
                               │
                               ▼
                       ┌───────────────┐
                       │ Local Models  │
                       │    Ollama     │
                       └───────────────┘
```

The ultimate goal is to build an assistant that can understand a user's **documents, conversations, knowledge, and software projects** while keeping the core intelligence locally controllable.

---

# 🤝 Contributing

Contributions, ideas, bug reports, and architecture discussions are welcome.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a pull request.

---

# 📜 License

MIT License.

See the `LICENSE` file for details.

---

# 👨‍💻 Author

**Veer Bajpai**

GitHub:
https://github.com/veer-bajpai

Project:
https://github.com/veer-bajpai/AI-Personal-Assistant-LLM-Powered-Semantic-Search

---

<p align="center">
  <strong>FRIDAY</strong><br/>
  <em>Local intelligence. Semantic memory. One workspace.</em>
</p>
