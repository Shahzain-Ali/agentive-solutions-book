# Documents Standard — Agentive Solutions Book Lessons

Yeh file har lesson file (`docs/<book>/lesson-NN.md`) ka blueprint hai. Koi bhi AI ya contributor is file + `CONTRIBUTING.md` ko parh kar exactly isi standard ka document bana sakta hai.

**Reference example:** [docs/n8n-mastery/lesson-01.md](docs/n8n-mastery/lesson-01.md) — completed, approved sample.

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
| **What You'll Learn** (learning outcomes) | **Fully English** |
| Teaching sections (concepts, explanations, implementation steps) | Roman Urdu + English technical terms |
| Tables, code, commands, UI labels | English |
| Reference sections (Best Practices, Assignment, Quick Quiz, Summary, Interview Points, Sources) | Fully English |
| Footer | English |

---

## 3. Document Structure (section order FIXED)

Har notes.md mein yeh sections, isi order mein. Lesson ke type ke hisaab se kuch optional hain:

| # | Section | Required? | Kya Hota Hai |
|---|---------|-----------|--------------|
| — | **Header block** | ✅ Always | Title (`# Lesson NN — Name`), book/episode number, prerequisites, "Facts verified: [month year]". **Video duration is NOT written here** — see §6 |
| — | **Table of Contents** | ✅ Always | Numbered, linked anchors, English |
| 1 | **What You'll Learn in This Lesson** | ✅ Always | Checkbox list, **English** — measurable outcomes starting with a verb ("Explain…", "Name…", "Build…", "Choose…") |
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
| — | **Footer** | ✅ Always | Next lesson link, then the brand line — exact format below |

---

## 4. Style Rules

- **Verify first:** har fact/stat/price official source se verified + date-stamped ("verified July 2026") — details `CLAUDE.md` ke Verify-Before-Answer rule mein
- **No repetition:** pichle lessons ka parhaya hua concept dobara explain nahi hota — sirf one-line recall pointer (details `CLAUDE.md`)
- **Scope discipline:** jo topic kisi aur lesson ka hai, wahan sirf "Lesson N mein detail se" likho
- **Tables > paragraphs** jab bhi data compare/list ho raha ho
- **Analogies:** sirf woh jo instructor khud confidently bol sake (Pakistani daily life). Analogy woh chuno jo audience pehle se jaanti ho — agar analogy khud samjhani pare to woh nakaam hai (misal: "open-book exam" Pakistan mein aam nahi, "doctor aur patient file" hai)
- **Technical vocabulary is NEVER translated:** concepts jinka industry-standard English term hai (chunk, embedding, vector, retrieval, grounding, tool calling, trigger, execution...) hamesha English mein likho. Roman Urdu sirf explanation ke liye hai, term ke liye nahi. Ek dafa gloss dena theek hai ("chunks — yani tukray"), uske baad har jagah English term hi chalega. Students ko industry vocabulary seekhni hai: **"faisle" nahi, "decision-making"** (misal: *"Brain + Tools + Decision-Making = Agent"*)
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
- [ ] Docusaurus front-matter mojood hai (`id`, `sidebar_position`, `sidebar_label`, `description`)
- [ ] "What You'll Learn" poori English mein hai
- [ ] Footer exactly §6 wale format mein hai (Agentive Solutions + YouTube link)
- [ ] Runtime §7 ke mutabiq hai — aam hadd 10 minute; 20–25 minute sirf tab jab §7 ka exception test pass ho, aur us ki wajah `planning/<book>-plan.md` mein likhi ho

---

## 6. Footer (fixed — copy exactly)

Brand naam **Agentive Solutions** hai. YouTube channel uske links mein shamil hai, brand ki jagah nahi.

```markdown
**Next Lesson →** Lesson NN — <Name> *(coming soon)*

**Agentive Solutions** · [YouTube](https://www.youtube.com/@SolutionsWithShahzain) · [GitHub](https://github.com/Shahzain-Ali) · [LinkedIn](https://linkedin.com/in/shahzain-ali1) · [Instagram](https://instagram.com/shahzainalibangash1) · [Facebook](https://facebook.com/shahzainalibangash1)
```

---

## 7. Scope & Video Length (topic-first rule)

Video ki lambai **document ke header mein nahi likhi jati** — woh andaza hota hai, aur ghalat andaza document ko jhutla deta hai.

### Asal usool: ek video = ek topic

**Lambai maqsad nahi hai. Topic maqsad hai.**

- Topic 6 minute mein poora ho jaye to video 6 minute ki hai. Usse kheench kar barha mat karo.
- **Koi kam se kam waqt nahi hai.**
- **Aam hadd: 10 minute.** Zyadatar lessons isi ke andar aani chahiyen.
- 10 se barh raha hai? Pehla khayal yeh nahi hona chahiye ke "video lambi kar lete hain" — balke yeh ke **shayad main ek video mein do topics parha raha hoon.** Content kaato nahi; `planning/<book>-plan.md` mein lesson todo, phir likho.

### Exception: 20–25 minute (sirf kuch topics ke liye)

Kuch topics fitri tor par lambe hote hain aur unhe torna nuqsan-deh hota hai. Un ke liye video **20–25 minute** tak ja sakti hai.

**Lekin exception ka apna test hai — usse pass kiye baghair exception nahi milti:**

> **Kya isse do lessons mein tora ja sakta hai, is tarah ke pehli lesson bhi apne aap mein mukammal ho — yani viewer ke haath mein kuch chalta hua aaye?**
>
> - **Haan** → exception nahi. Lesson todo.
> - **Nahi** → exception jaiz hai.

Aam tor par exception sirf **end-to-end hands-on builds** ko milti hai, jahan beech mein rukne se viewer ke paas adhoori ya tooti hui cheez reh jati hai. **Conceptual lessons ko exception kabhi nahi milti** — un mein torna hamesha mumkin hota hai.

**Exception istemal karein to `planning/<book>-plan.md` mein us lesson ke saamne wajah likhna lazmi hai** — warna agli dafa koi bhi lesson "lambi thi" keh kar 25 minute ki bana lega.

### Scope ka test (likhne se pehle)

Lesson ka poora maqsad **ek jumle** mein likho. Agar us jumle mein "aur" aa jaye — *"RAG kya hai **aur** uske 5 steps **aur** fine-tuning se farq"* — to woh ek lesson nahi, teen hain.

### Prerequisites

Sirf tab likho jab **waqai koi ho** (misal: "Lesson 4 dekhna zaroori hai"). *"Zero prerequisites"* / *"koi nahi"* kabhi mat likho — woh khali shor hai aur reader ka waqt leta hai.

---

## 8. Slides

Har lesson ka deck lesson document ke **baad** banta hai, aur uske apne rules hain — process, design system, aur QA — sab `slides-standard.md` mein.

Do baatein yahan se wahan jati hain: deck sirf **verified facts** istemal karta hai (jo document mein source ke sath mojood hain), aur deck ki tarteeb document ke section order ki naql nahi karti — woh **best teaching order** par banti hai.

---

*Is standard ka approved reference: `docs/n8n-mastery/lesson-01.md` · Structure rules: `CONTRIBUTING.md` · Slides: `slides-standard.md`*
