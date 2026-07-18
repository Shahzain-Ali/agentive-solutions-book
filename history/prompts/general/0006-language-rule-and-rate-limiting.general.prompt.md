---
id: 0006
title: Language Rule And Rate Limiting
stage: general
date: 2026-07-17
surface: agent
model: claude-fable-5
feature: none
branch: main
user: Shahzain-Ali
command: none
labels: ["phase-2", "language-mirroring", "tool-reliability", "rate-limiting", "slowapi", "cost-control"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - backend/src/services/agent_service.py
 - backend/src/utils/rate_limit.py
 - backend/src/main.py
 - backend/src/api/chat.py
 - backend/requirements.txt
 - src/components/ChatWidget/index.js
tests:
 - Language: EN→EN, Roman Urdu→Roman Urdu, explicit "answer in Roman Urdu"→Roman Urdu, "reply in Spanish"→Spanish (4/4)
 - Tool reliability: 3/3 Roman Urdu content questions triggered search (5 sources each); greeting 0 sources
 - Rate limit: after 10 chat requests/hour per IP → HTTP 429 with friendly message
---

## Prompt

[Thread of decisions:]
1. User noticed English question got Roman Urdu answer; checked Neon traces — root cause: model drifting to the language of retrieved (Roman Urdu) chunks. User proposed default language mirroring; agreed on strengthened instruction (Option B) after user caught the loophole: explicit language requests ("Answer me in Roman Urdu/Chinese") must override mirroring → priority-order language rule approved ("Yes go for it").
2. Discovered gpt-4o-mini flakily skipped the search tool for Roman Urdu questions (logs showed no embeddings/Qdrant calls). Presented options; user approved Option A (strengthened multilingual tool instruction).
3. User raised cost concern (paid OpenAI, public site). Presented 4-layer protection; user did Layer 1 (OpenAI budget cap) themselves; challenged the 500-token cap ("on which basis?") → conceded it was a heuristic that truncates answers; dropped it. User approved Layer 2: FastAPI rate limiting ("Yes").

## Response snapshot

1. Language rule (priority order) in agent instructions: explicit language request wins; otherwise mirror the user's most recent message language regardless of retrieved-content/conversation language. 4/4 tests passed.
2. Multilingual tool instruction: content questions in ANY language must trigger search_book_content; never claim the book lacks content without searching. 3/3 Roman Urdu retests searched correctly.
3. Rate limiting: slowapi (10/hour per IP) via new src/utils/rate_limit.py, wired in main.py with custom 429 JSON handler, applied to /chat and /chat/stream; ChatWidget shows friendly "hourly limit" message on 429. Token cap (Layer 3) dropped by user decision — model answers at full quality.

## Outcome

- ✅ Impact: predictable language behavior, reliable multilingual retrieval, and budget protection (OpenAI cap + per-IP rate limit) — production-ready behavior for public launch
- 🧪 Tests: language 4/4, tool reliability 3/3, rate limit 429 verified
- 📁 Files: 5 backend files + ChatWidget
- 🔁 Next prompts: HF Space deploy; production apiUrl + CORS; commit & push Phase 2
- 🧠 Reflection: cost fears are best answered with real numbers (~$0.001/message) before adding controls; hard output caps trade quality for negligible savings
