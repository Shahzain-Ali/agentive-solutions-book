# Slides Standard — Agentive Solutions Books

Har lesson ka deck is file ke mutabiq banta hai. **Content badalta hai; design kabhi nahi.**

Yeh file do cheezein rakhti hai: deck banane ka **process** (§1) aur uska **design system** (§2–§7). Lesson document ka blueprint alag file mein hai — `documents-standard.md`.

---

## 1. Process (MANDATORY)

Slides lesson document ke **baad** banti hain, pehle nahi. Document approved na ho to deck shuru nahi hoga.

**Step 1 — Slide plan pehle.**
Deck banane se pehle ek plan pesh hoga: kitni slides, kaunsi tarteeb, har slide ka maqsad aur uska source section. Shahzain isse approve karega. Approval ke baghair ek bhi slide nahi banegi.

**Step 2 — Tarteeb ka meyaar sirf ek hai: best teaching order.**
Deck document ke section order ki naql **nahi** karta. Document parhne ke liye hai, deck dekhne ke liye. Misal:
- Sources, Interview Points, aur Quiz slides pe aate hi nahi — woh notes mein rehte hain
- Jo cheez document mein Section 7 par hai woh deck mein slide 3 ban sakti hai, agar sikhane ke liye wahan behtar baithti hai

**Step 3 — Ek waqt mein ek slide.**
Slide banti hai → image render hoti hai → Shahzain verify karta hai → phir agli slide. Har slide ki image dikhayi jayegi taake pptx khole baghair faisla ho sake.

**Step 4 — QA.**
Deck mukammal hone par: schema validation, poore deck ka visual pass (overflow, overlap, contrast), aur unverified numbers ka scan.

### Teaching order (MANDATORY — sab se zyada tooti hui cheez)

**Video ke unwan wala concept pehle ~90 second mein define ho jana chahiye.**

Agar video ka naam "What is RAG" hai aur paanch minute tak sirf problem chal rahi hai, viewer nikal jayega — usse laga hi nahi ke woh sahi video mein hai.

Sahi tarteeb:

```
1. Topic      — cheez hai kya (foran, ek jumle mein)
2. Analogy    — rozmarra ki zindagi mein woh kya lagti hai
3. Problem    — zaroorat kyun pari (CHHOTA — ek slide, do se zyada nahi)
4. Solution   — kaam kaise karti hai
5. Close      — takeaways + do sawal
```

Problem ko hook banane ke liye **ek slide kaafi hai.** Chaar slides problem par lagana deck ki sab se aam ghalti hai.

### Slide count — kitni slides?

**Slide count topic se nikalta hai, ghari se nahi.** Har cheez ko jitni slides chahiyen, utni — na kam, na zyada. Ek idea ki ek slide.

Neeche ke aankray **target nahi, sirf sanity check hain** (`documents-standard.md` §7):

| Video | Slides — motay tor par |
|---|---|
| 6 min | ~8 |
| 10 min *(aam hadd)* | **~12–13** |
| 20–25 min *(sirf exception)* | ~22–28 |

Agar plan is se kaafi zyada nikal raha hai to masla slides ka nahi — **topic bara hai.** Content kaato nahi; lesson todo aur `planning/<book>-plan.md` update karo.

Kam slides bilkul theek hain. **Chhota deck bura nahi; bhara hua deck bura hai.**

**Exception wale lessons** (`documents-standard.md` §7 ka test pass kiya ho) mein deck bara ho sakta hai — lekin wahan bhi slides content se nikalti hain, waqt bharne ke liye nahi.

### Agenda slide

Ek "What You'll Learn Today" slide, **shuru mein, sirf ek dafa**:

- **3–4 items**, is se zyada nahi
- Har item: chhota unwan + ek line ki tafseel
- Document ki outcome list ki naql nahi — woh 5–6 ho sakti hai; slide par 4 se zyada nahi

### Closing slide — do sawal

Aakhri content slide par **do sawal** isi lesson se, aur viewer se comments mein jawab maanga jaye. Assignment ki lambi table slide par nahi jati — woh notes mein rehti hai.

### Zubaan — hum parhate hain, bechte nahi

Yeh alfaaz teaching lessons ki slides par **nahi** aayenge:

