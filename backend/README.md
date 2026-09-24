# Friday API

FastAPI service for local document ingestion, retrieval, conversations, collections, settings, and Ollama-backed chat. Data is persisted in `FRIDAY_DATA_DIR` (defaults to `./data`) using SQLite; uploaded files are stored in its `uploads` directory.

## Requirements

- Python 3.11+
- Virtual environment created in the repo root (for example `.venv`)
- `pip install -r backend/requirements.txt`
- Optional local Ollama service at `http://localhost:11434` for chat and embedding generation
- Optional environment variables such as `FRIDAY_DATA_DIR`, `OLLAMA_URL`, and `FRIDAY_ALLOWED_ORIGINS`

Run from the repository root on Windows:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
Push-Location backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
Pop-Location
```

The API is available at `http://localhost:8000`. Interactive documentation is at `http://localhost:8000/docs`, and the health check is `http://localhost:8000/health`.

The backend works without Ollama for browsing, uploads, and lexical retrieval. Chat returns a local fallback message until Ollama is available at `OLLAMA_URL`.

## Chat image upload behavior

The frontend exposes a dedicated image button in the chat composer. That picker is intentionally photo-only and rejects any non-image selection before upload. This keeps the image flow focused on photos while preserving the broader document-upload action for PDFs, Markdown, text, CSV, and other supported files.
