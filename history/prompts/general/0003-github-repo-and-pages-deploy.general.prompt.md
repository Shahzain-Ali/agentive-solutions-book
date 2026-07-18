---
id: 0003
title: GitHub Repo And Pages Deploy
stage: general
date: 2026-07-17
surface: agent
model: claude-fable-5
feature: none
branch: main
user: Shahzain-Ali
command: none
labels: ["deploy", "github-pages", "gh-cli", "phase-1"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .gitignore
 - history/prompts/general/0003-github-repo-and-pages-deploy.general.prompt.md
tests:
 - Live URL checks: homepage 200, lesson-01 200 (via redirect), slides.pdf 200 application/pdf
 - gh run 29566941001 deploy job passed in 1m16s
---

## Prompt

Okay let's get started. Let me know that you have the access of GitHub or not? If not so what should I do — can I connect MCP server of GitHub with you or you can directly do all things by using gh CLI. First you have to guide me.

[Follow-ups] User installed gh CLI (sudo apt install gh) and completed `gh auth login` (Logged in as Shahzain-Ali). Earlier context: user chose public repo with content-protection license after learning Panaversity's Agent Factory book is also public on GitHub; user also asked to understand GitHub Pages (static frontend) vs backend platforms (HF Spaces) before deploying.

## Response snapshot

Guided gh CLI install + auth (user ran both). Then executed deployment:
1. Added `.claude/settings.local.json` to .gitignore (personal permissions file)
2. Renamed branch master → main; initial commit (76 files) with sensitive-file check (no .env/tokens tracked)
3. `gh repo create agentive-solutions-book --public --source=. --push` → https://github.com/Shahzain-Ali/agentive-solutions-book
4. Enabled Pages with `build_type=workflow` via gh api
5. Deploy workflow passed (1m16s). Live: https://shahzain-ali.github.io/agentive-solutions-book/ — homepage, lesson pages, and slide PDFs all verified 200.

## Outcome

- ✅ Impact: Phase 1 book is LIVE on GitHub Pages under the new public repo
- 🧪 Tests: live URL smoke tests passed (homepage/lessons/PDF)
- 📁 Files: .gitignore updated; 76 files committed and pushed
- 🔁 Next prompts: GA4 real Measurement ID; content-protection LICENSE file; Phase 2 RAG chatbot (new Qdrant collection, prompt update, HF Space)
- 🧠 Reflection: gh CLI chosen over GitHub MCP server — zero extra setup, covers repo create/push/Pages API in one tool

## Evaluation notes (flywheel)

- Failure modes observed: none; Node 20 deprecation warnings in workflow actions (upgrade actions versions later)
- Graders run and results (PASS/FAIL): deploy PASS; live checks PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): bump actions/checkout@v4, setup-node@v4 to silence deprecation
