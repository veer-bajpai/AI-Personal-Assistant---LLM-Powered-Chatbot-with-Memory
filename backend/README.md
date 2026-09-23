# Friday API

FastAPI boundary for document ingestion, semantic search, and RAG chat. The current implementation is intentionally provider-neutral and keeps an in-memory document catalog for local UI development.

Run from the repository root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload --port 8000
```

Ollama integration belongs behind `/api/chat` and `/api/search`. The frontend can run independently while the local engine is offline.
