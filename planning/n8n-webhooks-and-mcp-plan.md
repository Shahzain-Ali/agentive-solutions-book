# n8n Webhooks & MCP — Playlist Plan

**Book:** `n8n-webhooks-and-mcp`
**Videos:** 3 | **Total runtime:** ~30 minutes
**Track type:** Standalone (zero prerequisites) — not part of the 42-lesson n8n course
**Created:** 2026-08-05
**Facts verified against:** n8n 2.x · Webhook node v2.1 · Respond to Webhook v1.5 — *checked 2026-08-03*

> **Scope of this book:** pure n8n topics that came out of the Instagram build but stand on their own. Meta platform fundamentals live in `meta-api-mastery-plan.md`; the Instagram build lives in `instagram-automation-plan.md`.

---

## DOC-BRIEF

```
1. WHO       : n8n users who already build workflows and now need to receive
               external events, or want to build workflows from their terminal
               instead of the canvas.

2. WHY / JOB : After this book the reader can wire any external service into an
               n8n webhook without the usual silent failures, and can drive n8n
               from Claude Code on both n8n Cloud and a local Docker instance.

2.5 SCOPE    : ✅ Webhook node internals · multipleMethods and its outputs ·
                  Respond to Webhook · Test vs Production URL · Save vs Publish ·
                  n8n Cloud instance-level MCP · local Docker MCP
               ❌ Instagram specifics (separate book)
               ❌ n8n basics — nodes, expressions, canvas (the 42-lesson course)

3. LEARN     : n8n official docs + live node schemas (Webhook v2.1, Respond to
               Webhook v1.5) + n8n's MCP connect docs. All three were exercised on
               a real n8n Cloud instance on 2026-08-03/04.

4. EXISTS?   : The n8n-mastery repo already documents connecting n8n MCP to Claude
               Code — but for a LOCAL Docker container only, not Cloud. That repo
               is being retired and its content migrated here (see Migration below).

5. FIND/USE  : docs/n8n-webhooks-and-mcp/lesson-NN.md · sidebar_position = N8 number

6. MAINTAIN  : n8n ships fast. Re-check node typeVersions before each recording —
               the roadmap's own rule. n8n's instance MCP is in Public Preview and
               will change.
```

---

## Videos

| N8# | Rec# | Video | ⏱ | One-sentence scope | Status |
|-----|------|-------|----|--------------------|--------|
| N81 | 1 | **n8n Cloud MCP + Claude Code** | 8 | Connect Claude Code to your n8n Cloud instance. | ✅ Ready |
| N82 | 8 | **n8n Webhook Node Deep Dive** | 12 | Receive external events in n8n without silent failures. | ✅ Ready |
| N83 | 17 | **n8n Local (Docker) MCP + Claude Code** | 10 | Do the same against a self-hosted n8n. | 🟡 Content exists, private |

**Rec#** = position in the overall 17-video recording order across all three plan files.

---

## What each video covers

### N81 — n8n Cloud MCP + Claude Code (8 min)
Settings → **Instance-level MCP** → enable · `claude mcp add --transport http <n8n-domain>/mcp-server/http` · **OAuth authorize** · enable MCP **per workflow** (instance-level alone is not enough) · verify the connection.

**Deliberately excluded:** actually building a workflow through Claude Code. That is shown inside the real build videos, where it has a purpose. This video is the connection only.

⚠️ **Distinction to make on camera:** n8n's `/mcp-server/http` (instance MCP, for AI assistants to build workflows) is **not** the MCP Server Trigger node (which exposes your workflows as tools). Confusing the two costs real time.

**Public Preview:** n8n labels this feature Public Preview and advises reviewing generated workflows before production. Say so on camera.

### N82 — n8n Webhook Node Deep Dive (12 min)
**Test vs Production URL** — why the Test URL only lives while "Listen for test event" is active · workflow must be **Active** or the Production URL 404s · **Save vs Publish** (n8n 2.0 — saving an activated workflow does not update production) · **Respond to Webhook** node and `responseMode: responseNode` · Raw Body option.

**The centrepiece — the `multipleMethods` trap.** Enabling *Allow Multiple HTTP Methods* silently gives the Webhook node **one output per method**:

```
Webhook (GET, POST)
  ├── output 0  →  GET
  └── output 1  →  POST      ← easy to leave unconnected
```

Connect only output 0 and every POST creates an execution that ends at the trigger with no error and a `success` status. This cost hours during the Instagram build. It is the single most valuable thing in this video.

### N83 — n8n Local (Docker) MCP + Claude Code (10 min)
The self-hosted equivalent: Docker container · `N8N_API_URL` / `N8N_API_KEY` environment variables · community `n8n-mcp` server vs n8n's own instance MCP · when a local setup is preferable (data residency, cost, offline).

🟡 **Status:** documentation already exists in the n8n-mastery repo. Per the instructor's decision it will be **added to the book as a draft (unpublished)** while the Cloud video ships first.

---

## §7 exceptions

**None.** All three videos are 12 minutes or under, well inside `documents-standard.md` §7's normal limit.

---

## Migration — retiring the n8n-mastery repo

Instructor's decision (2026-08-05): all content consolidates into `agentive-solutions-book/`; the standalone `n8n-mastery` repo is retired.

**Order matters — do not delete first:**

| Step | Action |
|------|--------|
| 1 | Copy the local-MCP content into the book |
| 2 | Verify it renders and nothing was lost |
| 3 | Mark it unpublished (front-matter — mechanism to be confirmed against Docusaurus docs, `draft` vs `unlisted`) |
| 4 | **Only then** delete the old repo |

⚠️ **Check before deleting:** if the old repo's GitHub URL appears in any published video description, deleting it breaks that link permanently. Verify first, and redirect if needed.

---

## Verification log

| Claim | Verified | Date |
|-------|----------|------|
| `claude mcp add --transport http … /mcp-server/http` + OAuth works | ✅ Connected live | 2026-08-03 |
| Instance-level MCP alone is not enough — each workflow must be enabled | ✅ Hit the error, then fixed | 2026-08-03 |
| `multipleMethods` creates one output per method | ✅ Root-caused a live failure | 2026-08-03 |
| Updates land as a draft; publish is a separate action | ✅ `activeVersionId` stayed on the old version | 2026-08-03 |
| n8n redacts execution data from MCP clients | ✅ Empty `runData` over MCP | 2026-08-03 |
| Local Docker MCP setup | 🟡 Documented previously, not re-tested in this session | — |

---

## Open decisions

| # | Decision | Blocks |
|---|----------|--------|
| 1 | Does N82 collide with the 42-lesson roadmap's Lesson 18 ("Webhooks: Receiving Data from the Outside World")? If both ship, one must defer to the other under No-Repetition. | N82 |
| 2 | Docusaurus mechanism for unpublished content — `draft: true` or `unlisted: true`? Confirm against Docusaurus docs before migrating. | N83 |
| 3 | Re-test the local Docker setup before recording N83, or record from the existing docs? `CONTRIBUTING.md` ("Tested, not theoretical") points to re-testing. | N83 |

---

*Sibling plans: `meta-api-mastery-plan.md` · `instagram-automation-plan.md`*
*Standards: `CONTRIBUTING.md` · `documents-standard.md` · `slides-standard.md`*