| Mana | Kyun |
|---|---|
| "Where the money is", "clients pay for" | Lesson ka maqsad parhana hai. Paisa apna alag lesson hai |
| "Use this in the meeting", "wins projects" | Sales ki zubaan hai, teacher ki nahi |
| "Sell outcomes, not architecture" | Business advice — teaching lesson mein nahi |

Business, pricing aur client conversations ka **apna alag lesson** banega. Unhe teaching lessons mein chhirakna dono ko kamzor karta hai.

### Slides pe kya kabhi nahi jata

Yeh sections lesson document mein rehte hain, deck mein nahi aate:

| Section | Kyun nahi |
|---|---|
| **Sources** | Screen pe koi URL parh kar type nahi karta — woh notes ke liye hai |
| **Quick Quiz** | On-screen MCQ video ki raftaar tor deta hai; quiz notes mein hal hota hai |
| **Interview Points** | Reference material hai, teaching nahi |
| **Troubleshooting table** | Tab dekha jata hai jab kuch tootay — video ke doran nahi |
| **Table of Contents** | Agenda slide alag cheez hai; TOC ki naql mat karo |
| **Poore paragraphs** | Jo document mein teen jumle hain woh slide pe 5 lafz + ek visual banta hai — baaqi aap bolte hain |

Assignment aur Key Takeaways deck mein **aate hain** — woh video ka natural anjaam hain.

---

## 2. Content Rules

- **Ek slide = ek idea.** Do cheezein hain to woh do slides hain.
- **Slide pe zyada se zyada 5 bullets**, har bullet 10 lafz se kam.
- **Har slide mein kam se kam ek visual** — icon, diagram, table, ya stat.
- **Facts document se inherit hote hain.** Deck koi naya fact nahi la sakta. Jo claim document mein verified nahi, woh slide pe nahi jayegi.
- **Koi number bina source ke nahi.** Agar document mein uska source nahi, to deck se bhi nikal do.
- **Placeholder screen pe nahi chhorna.** Agar koi cheez baad mein bharni hai to usse accent rang aur bracket mein rakho, aur speaker notes mein reminder likho.

### Naming (fixed across every book and playlist)

Har video, har chapter, har slide par lafz **"Lesson"** hai — "Episode", "Part", "Chapter" nahi.

| Jagah | Format |
|---|---|
| Title slide ka kicker | `AGENTIVE SOLUTIONS · <BOOK NAME> · LESSON NN` |
| Content slide ka footer (right) | `<Book Name> · Lesson NN` |
| Lesson document ka header | `**Lesson:** N of M` |
| Playlist plan ke headings | `## Lesson N — <Name>` |

Wajah: viewer n8n Mastery se RAG book mein aata hai aur wapas jata hai. Ek hi lafz har jagah = ek hi series ka ehsaas.

### Language Layout (fixed)

| Element | Language |
|---|---|
| Sab kuch jo screen pe likha hai | **English** |
| Speaker notes (delivery cues) | **Roman Urdu** + English technical terms |
| Technical terms (chunk, embedding, retrieval, trigger…) | Hamesha English — kabhi translate nahi |

**Usool:** slide pe wohi English lafz likho jo aap Roman Urdu mein bolte waqt translate kiye baghair keh sakein. Agar bolte waqt lafz badalna par raha hai, to woh lafz slide pe bhi ghalat hai. *(Isi wajah se "sneaker" ki jagah "shoe", aur "tell apart" ki jagah "spot the difference".)*

---

## 3. Colour Palette — "Midnight Automation"

Yeh Agentive Solutions ka brand palette hai — **har book mein wohi** (n8n Mastery, RAG for Automation, aage jo bhi aaye). Ek jaisa dikhna hi brand hai.

| Role | Hex | Usage |
|---|---|---|
| Background (dominant, ~65%) | `#1B1526` | Har slide ka background — deep plum charcoal |
| Card / surface | `#262038` | Content cards, table cells |
| Card raised | `#2E2745` | Icon circles, table headers, chips |
| Accent (primary) | `#EA4B71` | Bare numbers, kickers, highlights, CTA |
| Support 1 | `#8B7FD7` | Soft purple — secondary icons, markers |
| Support 2 | `#34D399` | Teal-green — success side, positive stats |
| Text | `#F5F2FA` | Headings aur body |
| Muted text | `#A79DBF` | Captions, descriptions, footers |

**Rule of dominance:** dark background har jagah, accent bohat kam — ek slide par ek hi hero element. Sab rangon ko barabar wazan kabhi mat do.

