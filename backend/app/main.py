from datetime import datetime, timezone
from typing import Any

import httpx
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(title="Friday API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


OLLAMA_URL = "http://localhost:11434"
GENERATION_MODEL = "llama3.2:latest"
EMBEDDING_MODEL = "nomic-embed-text:latest"


_documents: list[dict[str, Any]] = [
    {
        "id": "doc-1",
        "name": "Vector databases explained.pdf",
        "type": "PDF",
        "size": "2.4 MB",
        "chunks": 18,
    },
    {
        "id": "doc-2",
        "name": "HNSW research notes.md",
        "type": "MD",
        "size": "18 KB",
        "chunks": 7,
    },
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
    return {
        "status": "ok",
        "service": "friday-api",
    }


@app.get("/api/status")
async def status() -> dict[str, Any]:
    ollama_status = "offline"

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(f"{OLLAMA_URL}/api/tags")
            response.raise_for_status()
            ollama_status = "online"
    except Exception:
        ollama_status = "offline"

    return {
        "ollama": ollama_status,
        "embedding_model": EMBEDDING_MODEL,
        "generation_model": GENERATION_MODEL,
        "documents": len(_documents),
    }


@app.get("/api/documents")
def list_documents() -> list[dict[str, Any]]:
    return _documents


@app.post("/api/documents/upload")
async def upload_document(file: UploadFile = File(...)) -> dict[str, Any]:
    content = await file.read()

    document = {
        "id": f"doc-{len(_documents) + 1}",
        "name": file.filename or "untitled",
        "type": (file.filename or "").split(".")[-1].upper(),
        "size": f"{len(content) / 1024:.0f} KB",
        "chunks": 0,
    }

    _documents.append(document)

    return document


@app.post("/api/search")
def search(request: SearchRequest) -> dict[str, Any]:
    return {
        "query": request.query,
        "algorithm": request.algorithm,
        "metric": request.metric,
        "results": [],
        "took_ms": 0.0,
    }


@app.post("/api/chat")
async def chat(request: ChatRequest) -> dict[str, Any]:
    prompt = f"""
You are FRIDAY, a helpful local-first AI developer assistant.

Answer the user's question clearly and concisely.

User question:
{request.question}
""".strip()

    try:
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{OLLAMA_URL}/api/generate",
                json={
                    "model": GENERATION_MODEL,
                    "prompt": prompt,
                    "stream": False,
                },
            )

            response.raise_for_status()
            data = response.json()

        answer = data.get("response", "").strip()

        if not answer:
            answer = "Ollama returned an empty response."

        return {
            "answer": answer,
            "sources": [],
            "created_at": datetime.now(timezone.utc).isoformat(),
        }

    except httpx.ConnectError:
        return {
            "answer": (
                "FRIDAY cannot connect to Ollama. "
                "Make sure Ollama is running on http://localhost:11434."
            ),
            "sources": [],
            "created_at": datetime.now(timezone.utc).isoformat(),
        }

    except httpx.HTTPError as exc:
        return {
            "answer": f"Ollama request failed: {exc}",
            "sources": [],
            "created_at": datetime.now(timezone.utc).isoformat(),
        }

    except Exception as exc:
        return {
            "answer": f"FRIDAY backend error: {exc}",
            "sources": [],
            "created_at": datetime.now(timezone.utc).isoformat(),
        }