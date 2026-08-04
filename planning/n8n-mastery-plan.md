# n8n Complete Course — Roadmap (SolutionsWithShahzain)

**Playlist name (working):** n8n Complete Course in Urdu/Hindi — Zero to AI Automation Expert (2026)
**Total lessons:** 42 videos | ~6 modules | ~22–26 hours of content
**Target cadence suggestion:** 2–3 videos/week → playlist completes in ~4 months
**Verified against:** n8n 2.x — *checked 27 July 2026*

- **n8n 2.0 (beta 8 Dec 2025, stable 15 Dec 2025) was a security / reliability / performance release — NOT a UI redesign.** n8n's own words: *"subtle refinements"* to the canvas, plus a reorganised sidebar. Do not describe 2.x as a redesigned interface.
- **New in 2.0 and course-relevant:** **Publish / Save** — saving an activated workflow no longer updates production; a separate **Publish** action does. Also **task runners on by default** (Code node runs sandboxed, environment variables blocked) and command-execution nodes disabled by default.
- **AI Agent node** — current, LangChain-based (`n8n-nodes-langchain.agent`).
- **MCP Server Trigger + MCP Client Tool** — real, but introduced in **n8n 1.88 (Apr 2025)**, not in 2.x. Do not present them as 2.x features.
- **Human-in-the-loop for AI tool calls** — real and documented (`docs.n8n.io/advanced-ai/human-in-the-loop-tools/`). Introducing version not confirmed.
- **Self-hosted AI Starter Kit** — real (n8n + Ollama + Qdrant + PostgreSQL, `github.com/n8n-io/self-hosted-ai-starter-kit`). **No "v2" release exists** — do not call it v2.

> **Legend:** ⏱ = estimated final video length | 🔁 = exercise video | 🛠 = mini project | 🏆 = capstone
> n8n Academy alignment: direct students to enroll free; where an Academy exercise matches a topic, we solve it on video (marked "Academy ✔").

---

## Module 1 — Foundations (Lessons 1–6)
*Goal: student understands what n8n is, has it running, and builds a real workflow in lesson 4 — not lesson 10.*

| # | Lesson | ⏱ | Depends on |
|---|--------|----|-----------|
| 1 | What is Automation & Why n8n? (Zapier/Make vs n8n, career/freelance opportunity, course overview) | 12–15 min | — |
| 2 | Setting Up n8n: Cloud vs Self-Hosted (start on Cloud free trial; Docker self-host demo comes in Module 6) | 15 min | 1 |
| 3 | n8n Interface Tour: Canvas, Nodes, Executions Panel (2.x canvas + reorganised sidebar) | 12 min | 2 |
| 4 | Your First Workflow: Triggers + Actions (Schedule trigger → fetch data → send to Gmail) — **include 2.0's Save vs Publish**: Save keeps your edits, Publish makes them live | 18–20 min | 3 |
| 5 | Understanding Nodes & Trigger Types (manual, schedule, webhook, app triggers, chat trigger — overview only) | 15 min | 4 |
| 6 | 🔁 Exercise: Build a Daily Weather/News Notifier (Academy ✔ — beginner course exercise style) | 15 min | 5 |

## Module 2 — Data: The Heart of n8n (Lessons 7–14)
*Goal: this is where every n8n beginner gets stuck. We go slower and deeper than any competing course. This module is our quality moat.*

| # | Lesson | ⏱ | Depends on |
|---|--------|----|-----------|
| 7 | How Data Flows in n8n: Items & JSON Explained (analogy-heavy; the "conveyor belt of boxes" model) | 18 min | 6 |
| 8 | Expressions Masterclass: `{{ }}`, dot notation, built-in variables ($json, $node, $now) | 20 min | 7 |
| 9 | Data Mapping & Transformation: Edit Fields (Set), renaming, restructuring | 18 min | 8 |
| 10 | Flow Control 1: IF & Switch (branching logic, real business rules) | 15 min | 9 |
| 11 | Flow Control 2: Merge, Split Out, Aggregate, Summarize, Loop Over Items, Wait | 20 min | 10 |
| 12 | The Code Node: JavaScript for Non-Programmers (only what you need — items in, items out). **2.0 note:** Code runs sandboxed in task runners by default and cannot read environment variables | 20 min | 11 |
| 13 | Debugging & Error Handling: data pinning, partial executions, execution logs, node retries, Stop and Error | 18–20 min | 12 |
| 14 | 🔁 Exercise: Lead Qualification Pipeline (filter, transform, route leads by score) (Academy ✔) | 20 min | 13 |

