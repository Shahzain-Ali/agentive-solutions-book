# Contributing & Documentation Standard

This repo isn't just notes — it's a **teaching resource**. Every guide follows the same standard so
readers get the same clarity, accuracy, and trust in **every** part of the series.

Before writing a single word of a new guide, fill out the **Doc-Brief** below. It's the blueprint
that keeps each doc focused and confusion-free.

---

## 📝 The Doc-Brief (answer these 7 before writing)

Copy this block to the top of your working notes for each new topic and fill it in:

```
DOC-BRIEF — "<topic name>"

1. WHO       : Who reads this? (beginner? advanced? both — describe them)
2. WHY / JOB : What can the reader DO after reading? (the outcome)
2.5 SCOPE    : ✅ What this doc covers   ❌ What it deliberately does NOT
3. LEARN     : Which sources did I master first? (so I'm not guessing)
4. EXISTS?   : What already exists? (link it — don't reinvent, add value)
5. FIND/USE  : How will readers find & navigate it? (folder, index, headings)
6. MAINTAIN  : How will this stay current? (version tested on, review cadence)
```

> **Why it works:** most weak docs fail on steps **1, 2, and 6**. Spend the most time there — that's
> the gap between "some notes" and a professional guide.

---

## ✅ Quality Standards (non-negotiable)

Every guide in this repo must meet these:

1. **Verified, not remembered.** Every claim, command, version number, price, or policy is checked
   against the **official source** before it's written — never from memory. Link the source.
2. **Tested, not theoretical.** Commands and steps are run on a real instance before publishing. If a
   gotcha shows up during testing (e.g. a default that breaks things), it goes into the doc.
3. **Mark who does what.** Use clear signals so the reader never wonders whose step it is:
   - 🧑 = a manual step the reader does
   - 📋 = a ready-to-copy prompt / command
4. **Beginner-safe, expert-deep.** Plain-language intro up front; advanced patterns and edge cases at
   the end. One guide should serve both.
5. **Cross-platform where it matters.** Note Windows / macOS / Linux differences (e.g. shell syntax).
6. **Bilingual for the audience.** Every **definition** and **example** includes both an English
   version and a Roman Urdu version (marked with `🗣️`). The concept, structure, tables, and headings
   stay English (credibility + global reach + searchability); the Roman Urdu line makes it click for
   the video audience. Format:
   ```
   Real example: "When a support email arrives → an LLM summarizes it."
   > 🗣️ Roman Urdu: Support email aaye → AI usko summarize kare.
   ```

---

## 📁 Structure Conventions

This repo is the **Agentive Solutions interactive book** (Docusaurus). All published content lives
under `docs/`, organised by book:

```
docs/
  <book-name>/            e.g. n8n-mastery/ , rag-for-automation/
    lesson-01.md          one lesson = one file = one video episode
    lesson-02.md
  standalone-guides/      one-off guides that belong to no book
planning/                 curricula and playlist plans (not published)
```

**The three standards files (repo root):**

| File | Governs |
|---|---|
| `CONTRIBUTING.md` | repo structure, quality bar, trusted sources (this file) |
| `documents-standard.md` | the lesson document blueprint |
| `slides-standard.md` | the slide deck — process, design system, QA |

- **One lesson = one file = one episode.** File name is `lesson-NN.md`, zero-padded.
- Every lesson file needs Docusaurus front-matter: `id`, `sidebar_position`, `sidebar_label`,
  `description`.
- Sidebar order comes from `sidebar_position` — keep it in sync with the episode number.
- A book's curriculum lives in `planning/<book>-plan.md` and is the source of truth for what each
  episode covers. Update the plan **before** writing a lesson that deviates from it.
- Shared images go in `static/img/`.
- Use a real, tested example over a toy one wherever possible.

> **Note:** an older version of this rule described numbered folders each containing a `README.md`.
> That convention belonged to the pre-Docusaurus notes repo and no longer applies here.

---

## 🔗 Trusted Sources (verify against these)

Always verify against the **official** source for whatever the lesson covers — never from memory,
never from a blog summary. For the current books that means:

- Official n8n docs: <https://docs.n8n.io> · release notes: <https://docs.n8n.io/release-notes>
- n8n Academy (courses): <https://learn.n8n.io> · templates library: <https://n8n.io/workflows>
- OpenAI platform docs: <https://platform.openai.com/docs>
- Qdrant docs: <https://qdrant.tech/documentation>
- Original papers for any named technique (e.g. RAG → Lewis et al., 2020)
- Node/tool official repos and changelogs

**Inherited claims count as unverified.** A fact copied from an earlier lesson, a plan file, or a
previous draft is not verified just because it is already written down. Re-check it against the
original source, and record the check date in that lesson's Sources section.

---

*Standard maintained by [Shahzain Ali](https://github.com/Shahzain-Ali). Consistency is the credibility.*
