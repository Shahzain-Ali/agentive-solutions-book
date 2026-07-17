---
id: 0002
title: Embed Slides As Teaching Aid
stage: general
date: 2026-07-15
surface: agent
model: claude-fable-5
feature: none
branch: master
user: Shahzain-Ali
command: none
labels: ["slides", "pdf-embed", "teaching-aid", "css-fix", "n8n-mastery"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - src/css/custom.css
 - docs/n8n-mastery/lesson-01.md
 - docs/n8n-mastery/lesson-02.md
 - docs/n8n-mastery/lesson-03.md
 - static/resources/n8n-mastery/lesson-01/slides.pdf
 - static/resources/n8n-mastery/lesson-01/slides.pptx
 - static/resources/n8n-mastery/lesson-02/slides.pdf
 - static/resources/n8n-mastery/lesson-02/slides.pptx
 - static/resources/n8n-mastery/lesson-03/slides.pdf
 - static/resources/n8n-mastery/lesson-03/slides.pptx
tests:
 - npm run build (clean, no warnings)
 - Verified <title> inference and Teaching Aid sections in built HTML
 - Verified PDF served with application/pdf on dev server
---

## Prompt

1. In white theme the text color of the n8n Mastery and Module - 1 Foundations is not shows properly like when i hover on it the background turn into gray and the text is shows as white in white theme. So fix this

2. Resources — we are making this book because we haven't uploaded any content on my GitHub. So what's your plan for this, how can we embed this in the book?

3. For chatwidget can we use the perfect approach like industry use this approach for chatwidget?

[Follow-ups] Before implementation discuss first. Check what Agent Factory did → confirmed they embed PDF slide decks as "Teaching Aid". User approved Option A (PDF embed), exported slides.pdf for all 3 lessons, said "I did, let's check".

## Response snapshot

1. Sidebar CSS fix: `.menu__link--active` was painting category labels (n8n Mastery, Module 1) white-on-gray in light theme on hover. Scoped filled gradient pill to `:not(.menu__link--sublist)`, gave active category labels accent-color text with readable hover state.
2. Verified Agent Factory (agentfactory.panaversity.org) embeds PDF slide decks as a "Teaching Aid" section with Fullscreen link — same as recommended Option A. Copied slides.pdf + slides.pptx for lessons 1–3 into static/resources/n8n-mastery/lesson-NN/, added "🖥️ Slides — Teaching Aid" section (embedded PDF iframe + Fullscreen + Download PowerPoint) after each lesson's metadata block, replaced dead GitHub links in Resources with local downloads.
3. Fixed title-inference regression: video :::info box before the H1 stopped Docusaurus from inferring page titles (pages showed "lesson-01" as title). Moved video box after H1+metadata; titles now correct.
4. ChatWidget industry-standard approach deferred to Phase 2 per user decision.

## Outcome

- ✅ Impact: Slides viewable inline per lesson without publishing course repo; sidebar readable in light theme; correct page titles/SEO
- 🧪 Tests: clean production build; titles verified: "Lesson 01 — What is Automation & Why n8n? | Agentive Solutions"; PDF served as application/pdf
- 📁 Files: 4 modified, 6 resource files added
- 🔁 Next prompts: GA4 real ID, GitHub repo + push, YouTube embeds, Phase 2 chatwidget upgrade discussion
- 🧠 Reflection: Docusaurus only infers contentTitle when H1 is the first content node — anything placed above the H1 silently breaks page titles

## Evaluation notes (flywheel)

- Failure modes observed: content inserted before H1 broke title inference (caught during built-HTML verification, not build warnings)
- Graders run and results (PASS/FAIL): build PASS; title check PASS; PDF content-type PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): replace video placeholders with real YouTube embeds on publish
