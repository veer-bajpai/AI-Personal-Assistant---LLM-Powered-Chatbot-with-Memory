# Friday API

FastAPI service for local document ingestion, retrieval, conversations, collections, settings, and Ollama-backed chat. Data is persisted in `FRIDAY_DATA_DIR` (defaults to `./data`) using SQLite; uploaded files are stored in its `uploads` directory.

Run from the repository root on Windows:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
Push-Location backend
uvicorn app.main:app --reload --port 8000
Pop-Location
```

The API is available at `http://localhost:8000`. Interactive documentation is at `http://localhost:8000/docs`, and the health check is `http://localhost:8000/health`.

The backend works without Ollama for browsing, uploads, and lexical retrieval. Chat returns a local fallback message until Ollama is available at `OLLAMA_URL`.
