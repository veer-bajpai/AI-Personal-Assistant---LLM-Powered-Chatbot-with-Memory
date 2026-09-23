from datetime import datetime, timezone
from typing import Any

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Friday API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_documents: list[dict[str, Any]] = [
    {"id": "doc-1", "name": "Vector databases explained.pdf", "type": "PDF", "size": "2.4 MB", "chunks": 18},
    {"id": "doc-2", "name": "HNSW research notes.md", "type": "MD", "size": "18 KB", "chunks": 7},
]


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=4000)
    k: int = Field(default=3, ge=1, le=10)


class SearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=1000)
    k: int = Field(default=5, ge=1, le=20)
    algorithm: str = "hnsw"
    metric: str = "cosine"


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "friday-api"}


@app.get("/api/status")
def status() -> dict[str, Any]:
    return {"ollama": "offline", "embedding_model": "nomic-embed-text", "generation_model": "llama3.2", "documents": len(_documents)}


@app.get("/api/documents")
def list_documents() -> list[dict[str, Any]]:
    return _documents


@app.post("/api/documents/upload")
async def upload_document(file: UploadFile = File(...)) -> dict[str, Any]:
    content = await file.read()
    document = {"id": f"doc-{len(_documents) + 1}", "name": file.filename or "untitled", "type": (file.filename or "").split(".")[-1].upper(), "size": f"{len(content) / 1024:.0f} KB", "chunks": 0}
    _documents.append(document)
    return document


@app.post("/api/search")
def search(request: SearchRequest) -> dict[str, Any]:
    return {"query": request.query, "algorithm": request.algorithm, "metric": request.metric, "results": [], "took_ms": 0.0}


@app.post("/api/chat")
def chat(request: ChatRequest) -> dict[str, Any]:
    return {"answer": "Connect Ollama to enable local RAG responses.", "sources": [], "created_at": datetime.now(timezone.utc).isoformat()}
