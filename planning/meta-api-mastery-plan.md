# Meta API Mastery — Playlist Plan

**Book:** `meta-api-mastery`
**Videos:** 7 | **Total runtime:** ~89 minutes
**Track type:** Standalone (zero prerequisites) — not part of the 42-lesson n8n course
**Created:** 2026-08-05
**Facts verified against:** Meta Graph API v25.0 / v26.0 — *checked 2026-08-04*

> **Scope of this book:** the Meta *platform* — the parts that apply equally to Instagram, Facebook, WhatsApp and Threads. The Instagram build itself lives in `instagram-automation-plan.md`. The n8n-side lessons live in `n8n-webhooks-and-mcp-plan.md`.

---

## DOC-BRIEF

```
1. WHO       : Developers and automation freelancers who have hit the Meta
               developer portal and got lost. Beginners to the Meta platform,
               but already comfortable with the idea of an API. Pakistani /
               Urdu-Hindi speaking audience.

2. WHY / JOB : After this book the reader can create a Meta app, pick the right
               login path, generate the right token with the right scopes,
               verify it, and take the app Live — without copying a tutorial
               step by step.

2.5 SCOPE    : ✅ Graph API model · Graph API Explorer · Access Token Debugger ·
                  token types and lifetimes · Developer App settings and roles ·
                  Business Manager vs Business Suite · Privacy Policy, Data
                  Deletion, Live mode
               ❌ Instagram webhooks and replies (separate book)
               ❌ n8n node behaviour (separate book)
               ❌ App Review walkthrough — NOT DONE by the instructor, so it is
                  explained conceptually only (see MA6)

3. LEARN     : Meta official docs only — developers.facebook.com. Every claim in
               this book was re-verified 2026-08-03/04 during a live setup, not
               taken from the instructor's 2026-03 guide.

4. EXISTS?   : facebook-instagram-graph-api-setup/Facebook_Instagram_API_Setup_Guide.md
               (instructor's own guide, revised 2026-08-04). This book supersedes
               its scattered explanation with one topic per video.

5. FIND/USE  : docs/meta-api-mastery/lesson-NN.md · sidebar_position = MA number

6. MAINTAIN  : Re-check Graph API version and scope names before each recording.
               Meta renames scopes between login paths (instagram_manage_* vs
               instagram_business_manage_*) — this has already caused one error.
```

---

## Videos

| MA# | Rec# | Video | ⏱ | One-sentence scope | Status |
|-----|------|-------|----|--------------------|--------|
| MA1 | 2 | **Meta Developer App — Complete Overview** | 15 | Create a Meta app and understand every setting inside it. | ✅ Ready |
| MA2 | 3 | **Meta Graph API Explained** | 10 | Read any Meta endpoint without memorising it. | ✅ Ready |
| MA3 | 4 | **Graph API Explorer — Full Tour** | 12 | Test any Meta API call without writing code. | ✅ Ready |
| MA4 | 5 | **Facebook Login vs Instagram Login** | 10 | Choose the right Instagram API path for your project. | ✅ Ready |
| MA5 | 6 | **Meta Access Tokens Explained** | 15 | Generate, verify and renew the correct token. | ✅ Ready |
| MA6 | 7 | **Taking Your Meta App Live** | 15 | Get your app out of Development mode. | ✅ Ready |
| MA7 | 14 | **Business Manager vs Business Suite** | 12 | Know which Meta business tool does what. | 🟡 Partial |

**Rec#** = position in the overall 17-video recording order across all three plan files.

---

## What each video covers

### MA1 — Meta Developer App (15 min)
App creation · use case selection · **Products** (Webhooks, Instagram, Facebook Login) · **App Roles** (Admin, Developer, Tester, Instagram Testers) · App ID vs App Secret · **Development vs Live mode** · App settings → Basic.

**Hook:** two apps with the same display name — how to tell them apart (App ID, and the Debugger).

