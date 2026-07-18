"""
Agent service for the RAG Chatbot backend.

This module provides the main orchestration service using OpenAI Agents SDK
to combine embedding generation, vector search, and OpenAI API calls to provide
RAG-based responses with source citations.
"""
import os
import uuid
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from datetime import datetime
import asyncio
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from openai import AsyncOpenAI
from agents import Agent, Runner, RunContextWrapper, function_tool
from agents.extensions.memory import SQLAlchemySession

from ..models.database import ChatSession, ChatMessage
from ..models.schemas import ChatRequest, ChatResponse, SourceCitation
from ..utils.validators import sanitize_input, validate_message_content
from .embedding_service import embedding_service
from .vector_service import vector_service


# Load environment variables (override=True forces .env to override system env vars)
load_dotenv(override=True)
# Strip any whitespace/carriage returns from API key
openai_api_key = os.getenv("OPENAI_API_KEY", "").strip()
if openai_api_key:
    print(f"API Key loaded.....")
else:
    print("API Key Not Found!!")
# Initialize OpenAI async client
client = AsyncOpenAI(api_key=openai_api_key)

# Sources below this cosine-similarity score are treated as noise and neither
# shown to the model nor cited to the user
MIN_RELEVANCE_SCORE = 0.3

# Retrieve wide, cite narrow: the model sees all relevant chunks, but the
# user is shown only the top citations
MAX_CITED_SOURCES = 2

# Section titles (lowercased) that must never appear as citations
NON_CITABLE_SECTIONS = {"table of contents"}


@dataclass
class RetrievalContext:
    """Per-request context that collects the sources the agent actually retrieved."""
    sources: List[Dict] = field(default_factory=list)


@function_tool
async def search_book_content(ctx: RunContextWrapper[RetrievalContext], query: str) -> str:
    """Search the Agentive Solutions book for content relevant to the query.

    Use this tool whenever the user asks anything about the book/course content
    (n8n, automation, workflows, lessons, etc.). Do NOT use it for greetings or
    small talk.

    Args:
        query: A focused search query describing what to look up in the book.
    """
    query_embedding = await embedding_service.generate_embedding(query)
    results = await vector_service.search_similar(query_embedding, limit=5)

    relevant = [r for r in results if r["relevance_score"] >= MIN_RELEVANCE_SCORE]
    if not relevant:
        return "No relevant book content found for this query."

    for result in relevant:
        if result["section"].strip().lower() in NON_CITABLE_SECTIONS:
            continue
        citation = SourceCitation(
            page=result["page"],
            section=result["section"],
            url=result["url"],
            relevance_score=result["relevance_score"]
        ).dict()
        # Deduplicate by page + section across multiple tool calls
        if not any(
            s["page"] == citation["page"] and s["section"] == citation["section"]
            for s in ctx.context.sources
        ):
            ctx.context.sources.append(citation)

    return "\n\n".join(
        f"[Source: {r['page']} — {r['section']}]\n{r['text']}" for r in relevant
    )


