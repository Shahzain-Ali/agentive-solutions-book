# Agentive Solutions — Interactive Book

[![Docusaurus](https://img.shields.io/badge/Docusaurus-3.x-3ECC5F?logo=docusaurus)](https://docusaurus.io/) [![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi)](https://fastapi.tiangolo.com/) [![Qdrant](https://img.shields.io/badge/Qdrant-Vector_DB-DC244C)](https://qdrant.tech/) [![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

The **Agentive Solutions** interactive book — a company-branded, multi-book learning platform for AI automation. The first book is **n8n Mastery** (42 lessons, 6 modules); future books will cover Google ADK and OpenAI Agents SDK.

**Live:** https://shahzain-ali.github.io/agentive-solutions-book/

## Structure

- **Multi-book layout** — each course lives under its own path (`/docs/n8n-mastery/lesson-01`, …)
- **Lesson pages** — YouTube video embed (top) + full lesson notes (chapter) + Resources section (slides, workflow files, GitHub links)
- **AI Tutor (Phase 2)** — RAG chatbot (FastAPI + Qdrant + embeddings) with floating chat widget, "Ask AI" text selection, and source citations

## Tech Stack

| Layer | Choice |
|-------|--------|
| Site | Docusaurus + GitHub Pages |
| Backend (Phase 2) | FastAPI on Hugging Face Spaces |
| Vector DB | Qdrant Cloud |
| Chat DB | Neon Postgres |
| Analytics | Google Analytics 4 |

## Local Development

```bash
npm install
npm run start    # dev server
npm run build    # production build
npm run serve    # serve the build locally
```

## Deployment

Pushing to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`) which builds the site and deploys it to GitHub Pages.

Before the first deploy:
1. Replace the GA4 placeholder `G-XXXXXXXXXX` in `docusaurus.config.js` with your real Measurement ID.
2. In the repo settings, set **Pages → Source → GitHub Actions**.

## Content Source

Lesson content is authored in the [n8n-mastery](https://github.com/Shahzain-Ali/n8n-mastery) repo (`lesson-NN/notes.md`) and copied here as-is — the notes are the single source of truth.

## License

- **Code** (site config, components, backend, scripts): [MIT](LICENSE)
- **Course content** (`docs/`, slides, resources): All Rights Reserved — see [LICENSE-CONTENT.md](LICENSE-CONTENT.md)
