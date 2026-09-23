This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Friday

Friday is a local-first personal AI workspace for semantic search and retrieval-augmented chat. It recreates the educational core of the reference VectorDB project while giving it a focused product interface: conversations, document context, model status, history, activity, and a clean upload workflow.

![Friday assistant workspace](public/friday-preview.svg)

## Product surface

- ChatGPT/Claude-style conversation workspace with source chips and retrieval settings
- Document and image attachment surface, ready for multipart upload
- Documents, activity, and history navigation states
- Local engine status for Ollama, embedding model, generation model, and HNSW retrieval
- Responsive desktop and mobile navigation
- FastAPI boundary for health, document upload, semantic search, and RAG chat

## Architecture blueprint

```text
Browser (Next.js App Router)
	|
	| REST /api
	v
FastAPI service (backend/app/main.py)
	|
	+--> Document ingestion and chunking
	+--> Embedding provider: Ollama / nomic-embed-text
	+--> Vector index: HNSW (with KD-tree and brute-force comparison)
	+--> Generation provider: Ollama / llama3.2
	+--> Sources returned with every RAG answer
```

The reference project implements HNSW, KD-tree, and brute-force search in C++. This workspace keeps that algorithmic direction as the engine contract while separating the UI and API layers so the vector implementation can be swapped in without redesigning the product.

## Requirements

- Node.js 20+
- npm 10+
- Python 3.11+
- Optional: Ollama with `nomic-embed-text` and `llama3.2`

## Local setup

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

To run the API in another terminal:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload --port 8000
```

For local RAG, install Ollama and run:

```powershell
ollama pull nomic-embed-text
ollama pull llama3.2
```

## Project structure

```text
FRIDAY/
├── backend/
│   ├── app/main.py          # FastAPI endpoints and local document catalog
│   └── requirements.txt
├── public/                  # Static assets
├── src/app/
│   ├── page.tsx             # Assistant workspace UI
│   ├── globals.css          # Design system and responsive layout
│   └── layout.tsx           # Metadata and app shell
├── .env.example
└── .github/workflows/ci.yml
```

## Validation

```powershell
npm run lint
npm run build
python -m compileall backend
```

## Design direction

Friday uses a restrained research-console aesthetic: warm off-white canvas, pale sage navigation, quiet borders, compact typography, and green status accents reserved for live local capabilities. The interface is intentionally dense enough for repeated work while leaving the conversation readable.

## License

MIT. See the reference project for the original educational VectorDB concept and algorithm notes.
