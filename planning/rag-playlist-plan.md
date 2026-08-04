# RAG Video Playlist + Book 2 Curriculum

**Decided:** 2026-07 (during Phase 2 RAG chatbot build) · **Restructured:** 2026-07-30 (6 → 8 lessons)
**Deliverable:** 8-video YouTube playlist + `docs/rag-for-automation/` (book 2, 8 chapters = 8 lessons)
**Master source:** this book repo (`docs/rag-for-automation/`) — NOT a separate documentation folder
**Filter used:** career impact for AI Automation Developers, business-automation lens, practical over research-deep
**Running example (every lesson):** our own Agentive Solutions book chatbot — build-in-public, proof-of-work, real debugging stories
**Tags:** **E** = Essential · **R** = Recommended · **O** = Optional (Optional topics get a mention only, not deep coverage)
**✅** = already built in our chatbot (can demo live) · **❌** = not built (say so honestly on camera)

**Process rule:** one lesson at a time — write → self-review → Shahzain reviews → confirm → next lesson. Do not push `docs/rag-for-automation/` content until explicit permission is given.

---

## Scope Rule (non-negotiable) — updated 2026-07-31

**One video = one topic. Length is not the goal — focus is.**

- There is **no minimum**. If a topic is done in 6 minutes, the video is 6 minutes.
- **The normal ceiling is 10 minutes.** Most lessons must land inside it.
- Going over 10 usually means **two topics are stuffed into one lesson.** Split the lesson; never cut the content.

**Exception — 20 to 25 minutes.** Some topics genuinely cannot be split. That exception must pass one test:

> Can this be split so that the first lesson still leaves the viewer with something complete and working?
> **Yes → split it.** **No → the exception applies.**

In practice only **end-to-end hands-on builds** qualify. Conceptual lessons never do — they can always be split. **If a lesson uses the exception, write the reason next to it in the table below.**

**Scope test before writing:** state the lesson's purpose in one sentence. If the word "and" appears — *"what RAG is **and** its 5 steps **and** how it differs from fine-tuning"* — that is three lessons, not one.

> ⚠️ **Consequence for this plan:** the 8-lesson structure below was built for 15–20 minute videos. Under a 10-minute norm and the one-topic rule, most of these carry two or three topics each and **must be re-split before writing.** Expect this playlist to land at **14–16 lessons**, with the hands-on build lessons (Qdrant setup, ingestion pipeline, deployment) as the likely 20–25 minute exceptions.

---

## Published — do not rewrite

| Lesson | Status | Already taught (No-Repetition applies) |
|---|---|---|
| **Lesson 1 — What is RAG & Why Businesses Need It** | ✅ **Published** | New-employee analogy · doctor-and-file analogy · three failure reasons (stale / hallucination / no access) · RAG definition · Retrieval-Augmented-Generation unpacked · the 5-step architecture · chunk / embedding / vector database at intuition level · RAG vs fine-tuning vs long context · decision framework · live tutor demo |

Anything in that list is **already taught**. Later lessons may point back to it in one line — never re-explain it.

**Also published (separate track):** *AI Automation vs AI Workflow vs AI Agent* — standalone guide. Its three-tier model, the ATM/waiter/planner analogy, and the agent-vs-workflow distinction are taught there; don't repeat them here.

---

## Teaching Order — Why Embeddings Come Before Chunking

Lesson 1 teaches the pipeline as **ingest → embed → store → retrieve → generate**. The course then covers **embeddings (Ep 2) before chunking (Ep 3)** — deliberately the reverse of the pipeline.

Reason: a chunking decision ("how big should a chunk be? where do I cut?") can only be judged by whether retrieval finds the right thing — which requires embeddings and a vector database to already exist. Teaching chunking first would mean making decisions with no way to test them.

**Required on camera:** Lesson 2 must open with one line acknowledging this, or students will think they missed something —
> *"Pipeline mein chunking pehle aati hai, lekin hum embeddings se shuru kar rahe hain. Wajah: chunking ke faisle tabhi samajh aate hain jab pata ho ke retrieval kaam kaise karta hai."*

