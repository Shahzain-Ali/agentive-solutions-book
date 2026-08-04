# Instagram Automation — Playlist Plan

**Book:** `instagram-automation`
**Videos:** 7 | **Total runtime:** ~108 minutes
**Track type:** Standalone (zero prerequisites) — not part of the 42-lesson n8n course
**Created:** 2026-08-05
**Facts verified against:** Instagram Platform API v25.0 · n8n 2.x — *checked 2026-08-04*

> **Scope of this book:** the Instagram build itself — receiving events and replying. Meta platform fundamentals live in `meta-api-mastery-plan.md`. n8n node behaviour lives in `n8n-webhooks-and-mcp-plan.md`.

---

## DOC-BRIEF

```
1. WHO       : Automation freelancers and small-business owners who want their
               Instagram comments and DMs handled automatically. They can follow
               an n8n workflow but have never touched Meta's webhooks.

2. WHY / JOB : After this book the reader has a live Instagram bot that receives
               comments and DMs, replies to them (statically or with AI), is
               secured against forged requests, and does not need a new token
               every 60 days.

2.5 SCOPE    : ✅ Webhook setup · subscribe call · auto-reply to comments and DMs ·
                  loop prevention · AI-written replies · signature verification ·
                  token auto-refresh · a full lead-generation build · client pricing
               ❌ Content publishing (posting photos/reels) — different topic
               ❌ Meta app creation and token generation (see meta-api-mastery)
               ❌ RAG over business documents — belongs to the RAG playlist

3. LEARN     : Meta Instagram Platform docs (webhooks, messaging API, comment
               moderation) + n8n node schemas. Everything below was built and run
               on the instructor's own account on 2026-08-03/04.

4. EXISTS?   : instagram-webhook-setup/instagram-webhook-test.workflow.json
               (working n8n workflow, validated) ·
               facebook-instagram-graph-api-setup/ (posting/comments guide — the
               prequel; it deliberately does NOT cover webhooks or messaging)

5. FIND/USE  : docs/instagram-automation/lesson-NN.md · sidebar_position = IG number

6. MAINTAIN  : Re-check the webhook payload shape before each recording — the
               loop-guard bug below came from assuming a payload field. Record the
               check date next to every scope name and endpoint.
```

---

## Videos

| IG# | Rec# | Video | ⏱ | One-sentence scope | Status |
|-----|------|-------|----|--------------------|--------|
| IG1 | 9 | **Instagram Webhook — Complete Setup** | 20 ⚠️ | Get Instagram events arriving in your n8n workflow. | ✅ Ready |
| IG2 | 10 | **Auto-Reply Implementation** | 18 ⚠️ | Reply automatically to comments and DMs. | 🟡 Blocked |
| IG3 | 11 | **AI Agent Reply with Business Info** | 15 | Let AI decide what the reply says. | ❌ Not built |
| IG4 | 12 | **Securing Your Webhook** | 10 | Reject forged webhook requests. | ❌ Not built |
| IG5 | 13 | **Token Auto-Refresh** | 8 | Stop the 60-day token from ever expiring. | ❌ Not built |
| IG6 | 15 | 🏆 **Instagram Lead Generation Automation** | 25 ⚠️ | Turn Instagram conversations into tracked, qualified leads. | ❌ Not built |
| IG7 | 16 | **Meta API Client Work — Scoping & Pricing** | 12 | Scope and price a Meta API job correctly. | 🟡 Partial |

**Rec#** = position in the overall 17-video recording order across all three plan files.

---

## What each video covers

### IG1 — Instagram Webhook Complete Setup (20 min) ⚠️
**Meta side:** Webhooks product · Callback URL + Verify Token · subscribe to `comments` and `messages` · the **subscribe call** (`POST graph.instagram.com/v25.0/me/subscribed_apps`) · **App Live mode**
**n8n side:** Webhook node · the `hub.challenge` handshake · Production URL, workflow Active
**Test:** comment and DM from a second account → event visible in Executions

**Stops at:** the event is visible in n8n. **No reply** — that is IG2.

**The three gotchas that carry this video:**
1. Ticking fields in the Dashboard is **not enough** — the subscribe call is mandatory
2. **Development mode sends nothing.** Not comments, not DMs. The app must be Live
3. Production URL, not Test URL — and the workflow must be Active

**Token note:** the token is created here, in IG1, with `instagram_business_manage_comments` + `instagram_business_manage_messages`. IG2 reuses it — no new token.

### IG2 — Auto-Reply Implementation (18 min) ⚠️
**Endpoints:** `POST /{comment-id}/replies` · `POST /me/messages`
**n8n:** Header Auth credential (`Authorization: Bearer …`) · extract `event_type`, `from_id`, `comment_id`, `is_echo` · Switch routing · two HTTP Request nodes
**Constraint:** Meta's **24-hour messaging window** for free-form DMs

**The centrepiece — the infinite loop.** This is a real failure that happened on the instructor's own account on 2026-08-04:

```
comment → workflow → reply posted
       → the reply is itself a comment
       → webhook fires again → replies again → 🔁
```

The first guard shipped (`from_id ≠ account_id`) **did not work**, because `entry[0].id` is the Instagram Account ID while `from.id` is an Instagram-scoped ID — two different ID spaces that never match.

> 🔴 **BLOCKER — must be resolved before recording.** The corrected guard (likely `value.parent_id`, since a bot reply always has a parent and a top-level comment does not) is **a hypothesis, not verified**. It must be confirmed against Meta's webhook payload reference and tested live. Do not record on a guess — that is exactly what caused the original bug.