## Module 3 — APIs & Webhooks (Lessons 15–20)
*Goal: unlock "connect to anything" — the skill that separates freelancers from template-copiers.*

| # | Lesson | ⏱ | Depends on |
|---|--------|----|-----------|
| 15 | APIs Explained for Automation Builders (what an API is, REST, JSON responses — analogy: restaurant waiter) | 15 min | 14 |
| 16 | HTTP Request Node Deep Dive (GET/POST, headers, query params, body) | 20 min | 15 |
| 17 | Credentials & Authentication (API keys, Bearer, Basic, OAuth2 — set up 3 real services) | 18 min | 16 |
| 18 | Webhooks: Receiving Data from the Outside World (webhook trigger, test vs production URL, respond node) | 20 min | 17 |
| 19 | Pagination, Rate Limits & Batching (handling real-world API constraints) | 15 min | 18 |
| 20 | 🛠 **Mini Project 1: Website Lead Form → CRM + WhatsApp Alert** (webhook → validate → Google Sheets/CRM → notification) | 25–30 min | 19 |

## Module 4 — Real Business Integrations (Lessons 21–26)
*Goal: the workflows clients actually pay for.*

| # | Lesson | ⏱ | Depends on |
|---|--------|----|-----------|
| 21 | Google Workspace Automation (Sheets, Gmail, Drive, Calendar) | 20 min | 20 |
| 22 | Telegram & WhatsApp Bots in n8n | 20 min | 21 |
| 23 | Data Storage: n8n Data Tables, Notion & Airtable (native storage first, then external databases) | 20 min | 21 |
| 24 | Social Media & Content Automation (auto-posting, RSS → LinkedIn/X pipeline) | 18 min | 21 |
| 25 | Sub-workflows & Reusability (Execute Workflow node, building your own "library") | 15 min | 22 |
| 26 | 🛠 **Mini Project 2: Client Onboarding System** (form → contract email → folder creation → task creation → welcome message) | 30 min | 25 |

## Module 5 — AI Agents, RAG & MCP (Lessons 27–36)
*Goal: the module that makes this playlist rank in 2026. Also the bridge to your future Agentic AI / MCP / RAG playlists.*

| # | Lesson | ⏱ | Depends on |
|---|--------|----|-----------|
| 27 | LLMs in n8n: OpenAI/Gemini/Anthropic nodes, prompts, structured output | 20 min | 26 |
| 28 | The AI Agent Node Explained (agent vs workflow — when to use which; anatomy: model, tools, memory) | 22 min | 27 |
| 29 | Giving Your Agent Tools (built-in tools, workflows-as-tools, HTTP tool) | 20 min | 28 |
| 30 | Agent Memory & Chat Trigger (session memory, window buffer, building a chat UI) | 18 min | 29 |
| 31 | Human-in-the-Loop: Tool Approval & Safe AI Automation (2.x HITL feature) | 15 min | 30 |
| 32 | RAG Part 1: Embeddings & Vector Stores Explained (analogy-first theory; Qdrant/Pinecone/Simple Vector Store) | 20 min | 28 |
| 33 | RAG Part 2: Build a "Chat with Your Documents" Agent | 25 min | 32 |
| 34 | MCP in n8n Part 1: What is Model Context Protocol + MCP Client node (connect to Notion/Linear MCP servers) | 20 min | 29 |
| 35 | MCP in n8n Part 2: n8n as MCP Server (expose your workflows as tools to Claude/other agents) | 20 min | 34 |
| 36 | 🛠 **Mini Project 3: AI Customer Support Agent** (chat trigger + RAG on business docs + tools + HITL escalation) | 35 min | 33, 31 |

