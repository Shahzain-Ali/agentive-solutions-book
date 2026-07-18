# Documents Standard — n8n-mastery Course Notes

Yeh file har lesson ki `notes.md` ka blueprint hai. Koi bhi AI ya contributor is file + `CLAUDE.md` ko parh kar exactly isi standard ka document bana sakta hai.

**Reference example:** [lesson-01/notes.md](lesson-01/notes.md) — completed, approved sample.

---

## 1. Purpose

Har `notes.md` teen kaam karti hai:

1. **Instructor ki teaching prep** — isi se lesson parhaya jata hai (recording ke waqt doosri screen per)
2. **Students ka reference** — video ke baad revision, self-paced follow-along
3. **Long-term value** — interview prep + portfolio-grade documentation

Quality bar: instructor ka FB/IG API Setup Guide (click-level detail, tables, troubleshooting, checklists).

---

## 2. Language Layout (FIXED — kabhi mat badlo)

| Element | Language |
|---------|----------|
| ALL headings + Table of Contents | English |
| Teaching sections (concepts, explanations, implementation steps) | Roman Urdu + English technical terms |
| Tables, code, commands, UI labels | English |
| Reference sections (Best Practices, Assignment, Quick Quiz, Summary, Interview Points, Sources) | Fully English |

---

## 3. Document Structure (section order FIXED)

Har notes.md mein yeh sections, isi order mein. Lesson ke type ke hisaab se kuch optional hain:

| # | Section | Required? | Kya Hota Hai |
|---|---------|-----------|--------------|
| — | **Header block** | ✅ Always | Title (`# Lesson NN — Name`), course/module/duration, prerequisites, "Facts verified: [month year]" |
| — | **Table of Contents** | ✅ Always | Numbered, linked anchors, English |
| 1 | **What You'll Learn in This Lesson** | ✅ Always | Checkbox list — measurable outcomes ("samjha sakenge", "bana sakenge") |
| 2+ | **Concept sections** (2–5 sections) | ✅ Always | Definition (English, quotable) → Roman Urdu explanation → analogy (Pakistani context: food delivery, ATM, cricket, traffic) → examples table |
| — | **Diagrams** | Jahan zaroori | ASCII/markdown diagrams + terms table |
| — | **Step-by-Step Implementation** | Hands-on lessons | Numbered steps: kya click karna, kis order mein, expected result har step ka, screenshot placeholders (`[screenshot: name.png — capture on recording day]`), warnings (⚠️) |
| — | **Real-World Scenario** | ✅ Always | Ek business case jahan yeh concept use hota hai |
| — | **Common Beginner Mistakes** | ✅ Always | Table: Mistake → Sahi Approach |
| — | **Best Practices & Industry Tips** | ✅ Always | Numbered, English, actionable |
| — | **Troubleshooting** | Hands-on lessons | Table: Error → Cause → Solution |
| — | **Assignment** | ✅ Always | Concrete task + fillable table + filled example + comment CTA |
| — | **Quick Quiz** | ✅ Always (evaluations mandatory) | 4–5 scenario-based MCQs, English, answers `<details>` collapsible mein with explanations |
| — | **Summary & Key Takeaways** | ✅ Always | 4–5 numbered lines, English |
| — | **Interview Points** | ✅ Always | Q&A format, English, 1–2 line crisp answers |
| — | **Sources** | ✅ Always | Verified links + verification date |
| — | **Footer** | ✅ Always | Next lesson link + channel/social links |

---

## 4. Style Rules

- **Verify first:** har fact/stat/price official source se verified + date-stamped ("verified July 2026") — details `CLAUDE.md` ke Verify-Before-Answer rule mein
- **No repetition:** pichle lessons ka parhaya hua concept dobara explain nahi hota — sirf one-line recall pointer (details `CLAUDE.md`)
- **Scope discipline:** jo topic kisi aur lesson ka hai, wahan sirf "Lesson N mein detail se" likho
- **Tables > paragraphs** jab bhi data compare/list ho raha ho
- **Analogies:** sirf woh jo instructor khud confidently bol sake (Pakistani daily life)
- **Original content:** kisi bhi source (docs, Academy, courses) se copy nahi — sab apne alfaaz, apne examples
- **Screenshots:** sirf apne workflows ke, recording day per capture, placeholders pehle se likhe hue
- **Numbers/claims viewer fact-check kar sakta hai** → source link zaroor

---

## 5. Quality Checklist (publish se pehle)

- [ ] Saare headings + TOC English mein, anchors kaam karte hain
- [ ] Language layout follow hua (section 2 ke mutabiq)
- [ ] Har fact verified + date-stamped, Sources section complete
- [ ] Quiz mein 4+ scenario-based questions with collapsible answers
- [ ] Assignment concrete hai (fillable + example)
- [ ] Interview Points crisp hain (1–2 lines per answer)
- [ ] Pichle lessons se koi repetition nahi
- [ ] Screenshot placeholders marked
- [ ] Next lesson link + social footer

---

*Is standard ka approved reference: `lesson-01/notes.md` · Rules ki parent file: `CLAUDE.md`*