---

## Lesson 1 — RAG Kya Hai & Business Ko Kyun Chahiye *(Beginner)*
**Status: ✅ PUBLISHED — video recorded, `docs/rag-for-automation/lesson-01.md` final. Do not rewrite.**

| Topic | Kyun important | Kahan use hota | Tag |
|-------|---------------|----------------|-----|
| LLM alone kyun fail hota hai (hallucination, purani knowledge, private data) | Har client conversation ki bunyaad | Support bots, internal knowledge | **E** |
| RAG vs fine-tuning vs long context | Client ko sahi solution bechna | Solution design | **E** |
| RAG architecture: ingest → embed → store → retrieve → generate ✅ | Mental model — sab isi per khara hai | Har RAG project | **E** |
| Business use cases (docs assistant, support bot, internal search) | Automation developer ka bread & butter | Client pitching | **E** |

**Practical:** Hamare book tutor ka live demo + architecture diagram walkthrough.

## Lesson 2 — Embeddings & Vector Databases *(Beginner→Intermediate)*
**Status: Baaki**

| Topic | Kyun | Kahan | Tag |
|-------|------|-------|-----|
| Embeddings & semantic similarity (cosine) ✅ | Retrieval ka engine | Sab jagah | **E** |
| Model choice: 3-small vs 3-large (cost/dims/multilingual) ✅ | Paisa aur quality ka faisla | Har project start | **E** |
| Qdrant hands-on (collections, dimensions, distance) ✅ | Hamara stack | Vector storage | **E** |
| Alternatives: pgvector, Pinecone, Chroma | Client ke stack ke mutabiq choose karna | Solution design | **R** |
| HNSW indexing internals | Sirf samajhne ke liye | Scale tuning | **O** |

**Practical:** Free Qdrant cluster banao → sample docs embed karo → real cost dikhao.
**Opening line required:** teaching-order note (see above).

## Lesson 3 — Chunking & Content Pipeline *(Intermediate)*
**Status: Baaki**

| Topic | Kyun | Kahan | Tag |
|-------|------|-------|-----|
| Chunking = retrieval quality ka #1 driver ✅ | Ghalat chunks = ghalat jawab | Har ingestion | **E** |
| Strategies: heading-based ✅, fixed-size, overlap | Content type ke hisaab se choice | Docs, PDFs, websites | **E** |
| **Getting text OUT of real documents (PDFs, scans, tables)** ❌ | **Pakistani businesses ka data PDF aur scans mein hota hai — yeh pehla asal rukavat hai** | **Har client project** | **E** |
| Metadata design (page, section, URL) ✅ | Citations isi se bante hain | Source-cited bots | **E** |
| Token counting (tiktoken) ✅ | Cost estimate + chunk sizing | Budgeting | **R** |
| Content updates / re-embedding (living book problem) ✅ | Real products change hote hain | Maintenance contracts | **R** |

**Practical:** Hamari `embed_content.py` run karke chunks Qdrant dashboard mein inspect karna + ek asli PDF se text nikaal kar dikhana.

## Lesson 4 — Naive RAG Kyun Fail Hota Hai ⭐ *(Intermediate)*
**Status: Baaki** · *(split from the original Lesson 4)*

| Topic | Kyun | Kahan | Tag |
|-------|------|-------|-----|
| Naive RAG (prompt stuffing) aur uske failures ✅ | Hamari real "Hi + sources" story | Debugging | **E** |
| Retrieval as a tool (function calling) ✅ | Industry-standard pattern | Production bots | **E** |
| Chhote models ki tool-calling flakiness (Roman Urdu story) ✅ | Koi aur yeh nahi sikhata — real war story | Model selection | **R** |
| Query rewriting / expansion | Edge quality | Advanced | **O** |

**Practical:** Naive vs agentic **live before/after** hamare chatbot per — "Hi" wala demo.

## Lesson 5 — Retrieval Quality & Citations ⭐ *(Intermediate→Expert — strongest/unique lesson)*
**Status: Baaki** · *(split from the original Lesson 4)*