class AgentService:
    """
    Service class for handling the main chatbot orchestration logic using OpenAI Agents SDK.
    """

    def __init__(self, model: str = "gpt-4o-mini"):
        """
        Initialize the agent service.

        Args:
            model: OpenAI model to use for responses
        """
        self.model = model
        # Initialize the main RAG agent with retrieval as a tool (agentic RAG):
        # the agent decides per message whether book search is needed
        self.agent = Agent[RetrievalContext](
            name="RAG Chatbot",
            instructions="""
            You are the AI tutor for the Agentive Solutions interactive book — a growing library of AI automation and agentic AI courses (n8n, AI agents, and more as new books are added).
            Your purpose is to answer questions about the book content.

            Guidelines:
            1. For any question about the book/course content, ALWAYS use the search_book_content tool first, and answer only from what it returns
            2. Content questions may be in ANY language (English, Roman Urdu, etc.) — a Roman Urdu question about n8n is still a content question; ALWAYS search first. Never claim the book lacks content without searching.
            3. For greetings and small talk, reply briefly and warmly WITHOUT using the tool
            4. If the tool returns no relevant content for the question, say the book doesn't cover it yet
            5. Be accurate and cite sources when possible
            6. Keep responses concise but informative
            7. Language rule (in priority order):
               a. If the user explicitly requests a language (e.g. "answer in Roman Urdu", "reply in Chinese"), reply in THAT language.
               b. Otherwise, reply in the SAME language as the user's most recent message — regardless of the language of the retrieved book content or earlier conversation.
            8. If the question is off-topic (unrelated to the book content), politely decline and ask about book topics
            """,
            model=self.model,
            tools=[search_book_content]
        )

    def get_or_create_session(self, db: Session, user_id: str, session_id: Optional[str] = None) -> ChatSession:
        """
        Get an existing session or create a new one.

        Args:
            db: Database session
            user_id: User identifier
            session_id: Session identifier (if None, creates new)

        Returns:
            ChatSession object
        """
        if session_id:
            # Try to get existing session
            session = db.query(ChatSession).filter(
                ChatSession.id == session_id,
                ChatSession.user_id == user_id
            ).first()

            if session:
                # Update the last accessed time
                session.updated_at = datetime.utcnow()
                db.commit()
                return session
            else:
                # Session ID provided but doesn't exist, create with that ID
                session = ChatSession(
                    id=session_id,
                    user_id=user_id,
                    created_at=datetime.utcnow(),
                    updated_at=datetime.utcnow()
                )
                db.add(session)
                try:
                    db.commit()
                    db.refresh(session)
                    return session
                except Exception as e:
                    db.rollback()
                    # If there's a duplicate key error, it means another request created it
                    # Try to fetch it again
                    session = db.query(ChatSession).filter(
                        ChatSession.id == session_id,
                        ChatSession.user_id == user_id
                    ).first()
                    if session:
                        return session
                    else:
                        raise e
        else:
            # Create new session with generated ID
            new_session_id = str(uuid.uuid4())
            session = ChatSession(
                id=new_session_id,
                user_id=user_id,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            db.add(session)
            db.commit()
            db.refresh(session)
            return session

    async def query(self, db: Session, chat_request: ChatRequest) -> ChatResponse:
        """
        Process a chat query and return a response with source citations.

        Args:
            db: Database session
            chat_request: Chat request with user message and context

        Returns:
            ChatResponse with AI response and source citations
        """
        # Validate and sanitize input
        is_valid, error_msg = validate_message_content(chat_request.message)
        if not is_valid:
            raise ValueError(error_msg)

        sanitized_message = sanitize_input(chat_request.message)

        # Get or create session
        session = self.get_or_create_session(db, chat_request.user_id, chat_request.session_id)

        # If selected text is provided, include it alongside the question;
        # retrieval itself is handled by the agent via the search tool
        user_input = sanitized_message
        if chat_request.selected_text:
            user_input = f"Context from selected text: {chat_request.selected_text}\n\nQuestion: {sanitized_message}"

        # Get the database URL and convert it to asyncpg format for the Agent SDK
        db_url = os.getenv("NEON_DATABASE_URL", "").strip()

        # Convert to asyncpg URL format if it's not already in the async format
        if db_url.startswith("postgresql://"):
            db_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)
        elif db_url.startswith("postgres://"):
            db_url = db_url.replace("postgres://", "postgresql+asyncpg://", 1)

        # For Neon connections, we might need to remove SSL parameters that asyncpg doesn't support
        # Remove sslmode and other parameters that asyncpg doesn't recognize
        if "?sslmode=" in db_url:
            # Split the URL to remove problematic parameters
            base_url = db_url.split('?')[0]
            # Add back only the parameters that asyncpg supports
            db_url = base_url

        # Create SQLAlchemy session for conversation history
        # This will maintain context across multiple interactions
        sql_session = SQLAlchemySession.from_url(
            session.id,
            url=db_url,
            create_tables=True
        )

        # Run the agent; it decides whether to call the search tool, and the
        # RetrievalContext collects only the sources it actually retrieved
        retrieval_context = RetrievalContext()
        result = await Runner.run(
            self.agent,
            user_input,
            session=sql_session,
            context=retrieval_context
        )

        # Extract the response and the sources the agent actually used —
        # cite only the top few by relevance
        response_text = result.final_output
        sources = sorted(
            retrieval_context.sources,
            key=lambda s: s.get("relevance_score", 0),
            reverse=True,
        )[:MAX_CITED_SOURCES]

        # Create chat message in database
        user_message = ChatMessage(
            session_id=session.id,
            role="user",
            content=sanitized_message,
            selected_text=chat_request.selected_text,
            sources=sources,  # Store sources in message (already dict format)
            metadata_={}  # Empty metadata for now
        )
        db.add(user_message)

        # Create AI response message
        ai_message = ChatMessage(
            session_id=session.id,
            role="assistant",
            content=response_text,
            sources=sources,  # Store sources in AI message too (already dict format)
            metadata_={}  # Empty metadata for now
        )
        db.add(ai_message)
        db.commit()

        # Return the response with sources and session info
        return ChatResponse(
            response=response_text,
            sources=sources,
            session_id=session.id,
            timestamp=datetime.utcnow()
        )

    async def get_conversation_history(self, db: Session, session_id: str, limit: int = 10, offset: int = 0) -> List[ChatMessage]:
        """
        Retrieve conversation history for a session.

        Args:
            db: Database session
            session_id: Session identifier
            limit: Maximum number of messages to return
            offset: Number of messages to skip

        Returns:
            List of ChatMessage objects
        """
        messages = db.query(ChatMessage)\
            .filter(ChatMessage.session_id == session_id)\
            .order_by(ChatMessage.timestamp.desc())\
            .offset(offset)\
            .limit(limit)\
            .all()

        # Reverse to get chronological order (oldest first)
        return list(reversed(messages))

    async def process_feedback(self, db: Session, session_id: str, message_id: str, feedback: str) -> bool:
        """
        Process user feedback on a response.

        Args:
            db: Database session
            session_id: Session identifier
            message_id: Message identifier
            feedback: User feedback

        Returns:
            True if successful, False otherwise
        """
        # In a full implementation, this would store feedback for analysis
        # For now, we'll just return True
        return True

    async def reset_session(self, db: Session, session_id: str) -> bool:
        """
        Reset a session by clearing its conversation history.

        Args:
            db: Database session
            session_id: Session identifier

        Returns:
            True if successful, False otherwise
        """
        try:
            # Delete all messages in the session
            db.query(ChatMessage).filter(ChatMessage.session_id == session_id).delete()

            # Update the session's updated_at timestamp
            session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
            if session:
                session.updated_at = datetime.utcnow()
                db.commit()
                return True
            return False
        except Exception as e:
            print(f"Error resetting session: {e}")
            return False


# Global instance for use in other modules
agent_service = AgentService()