## Module 6 — Production, Self-Hosting & Business (Lessons 37–42)
*Goal: from "it works on my laptop" to "clients pay me for this." Docker lessons here also seed your future Docker playlist.*

| # | Lesson | ⏱ | Depends on |
|---|--------|----|-----------|
| 37 | Self-Hosting n8n with Docker (docker compose, volumes, updates, env vars) | 25 min | 36 |
| 38 | Error Workflows & Monitoring (global error workflow, alerts, execution data management) | 18 min | 37 |
| 39 | Security & Best Practices (credentials hygiene, webhook security, data privacy for client work) — plus **2.0's secure-by-default model**: task runners, blocked env vars, disabled command-execution nodes, and why Publish/Save protects production | 15 min | 38 |
| 40 | Scaling & Performance (queue mode overview, workflow optimization, when Cloud vs self-host wins) | 15 min | 39 |
| 41 | Freelancing with n8n: pricing, scoping, delivering & documenting client projects | 18 min | 40 |
| 42 | 🏆 **Capstone: Complete AI Business Automation System** — an "AI Receptionist"-style build for a real business: WhatsApp/webchat intake → AI agent (RAG on business info) → booking via Calendar → CRM logging → owner notifications with HITL → error workflow → deployed on Docker. Split into 2–3 parts (40 min each). | 90–120 min total | all |

---

## Structural notes

- **Exercise placement:** formal exercise videos close Modules 1–2; Modules 3–6 end in mini projects/capstone instead (projects > drills at that stage). Every regular lesson still ends with a homework challenge in the course notes.
- **Dependency spine:** M1 → M2 → M3 are strictly sequential. M4 lessons 22–24 are parallel (any order after 21). In M5, RAG (32–33) and MCP (34–35) branch independently from the agent core (28–29).
- **Capstone bridges to ADK playlist:** the capstone is the n8n version of an AI receptionist. When the Google ADK playlist launches, your real WhatsApp Digital FTE project becomes its capstone — "same business problem, code-first framework" is a powerful cross-playlist hook.
- **Future playlist seeds:** Lesson 37 → Docker playlist; 32–33 → RAG playlist; 34–35 → MCP playlist; 28–31 → Agentic AI playlist. Each of these lessons should verbally tease the dedicated playlist.
- **Verification rule:** before scripting each lesson, re-check n8n release notes (docs.n8n.io/release-notes) — n8n ships fast and 2.x is actively changing (MCP node coverage and AI Agent features especially). Record the check date next to any version-specific claim. **A claim inherited from an earlier draft of this roadmap counts as unverified until re-checked.**
- **Screenshots policy:** every lesson's GitHub notes include 2–4 annotated screenshots of OUR OWN workflows (never Academy's), captured on recording day (n8n UI changes fast). Notes folder also includes the workflow JSON export.
- **Coverage validation:** roadmap cross-checked against n8n Academy Foundations program (N8N101/102/103 + QS101, 2026H2) — all Academy topics covered plus production, self-hosting, MCP-as-server, and freelancing modules that Academy lacks.

## Publishing strategy — course + standalone AI track (parallel)

The course playlist stays strictly sequential (M1 → M6, no reordering — Module 5 depends on M2/M3 skills). To capture trending AI search traffic from day one, run a **parallel standalone track** outside the course playlist:

| Standalone video (self-contained, zero prerequisites) | Purpose |
|---|---|
| Build Your First AI Agent in n8n in 20 Minutes | Rank on "n8n AI agent" keywords |
| Chat With Your PDFs — n8n RAG in One Workflow | Rank on "n8n RAG / chat with documents" |
| WhatsApp AI Bot in n8n — Full Build | Rank on "n8n WhatsApp bot" |

Rules:
- Every standalone video ends with a funnel CTA: "Want to learn this properly? Full structured n8n course → playlist link in description."
- Standalone videos later become their own "n8n AI Quick Wins" playlist.
- **Cadence:** 2 course videos + 1 standalone AI video per week. Course stays sequential; AI content is live from day one.