### MA2 — Meta Graph API Explained (10 min)
Nodes and edges · why it is called a *graph* · the `/{node-id}/{edge}` pattern · reading `/{page_id}/feed`, `/{post_id}/comments`, `/{comment_id}/replies` · the three hosts (`graph.facebook.com`, `graph.instagram.com`, `graph.threads.net`).

**Payoff:** once the pattern lands, endpoints stop needing memorisation.

### MA3 — Graph API Explorer (12 min)
Host and version dropdowns · Meta App selector · User vs Page vs App token · permissions panel · GET/POST/DELETE · **Get Code** · *Uninstall app* (clears cached permissions) · what the Explorer is **not** for (production).

⚠️ **Correction to record on camera:** the Explorer now supports `graph.instagram.com` and `graph.threads.net`, not only `graph.facebook.com`.

### MA4 — Facebook Login vs Instagram Login (10 min)
The two paths side by side · Facebook Page required or not · different hosts · different token types · **different scope names** (`instagram_manage_*` vs `instagram_business_manage_*`) · what Instagram Login gives up (hashtag search, product tagging) · how to choose.

**Key teaching point:** the Page is the doorway in the Facebook path. In the Instagram path there is no door — and no Business Portfolio work either.

### MA5 — Meta Access Tokens (15 min)
Short-lived (1 hr) · long-lived User (60 d) · never-expiring Page · Instagram User (60 d) · `fb_exchange_token` vs `ig_exchange_token` · `refresh_access_token` · **Access Token Debugger** — Valid, App ID, Expires, **Scopes** · why Debugger beats the Explorer's permission list (requested vs *granted*).

### MA6 — Taking Your Meta App Live (15 min)
Privacy Policy URL — **hosted free on GitHub Pages** · Data Deletion Instructions URL (`#data-deletion` anchor on the same page) · the Live toggle · **when App Review is genuinely required** (Tier 1/2/3) and when it is not.

⚠️ **Honesty constraint:** the instructor has **not** completed App Review. Per `CONTRIBUTING.md` ("Tested, not theoretical"), App Review is explained as a decision — *do you need it?* — never demonstrated as a walkthrough.

### MA7 — Business Manager vs Business Suite (12 min)
What each product is for · Business Portfolio structure (Accounts → Pages / Apps) · asset permissions · **partner / shared access** — the agency model for client Pages · when neither is needed.

🟡 **Blocker:** Business Suite has not been used hands-on. Must be explored before recording.

---

## §7 exceptions

**None.** All seven videos are 15 minutes or under, within the normal `documents-standard.md` §7 limit. No exception justification required for this book.

---

## Verification log

| Claim | Verified | Date |
|-------|----------|------|
| Graph API Explorer supports `graph.instagram.com` | ✅ Seen in the live UI | 2026-08-04 |
| v26.0 exists alongside v25.0 | ✅ Seen in the version dropdown | 2026-08-04 |
| Dashboard-generated Instagram token = 60 days | ✅ Meta get-started doc | 2026-08-03 |
| `refresh_access_token` extends by 60 days | ✅ Meta reference doc | 2026-08-04 |
| App must be **Live** for webhooks to fire | ✅ Meta webhooks doc + live failure | 2026-08-03 |
| App Review skippable for own accounts | ✅ Meta App Modes doc + dashboard text | 2026-08-03 |
| `me/accounts` empty → Business Portfolio required | ❌ **Disproved** — fixed by selecting the Page in the token popup | 2026-08-04 |

---

## Open decisions

| # | Decision | Blocks |
|---|----------|--------|
| 1 | Does the No-Repetition rule apply across tracks? Standalone videos claim "zero prerequisites" but the rule forbids re-teaching. | Every video |
| 2 | `documents-standard.md` §5 caps runtime at 20 min; §7 allows 25. One must be corrected. | Not this book (all ≤15) — blocks `instagram-automation-plan.md` |
| 3 | Split MA7 into two videos if Business Manager alone runs long? | MA7 |

---

*Sibling plans: `instagram-automation-plan.md` · `n8n-webhooks-and-mcp-plan.md`*
*Standards: `CONTRIBUTING.md` · `documents-standard.md` · `slides-standard.md`*