| Topic | Kyun | Kahan | Tag |
|-------|------|-------|-----|
| Relevance threshold + citation UX ✅ | Bekaar sources user ka trust todte hain | Har cited bot | **E** |
| Grounding rules — answer only from retrieved context ✅ | Hallucination ka asal ilaj | Har business bot | **E** |
| "Not in the data" behaviour ✅ | Acha bot "pata nahi" kehta hai, andaza nahi lagata | Client trust | **E** |
| Language mirroring prompt rules ✅ | Multilingual clients (PK market!) | System prompts | **E** |
| Hybrid search + reranking ❌ (nahi banaya — honestly bata kar) | Quality ka agla level | Bade corpuses | **R** |

**Practical:** Threshold on/off ka live farq + citations ka UX hamare chatbot per.

## Lesson 6 — Production Safety *(Intermediate→Expert)*
**Status: Baaki** · *(split from the original Lesson 5)*

| Topic | Kyun | Kahan | Tag |
|-------|------|-------|-----|
| Rate limiting (per-IP) ✅ | Abuse se bachao | Public bots | **E** |
| Input validation + prompt injection basics ✅ | Security baseline | Public bots | **E** |
| Env/secrets management + CORS ✅ | Amateur vs professional ka farq | Har deploy | **E** |

**Practical:** Rate limit ko live trigger kar ke dikhana + ek prompt-injection attempt aur uska defence.

## Lesson 7 — Cost & Deployment *(Intermediate→Expert)*
**Status: Baaki** · *(split from the original Lesson 5)*

| Topic | Kyun | Kahan | Tag |
|-------|------|-------|-----|
| Cost math per message + budget caps ✅ | Client ka paisa = aapka trust | Har paid deployment | **E** |
| Deploy: Render / containers ✅ | Free-tier deployment skill | Portfolio projects | **E** |
| Chat history persistence (sessions, Postgres) ✅ | UX + future personalization | Chat products | **R** |
| Dependency version pinning (qdrant/agents SDK breakage story) ✅ | Production reliability | Har project | **R** |

**Practical:** Render deploy walkthrough (build in public + kaam bhi ho jayega).

## Lesson 8 — Evaluation & Improvement *(Expert — 90% log skip karte hain)*
**Status: Baaki**

| Topic | Kyun | Kahan | Tag |
|-------|------|-------|-----|
| Golden questions eval (retrieval hit-rate + answer quality) ❌ | Senior-level skill — interviews mein alag dikhata hai | Quality assurance | **R** |
| Tracing/observability (OpenAI traces already on ✅) | Debugging in production | Ops | **R** |
| User feedback loops (thumbs, analytics) ❌ | Phase 4 se jurta hai | Product improvement | **R** |
| Model/embedding upgrades + re-embed strategy | Long-term maintenance | Contracts | **O** |

**⚠️ Build before filming.** Right now half of this lesson is ❌ — that makes a weak finale, and the last video is where you want the strongest close. Build the golden-questions eval on our own chatbot first, then film it as ✅. If that isn't possible, fold this lesson into Lesson 7 rather than shipping a "we didn't build this" finale.

**Practical:** 10 golden questions ka mini eval hamare chatbot per banana.

---

## Notes / Options Discussed

- Totals: Essential 22 · Recommended 10 · Optional 3
- **Why 8 and not 6:** the original Ep 4 (7 topics) and Ep 5 (7 topics) were 35–40 minute videos. Splitting them keeps every lesson inside the 15–20 minute rule without dropping a single topic. More lessons also means more YouTube surface area — a benefit, not a cost.
- Compression option (not taken): Ep 2+3 merge (Data Pipeline). Rejected — both are already near the 20-minute ceiling on their own.
- Agentic RAG content (now Ep 4 + Ep 5) stays the playlist's strongest differentiator — most RAG tutorials stop at naive RAG.
- Meta selling point: RAG book chapters get embedded into Qdrant too — students can ask the RAG-powered tutor about RAG itself (live demo built into the product).
