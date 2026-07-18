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

- One topic = one **numbered folder** (`01-`, `02-`, …) with a `README.md` inside.
- Keep the root [`README.md`](./README.md) index updated — add a row for each new guide.
- Shared images go in [`assets/`](./assets/).
- Use a real, tested example over a toy one wherever possible.

---

## 🔗 Trusted Sources (verify against these)

- Official n8n docs: <https://docs.n8n.io>
- n8n Academy (courses): <https://learn.n8n.io>
- n8n templates library: <https://n8n.io/workflows>
- Node/tool official repos and changelogs

---

*Standard maintained by [Shahzain Ali](https://github.com/Shahzain-Ali). Consistency is the credibility.*