**Rang ka matlab tay karo aur nibhao.** Agar deck mein levels/tiers hain to har tier ka ek rang fix karo aur poore deck mein wohi rakho — viewer rang dekh kar hi pehchan lega.

---

## 4. Typography

| Element | Font | Size |
|---|---|---|
| Title slide ka title | Arial Bold | 44pt |
| Slide titles | Arial Bold | 32–36pt |
| Kickers / labels | Arial Bold, letter-spaced, ALL CAPS, accent | 12–14pt |
| Section/card headers | Arial Bold | 16–18pt |
| Body text | Calibri | 13–15pt |
| Captions/footers | Calibri | 10–11pt muted |
| Code | Courier New | 13–14pt on `#262038` card |

Safe fonts — PowerPoint aur Google Slides dono mein bilkul ek jaise render hote hain.

---

## 5. Visual Motif

Icons **raised rounded circles** ke andar (`#2E2745` circle + coloured icon) — har content slide par. Yeh playlist ka signature element hai.

- Koi accent stripe nahi, title ke neeche koi lakeer nahi — whitespace hi alag karta hai
- Agar deck mein koi recurring model hai (jaise 3-tier ladder), to usse **chhota kar ke corner mein** dohrao, current hissa highlight kar ke — viewer ko hamesha pata rahe woh kahan hai

---

## 6. Layout Templates

1. **Title** — dark bg, decorative glow circles, kicker + 44pt title + subtitle + 3 chips
2. **Agenda / grid** — 2×2 ya 2×3 cards, icon circle + bold header + muted description
3. **Concept** — definition card left, analogy card right
4. **Comparison** — do side-by-side cards ya 3–4 column table
5. **Diagram / flow** — rounded nodes + arrows, label chips nodes ke upar
6. **Stats** — bare number callouts (36–40pt accent) chhote muted labels ke sath
7. **Summary / CTA** — numbered takeaways + next-lesson card

Ek hi template baar baar mat dohrao — columns, cards aur callouts badalte raho.

---

## 7. Standing Elements

- **Size:** 16:9 widescreen (13.33" × 7.5"), margins ≥ 0.6"
- **Footer** har content slide par (10pt muted):
  - left: `Agentive Solutions`
  - right: book ka naam — `n8n Mastery · Lesson NN` ya `n8n Mastery · Standalone`
- **Title slide** par footer nahi — uski jagah brand line: `SolutionsWithShahzain · Agentive Solutions`
- **Aakhri slide** hamesha ek **social slide** hogi: sirf brand + saare platform handles. Isme lesson ka naam, tareekh, ya "coming soon" jaisi koi cheez nahi hogi — yeh slide screenshot le kar har video mein dobara istemal hoti hai, isliye woh kabhi purani nahi honi chahiye.
- **Speaker notes** har slide par — Roman Urdu delivery cues

### Animation (Google Slides)

- Sirf Appear/Fade, on click, bullet groups ke liye — koi motion-heavy effect nahi
- Diagrams: nodes left→right ek ek click par
- Titles aur footers kabhi animate nahi hote

---

## 8. QA Checklist (deck ship karne se pehle)

- [ ] Slide plan approved tha, aur deck usi ke mutabiq bana
- [ ] Topic pehle ~90 second mein define ho jata hai (§1 teaching order)
- [ ] Problem sirf ek slide par hai
- [ ] Agenda slide mein 4 se zyada items nahi
- [ ] Aakhri content slide par do sawal hain
- [ ] Selling wali zubaan kahin nahi (§1)
- [ ] Slide count video ki lambai ke mutabiq hai (§1)
- [ ] Sources / Quiz / Interview Points deck mein nahi gaye (§1)
- [ ] Har slide alag se verify hui
- [ ] Screen pe sab English, speaker notes Roman Urdu
- [ ] Koi text apne box se bahar nahi, koi overlap nahi, margins ≥ 0.6"
- [ ] Har number ka source lesson document mein mojood hai
- [ ] Koi placeholder screen pe nahi (ya accent rang + speaker note reminder ke sath)
- [ ] Footer har content slide par, brand `Agentive Solutions`
- [ ] Aakhri social slide mojood hai aur video-agnostic hai
- [ ] File validate hui aur poora deck image mein dekha gaya

---

*Companion: `documents-standard.md` (lesson blueprint) · `CONTRIBUTING.md` (repo structure)*
