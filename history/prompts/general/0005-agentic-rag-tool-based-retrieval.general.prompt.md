---
id: 0005
title: Agentic RAG Tool Based Retrieval
stage: general
date: 2026-07-17
surface: agent
model: claude-fable-5
feature: none
branch: main
user: Shahzain-Ali
command: none
labels: ["phase-2", "agentic-rag", "function-tool", "openai-agents", "industry-standard"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/services/agent_service.py
 - CLAUDE.md
 - src/components/ChatWidget/index.js
tests:
 - Greeting "Hi" → 0 sources
 - Content question (Roman Urdu) → answer + 5 sources (relevance 0.55-0.61)
 - Off-topic joke request → polite decline, 0 sources
---

## Prompt

[User noticed greeting "Hi" returned 5 sources in the widget; asked why. Explained naive RAG prompt-stuffing (inherited robotics flow) vs industry options: A) retrieval-as-tool (agentic RAG), B) relevance threshold, C) intent router. User added the mandatory "Industry Standard Rule" to CLAUDE.md (flag non-standard patterns BEFORE implementation, discuss → decide → implement). Then user approved:] Go for it. [= Option A + B]

Also this session (widget debugging): user reported "Sorry, there was an error processing your request" from the widget — root cause was ChatWidget reading window.__docusaurus.siteConfig (never works) and silently falling back to the old robotics HF Space URL; fixed with useDocusaurusContext hook.

## Response snapshot

Upgraded backend from naive RAG (prompt stuffing) to agentic RAG:
1. `search_book_content` @function_tool — embeds the agent-written query, searches Qdrant, filters by MIN_RELEVANCE_SCORE (0.3), formats chunks with [Source: page — section] headers
2. RetrievalContext dataclass (per-request) collects deduplicated citations from actual tool calls only
3. Agent[RetrievalContext] with tools=[search_book_content]; instructions: always search for content questions, never for greetings/small talk
4. query() simplified — manual embed/search/prompt-stuffing removed; Runner.run(..., context=retrieval_context); sources = what the agent actually retrieved
5. Earlier in session: ChatWidget apiUrl resolution fixed via useDocusaurusContext (removed dead window.__docusaurus path + old robotics fallback URL)

All 3 behavior tests passed (greeting/content/off-topic).

## Outcome

- ✅ Impact: Industry-standard agentic RAG — sources appear only when the agent actually searched the book; resume-worthy architecture (tool-based retrieval, OpenAI Agents SDK)
- 🧪 Tests: 3/3 passed
- 📁 Files: agent_service.py (core refactor), CLAUDE.md (Industry Standard Rule), ChatWidget/index.js (config hook fix)
- 🔁 Next prompts: user re-test in widget; HF Space deploy; production apiUrl wiring; push Phase 2
- 🧠 Reflection: inherited code should be standards-audited at reuse time, not when symptoms surface — now codified as a mandatory CLAUDE.md rule

## Evaluation notes (flywheel)

- Failure modes observed: naive RAG returned sources for greetings; widget silently used dead config path + stale fallback URL
- Graders run and results (PASS/FAIL): greeting PASS, content PASS, off-topic PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): tune MIN_RELEVANCE_SCORE if real usage shows weak citations (observed relevant range 0.55-0.61)
