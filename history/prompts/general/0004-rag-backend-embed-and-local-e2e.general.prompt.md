---
id: 0004
title: RAG Backend Embed And Local E2E
stage: general
date: 2026-07-17
surface: agent
model: claude-fable-5
feature: none
branch: main
user: Shahzain-Ali
command: none
labels: ["phase-2", "rag", "qdrant", "openai-agents", "embeddings", "e2e-test"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/services/agent_service.py
 - backend/src/services/vector_service.py
 - backend/src/main.py
 - backend/requirements.txt
tests:
 - POST /api/chat English question → correct answer citing lesson-03 Save vs Publish
 - POST /api/chat Roman Urdu question → Roman Urdu answer, source urls n8n-mastery/lesson-02
 - GET /api/history → 4 messages persisted in Neon
 - Off-topic question politely declined
---

## Prompt

All credentials are set. [Earlier: user confirmed accounts on Qdrant/OpenAI/Neon/HF, got naming scheme (agentive-book-*), created .env at project root. Mid-work correction: branding must stay platform-level (Agentive Solutions), not "(n8n Mastery)" — the platform will expand to more courses. Also asked difference between text-embedding-3-small vs 3-large — explained small is right fit; corpus size is irrelevant to model choice.]

## Response snapshot

Phase 2 backend brought live locally:
1. Agent system prompt rewritten platform-level (Agentive Solutions library, bilingual English/Roman Urdu answering, off-topic = anything unrelated to book content); main.py description likewise
2. venv + requirements installed (Python 3.12)
3. setup_qdrant.py → book_content collection (1536 dims, Cosine); embed_content.py → 5 pages, 95 chunks, ~15k tokens (~$0.0003 actual)
4. Fixed two breakages from newer libs: qdrant-client removed .search() → migrated both call sites in vector_service.py to query_points(); openai-agents 0.6.3 incompatible with openai 2.46 (InputTokensDetails.cache_write_tokens) → upgraded openai-agents to 0.18.3; requirements.txt pins updated (openai>=2.46.0, openai-agents>=0.18.3, qdrant-client>=1.12.0)
5. E2E tests all passed (English, Roman Urdu, session history in Neon, off-topic decline, citation urls resolve to /docs/n8n-mastery/lesson-NN)
6. Dev site started with REACT_APP_API_URL=http://localhost:8000 for in-browser widget testing

## Outcome

- ✅ Impact: RAG chatbot fully working locally against new Qdrant collection with n8n Mastery content
- 🧪 Tests: 4/4 E2E chat tests passed
- 📁 Files: 4 backend files modified
- 🔁 Next prompts: browser widget test; HF Space deploy; apiUrl fallback wiring + config; push Phase 2 changes
- 🧠 Reflection: fresh installs of loosely-pinned deps broke two APIs — version pins in requirements.txt now reflect the tested combination

## Evaluation notes (flywheel)

- Failure modes observed: AsyncQdrantClient.search removed; openai-agents/openai version mismatch (pydantic validation error)
- Graders run and results (PASS/FAIL): chat EN PASS, chat Roman Urdu PASS, history PASS, off-topic PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): tighten CORS allow_origins to the GitHub Pages domain before production deploy
