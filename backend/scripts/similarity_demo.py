"""
Similarity demo for RAG Lesson 2 — What are Embeddings?

Embeds a handful of phrases with the same model the book tutor uses
(text-embedding-3-small) and prints pairwise cosine similarity, so the
"meaning, not words" point can be shown live instead of claimed.

Run from backend/:  .venv/bin/python scripts/similarity_demo.py
"""
import asyncio
import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from src.services.embedding_service import embedding_service

PHRASES = [
    "I want my money back",          # refund intent, plain English
    "refund policy",                 # refund intent, keyword style
    "paisa wapas chahiye",           # refund intent, Roman Urdu
    "how do I embed a document?",    # unrelated technical question
    "aaj cricket ka match hai",      # unrelated, Roman Urdu
]


def cosine(a: list[float], b: list[float]) -> float:
    dot = sum(x * y for x, y in zip(a, b))
    norm_a = math.sqrt(sum(x * x for x in a))
    norm_b = math.sqrt(sum(x * x for x in b))
    return dot / (norm_a * norm_b)


async def main() -> None:
    print(f"Model: {embedding_service.model} ({embedding_service.dimensions} dimensions)\n")
    vectors = await embedding_service.batch_generate(PHRASES)

    print(f"Each phrase became a vector of {len(vectors[0])} numbers.")
    print(f"First 5 numbers of phrase 1: {[round(v, 4) for v in vectors[0][:5]]}\n")

    print("Pairwise cosine similarity (1.0 = identical meaning):\n")
    width = max(len(p) for p in PHRASES)
    for i, a in enumerate(PHRASES):
        for j in range(i + 1, len(PHRASES)):
            score = cosine(vectors[i], vectors[j])
            print(f"  {a:<{width}}  vs  {PHRASES[j]:<{width}}  ->  {score:.3f}")
        print()


if __name__ == "__main__":
    asyncio.run(main())