**Teaching value:** every competing tutorial shows the happy path. This one shows it break and get fixed.

### IG3 — AI Agent Reply (15 min)
n8n AI Agent node · business information **in the system prompt** (services, rates, hours, FAQs — not RAG) · comment/DM text as input · output feeds the same reply nodes from IG2.

**Three gotchas:** don't let the AI invent prices · keep replies short (an essay under an Instagram comment looks wrong) · escalate instead of guessing when the AI doesn't know.

**Boundary with IG2:** IG2 answers *how a reply is sent*. IG3 answers *what the reply says*. Keeping them apart means a failure is diagnosable — API problem or AI problem.

### IG4 — Securing Your Webhook (10 min)
Why it matters: the webhook URL is public — anyone who learns it can post forged events.
`X-Hub-Signature-256` — HMAC-SHA256 using the App Secret · n8n **Raw Body ON** · Code node computes and compares · reject before processing.
Bonus segment: what Meta's *client certificate / mTLS* option is, and why it cannot work on n8n Cloud.

**Biggest trap:** the signature is computed over the **raw bytes**. Verifying against parsed JSON will never match.

### IG5 — Token Auto-Refresh (8 min)
`GET graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token` · token must be **≥24 hours old and not yet expired** · n8n Schedule Trigger every ~50 days.

⚠️ **Design decision this video must make explicit:** an n8n workflow cannot update an n8n *credential*. The token has to live somewhere a workflow can write — an n8n Data Table — and the HTTP nodes must read from there. If IG2 hard-codes the credential, refresh will appear to succeed while the reply nodes keep sending the old token.

**This decision affects IG2 and must be settled before IG2 is recorded.**

### IG6 — Lead Generation Automation (25 min) ⚠️ 🏆
The capstone. Reuses IG2's reply mechanism and IG3's agent as building blocks — neither is re-taught.

```
comment "price?" → auto-reply + DM
   → lead stored (n8n Data Table / Google Sheets)
   → AI qualifies (serious buyer vs browser)
   → owner alerted on WhatsApp/Telegram
   → follow-up after 24 hours
   → error workflow
```

**New in this video:** storage · qualification · owner notification · follow-up timing · error handling.

### IG7 — Client Scoping & Pricing (12 min)
The three tiers that decide everything:

| Tier | Whose account | App Review | Realistic timeline |
|------|---------------|------------|--------------------|
| 1 | Your own | ❌ | Hours |
| 2 | A few known clients (add as Instagram Testers) | ❌ | Days |
| 3 | Public product, strangers connect | ✅ + Business Verification | Weeks |

Plus: the questions to ask before quoting · why "urgent" is impossible for Tier 3 · rate guidance.

🟡 **Status:** the tiers are understood and documented, but no client engagement has been closed yet. Record after a real one completes, so the advice is earned rather than theoretical.

---

## §7 exceptions (required by `documents-standard.md` §7)

### IG1 — 20 minutes
**Test:** *Can this be split so the first half is complete on its own — the viewer holding something that works?*
**No.** Stopping after webhook verification leaves a green tick and **zero events**. The subscribe call, and Live mode, are each individually required before anything arrives. Any earlier stopping point hands the viewer something broken. Qualifies as an end-to-end hands-on build.

### IG2 — 18 minutes
Comment reply and DM reply share one credential, one Switch node and one loop-guard concept. Splitting them would force the setup to be re-shown in the second video — a No-Repetition violation. Runs just over the 15-minute norm as a single end-to-end reply system.

### IG6 — 25 minutes
Capstone. Breaking a lead-generation pipeline mid-way leaves a system that captures leads but never notifies anyone — worse than not building it. Standard capstone exception.

> ⚠️ These three collide with `documents-standard.md` **§5**, whose checklist states *"Estimated runtime 20 minute se zyada nahi"* while **§7** permits 20–25. **§5 or §7 must be corrected before IG6 can pass its own quality checklist.**

---

## Verification log

| Claim | Verified | Date |
|-------|----------|------|
| Webhook receives comments and DMs end to end | ✅ Live, own account | 2026-08-03 |
| App must be Live or nothing is delivered | ✅ Live failure then fix | 2026-08-03 |
| n8n webhook `multipleMethods` creates one output per method | ✅ Live — POST landed on an unconnected output | 2026-08-03 |
| Reply API works; token scopes sufficient | ✅ Reply posted to Instagram | 2026-08-04 |
| `X-Hub-Signature-256` verification | ❌ Discussed only, never built | — |
| `refresh_access_token` in a workflow | ❌ Discussed only, never built | — |
| Loop guard `from_id ≠ account_id` | ❌ **Failed in production** — caused the loop | 2026-08-04 |
| Loop guard via `value.parent_id` | ❌ **Hypothesis — unverified** | — |

---

## Open decisions

| # | Decision | Blocks |
|---|----------|--------|
| 1 | 🔴 Correct loop guard — verify against Meta's payload reference, then test live | IG2, IG3, IG6 |
| 2 | Token in an n8n credential or in a Data Table? Auto-refresh needs the latter | IG2, IG5 |
| 3 | §5 vs §7 runtime contradiction | IG1, IG2, IG6 |
| 4 | Does No-Repetition apply across tracks, given "zero prerequisites"? | All |

---

*Sibling plans: `meta-api-mastery-plan.md` · `n8n-webhooks-and-mcp-plan.md`*
*Standards: `CONTRIBUTING.md` · `documents-standard.md` · `slides-standard.md`*
