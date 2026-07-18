"""
Rate limiting configuration for the RAG Chatbot backend.

Defined in its own module so both the FastAPI app (main.py) and the
API routers can import the same limiter without circular imports.
"""
from slowapi import Limiter
from slowapi.util import get_remote_address

# Chat messages allowed per client IP — protects the OpenAI budget from
# abuse while staying generous for normal readers (shared IPs count together)
CHAT_RATE_LIMIT = "10/hour"

limiter = Limiter(key_func=get_remote_address)
