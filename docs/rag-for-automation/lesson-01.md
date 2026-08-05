---
id: lesson-01
sidebar_position: 1
sidebar_label: "Lesson 01 — What is RAG & Why Businesses Need It"
description: "RAG for Automation Lesson 01 — What is RAG, why LLMs alone fail on business data, RAG vs fine-tuning vs long context, and real business use cases"
---

# Lesson 01 — What is RAG & Why Businesses Need It

**Book:** RAG for Automation (Agentive Solutions) · **Lesson:** 1 of 8
**Prerequisites:** Koi nahi — AI/ML background zaroori nahi. (n8n Mastery Lessons 1–3 helpful hain, lazmi nahi)
**Facts verified:** 30 July 2026 — har claim ka source aur check date §15 ki table mein

---

:::info 🎥 Video Lesson
Video coming soon — the YouTube embed will appear here once this lesson is published on the SolutionsWithShahzain channel.
:::

## 🖥️ Slides — Teaching Aid

<iframe
  src="/agentive-solutions-book/resources/rag-for-automation/lesson-01/slides.pdf"
  width="100%"
  height="480"
  title="Lesson 01 — Slides"
  style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}
></iframe>

<p>
  <a href="/agentive-solutions-book/resources/rag-for-automation/lesson-01/slides.pdf" target="_blank" rel="noopener noreferrer">🖥️ Fullscreen</a>
</p>

---

## Table of Contents

1. [What You'll Learn in This Lesson](#1-what-youll-learn-in-this-lesson)
2. [Why LLMs Alone Fail on Business Data](#2-why-llms-alone-fail-on-business-data)
3. [What is RAG?](#3-what-is-rag)
4. [RAG Architecture — The 5 Steps](#4-rag-architecture--the-5-steps)
5. [RAG vs Fine-Tuning vs Long Context](#5-rag-vs-fine-tuning-vs-long-context)
6. [Business Use Cases — Where RAG Makes Money](#6-business-use-cases--where-rag-makes-money)
7. [Live Example — The Tutor on This Page](#7-live-example--the-tutor-on-this-page)
8. [Real-World Scenario](#8-real-world-scenario)
9. [Common Beginner Mistakes](#9-common-beginner-mistakes)
10. [Best Practices & Industry Tips](#10-best-practices--industry-tips)
11. [Assignment](#11-assignment)
12. [Quick Quiz](#12-quick-quiz)
13. [Summary & Key Takeaways](#13-summary--key-takeaways)
14. [Interview Points](#14-interview-points)
15. [Sources](#15-sources)

---

## 1. What You'll Learn in This Lesson

By the end of this lesson you will be able to:

- [ ] Explain what RAG means in your own words
- [ ] Explain why an LLM alone fails on business data (3 reasons)
- [ ] Name the 5 steps of RAG architecture
- [ ] Choose between RAG, fine-tuning and long context for a client
- [ ] Identify 3 business use cases where RAG makes money (assignment)

> **Note:** Yeh lesson pura conceptual hai — koi code nahi. Hands-on kaam Lesson 2 se shuru hoga (embeddings + vector database). Aur haan — is page ke corner mein jo chat tutor hai, **woh khud ek RAG system hai** jo isi book per chalta hai. Aaj aap wohi cheez samajhne ja rahe hain jo abhi aapke samne chal rahi hai.

---

## 2. Why LLMs Alone Fail on Business Data

### The Problem

> **An LLM knows the world's public knowledge — but it knows nothing about YOUR business, and when it doesn't know, it confidently guesses.**

> 🗣️ Roman Urdu: LLM ko duniya ka public knowledge aata hai — lekin AAPKE business ka kuch nahi pata, aur jab nahi pata hota to woh confidence se andaza laga leta hai.

### Analogy: The New Employee 🧑‍💼

Socho aapne ek bohat parha-likha employee rakha — usne duniya bhar ki kitaben ratta laga rakhi hain. Lekin pehle din:

- Customer poochta hai: **"Aapke paas Karachi mein same-day delivery hai?"**
- Employee ko aapki delivery policy ka **kuch nahi pata** — lekin sharminda hone ke bajaye woh confidence se keh deta hai: *"Ji bilkul, 2 ghante mein pohnch jayega!"*
- Aapki policy mein same-day delivery **hai hi nahi.** Customer naraz, aur business ki reputation ko nuqsan.

Yehi ChatGPT/LLM hai jab aap usse apne business ke bare mein sawal karte ho. Teen masail:

| # | Problem | Matlab | Business Impact |
|---|---------|--------|-----------------|
| 1 | **Stale knowledge** | Training data ek cutoff date tak ka hai — uske baad ki duniya ka nahi pata | Naye products, naye rates missing |
| 2 | **Hallucination** | Jawab nahi pata to bana kar de deta hai — poore confidence se | Customer ko ghalat price/policy batana |
| 3 | **No access to your data** | Aapke documents, policies, prices training mein the hi nahi | "Hamari refund policy kya hai?" — sahi jawab de hi nahi sakta, aur khamosh rehne ke bajaye bana kar de dega |

### Everyday Example (Try It Yourself)

ChatGPT kholo aur apne **apne** business ke bare mein poocho:

> *"Meri dukan ki refund policy kya hai?"*

Aur ab dhyan se dekho ke kya hota hai. **Woh yeh nahi kehta ke mujhe nahi pata — woh jawab de deta hai.** Ek aam sa refund policy ka paragraph gharh kar, poore aitmaad ke sath. Yehi hallucination hai.

⚠️ **Ek ehtiyat:** aaj ka ChatGPT web search bhi kar sakta hai. Agar aapki policy aapki **website par likhi hui hai**, to woh usse dhoond kar sahi jawab de sakta hai. Asal khali jagah wahan hai jo kabhi public hui hi nahi — **andar ki rate list, client ka record, SOPs, WhatsApp par tay hui shartein.** Wahan model ke paas andaza ke siwa kuch nahi.

> 🗣️ English: A public model can now search the web, so anything published on your site is fair game. The real gap is everything that was never published — internal rates, client records, SOPs. There, it has nothing but a guess.

Isi khali jagah ko RAG bharta hai.

---

## 3. What is RAG?

### Definition

> **RAG (Retrieval-Augmented Generation) = before answering, the AI first RETRIEVES the relevant facts from YOUR data, then GENERATES the answer using only those facts.**

> 🗣️ Roman Urdu: RAG ka matlab — jawab dene se pehle AI aapke apne data mein se related maloomat DHOONDTA hai (retrieve), phir sirf usi maloomat ko use karke jawab LIKHTA hai (generate).

### Analogy: The Doctor and Your File 🩺

Do doctor socho — dono ne wohi medical college se parha hai, dono ko ilm barabar hai:

- **Doctor A (LLM alone):** Aapko dekhta hai aur yaad ke bharose foran dawa likh deta hai. Aapki purani reports, allergy, chal rahi dawaiyan — kuch nahi dekha. File dekhi hi nahi, to jawab ek andaza hai. Andaza kabhi sahi bhi lag jata hai, magar rehta andaza hi hai.
- **Doctor B (RAG):** Pehle **aapki file kholta hai**, reports parhta hai, phir likhta hai — aur bata bhi deta hai: *"aapki report mein yeh likha hai, isliye yeh dawa."*

Dono ka ilm barabar hai. Farq sirf itna hai ke **Doctor B ne jawab dene se pehle AAPKA record dekha.** Yehi RAG hai — file aapka business data hai, aur "report mein yeh likha hai" aapka citation.

> 🗣️ English: Same knowledge, one difference — Doctor B opens your file before answering. That file is your business data; "it says so in your report" is the citation.

### The Three Words

| Word | Matlab |
|------|--------|
| **Retrieval** | Aapke data mein se relevant chunks (yani tukray) dhoondna |
| **Augmented** | LLM ke prompt mein woh chunks shamil karna — uski madad barhana |
| **Generation** | Un chunks ko dekh kar final jawab likhna |

> **Note:** "chunk" ek technical term hai — poori series mein hum yehi lafz istemal karenge, tarjuma nahi.

---

## 4. RAG Architecture — The 5 Steps

Har RAG system — chahe hamara book tutor ho ya kisi bank ka support bot — inhi 5 steps per chalta hai. Do phases mein socho: **tayyari** (jab content badle) aur **jawab** (har sawal per).

```
PHASE 1 — INGESTION (jab bhi content badle — pehli dafa poora, baad mein sirf naya):

  Aapka Data          1. INGEST            2. EMBED               3. STORE
  (docs, PDFs,   →   (chunks mein     →   (har chunk ka       →  (vector database
   policies)          todna)               "matlab-number"        mein rakhna)
                                           banana = vector)

PHASE 2 — QUERY (har sawal per, real-time):

  User ka sawal  →   4. RETRIEVE                    →   5. GENERATE
                     (sawal ka vector banao,            (LLM ko sawal + mile hue
                      database se sab se milte-          chunks do → grounded
                      julte chunks nikalo)               jawab + citations)
```

### Three Words You Just Met

Diagram mein teen naye lafz aaye — **chunk**, **embedding**, **vector database**. Abhi sirf tasawwur bana lein; teeno ko khol kar Lesson 2 aur 3 mein dekhenge.

| Word | Ek line mein | Misal |
|------|--------------|-------|
| **Chunk** | Bara document chhote hisson mein tora gaya | 20-safhe ki policy → lagbhag 60 chunks |
| **Embedding** | Har chunk ke *matlab* ka numbers mein tarjuma | "refund" aur "paisa wapas" ke numbers aapas mein qareeb aa jate hain |
| **Vector database** | Woh numbers rakhta hai aur qareeb-tareen dhoondta hai | Sawal aaya → sab se milte-julte 3 chunks nikal aaye |

> 🗣️ English: A chunk is a piece of a document. An embedding turns that piece's meaning into numbers. A vector database stores those numbers and finds the closest ones fast.

**Bas itna kaafi hai.** Kyun aur kaise — Lesson 2 (embeddings + vector database) aur Lesson 3 (chunking) mein.

### Each Step in Our Live System

Yeh sirf theory nahi — isi book ka tutor exactly aise banaya gaya hai:

| Step | Concept | Hamare Tutor Mein | Detail Kis Lesson Mein |
|------|---------|-------------------|------------------------|
| 1. Ingest | Content ko chunks mein todna | Book ke lessons → headings ke hisaab se chunks *(recording se pehle `embed_content.py` chala kar asal count confirm karein — book barhne par yeh number badalta hai)* | Lesson 3 |
| 2. Embed | Chunk → vector (matlab-numbers) | OpenAI `text-embedding-3-small` | Lesson 2 |
| 3. Store | Vectors ko database mein rakhna | Qdrant Cloud (free tier) | Lesson 2 |
| 4. Retrieve | Sawal se milte-julte chunks nikalna | Agent tool-call + relevance filter | Lesson 4 |
| 5. Generate | Context ke sath jawab likhna | `gpt-4o-mini` + citations | Lesson 5 |

> ⚠️ **Ek line yaad rakho:** har RAG system — chahe chhota ho ya bank ka — inhi paanch steps per khara hai. Naam yaad rakh lein: ingest, embed, store, retrieve, generate.

---

## 5. RAG vs Fine-Tuning vs Long Context

Client ke paas jaoge to yeh sawal zaroor aayega: *"AI ko hamara data sikhana hai — kaise?"* Teen raste hain:

### Analogy: Giving an Employee Company Data 🏢

| Approach | Analogy | Haqeeqat |
|----------|---------|----------|
| **Fine-tuning** | Employee ko 6-mahine ki **training** per bhejna — uska *andaz* badal jata hai, uski *maloomat* nahi | Model ko examples de kar uska behavior dhalna — mehenga aur slow, aur har data-update per dobara |
| **Long context** | Har sawal per employee ko **poori almari ki files parhwana** | Har request mein poora data prompt mein bhejna — token cost har dafa, needle-in-haystack problem |
| **RAG** | Employee ko **files ki almari + index** de dena — zaroorat ke waqt sahi file nikalta hai | Data alag rehta hai, sirf relevant hissa har sawal per uthta hai |

### Decision Framework

| Situation | Best Choice | Why |
|-----------|------------|-----|
| Company knowledge Q&A (docs, policies, FAQs) | **RAG** | Data roz badalta hai; sources cite karne hain; sasta |
| AI ka *style/format* badalna (e.g. hamesha legal tone) | Fine-tuning | Behavior sikhana hai, facts nahi |
| Ek hi chhota document, one-time analysis | Long context | Infrastructure ki zaroorat hi nahi |
| Data har hafte update hota hai | **RAG** | Sirf naye chunks re-embed karo — model ko haath nahi lagana |
| Answers ka source/citation dikhana zaroori hai | **RAG** | Retrieval batata hai jawab kahan se aaya |

> ⚠️ **Fine-tuning ke khilaf asal daleel cost nahi hai.** Client kahega *"budget hai, kar do"* — aur agar aapki poori daleel "mehenga hai" thi, to aap ke paas jawab nahi bachega.
>
> Asal daleel yeh hai: **fine-tuning patterns sikhati hai, facts nahi.** Aap ke documents examples ki shakal mein model ke weights mein ghul jate hain — aur phir woh na bharose ke qabil rehte hain (model phir bhi ghalat number bol sakta hai), na unka **hawala** diya ja sakta hai. Client refund policy poochay to aap yeh nahi keh sakte ke "yeh jawab kis document ke kis safhe se aaya".
>
> 🗣️ English: Fine-tuning teaches behaviour, not facts. Facts baked into weights can't be cited and can't be trusted — and citation is the product in business RAG.

> 💡 **Automation developer ka rule of thumb:** Business knowledge ke liye pehla jawab hamesha RAG hai. Fine-tuning tab jab *style* ka masla ho, *facts* ka nahi. Dono ek sath bhi ho sakte hain — lekin woh advanced case hai.

---

## 6. Business Use Cases — Where RAG Makes Money

Automation developer ke liye RAG ke 4 sab se bikne wale use cases:

| Use Case | Example | Client Kyun Paisa Dega |
|----------|---------|------------------------|
| **Customer support bot** | Delivery service ka bot jo policies/FAQs se jawab de | Support staff ka time bachta hai, 24/7 jawab |
| **Internal knowledge assistant** | HR policies, SOPs, training docs ka Q&A | Naye employees ka onboarding tez, "yeh kahan likha hai?" khatam |
| **Docs/education assistant** | Yehi book ka tutor — course content ka Q&A | Students ka self-service, engagement barhta hai |
| **Sales/product Q&A** | Product catalog + specs per bot | Website visitor ko foran jawab = zyada conversions |

Real example: *"When a customer asks about the refund policy, the bot retrieves the exact policy section and answers with a citation."*

> 🗣️ Roman Urdu: Customer refund policy pooche → bot policy ka exact hissa nikale → hawale ke sath jawab de.

---

## 7. Live Example — The Tutor on This Page

Theory bohat hui — ab khud dekho. **Is page ke corner mein chat button hai** (💬). Yeh wohi RAG system hai jo aapne abhi Section 4 mein parha:

**🧑 Try this (2 minutes):**

1. Chat kholo aur poocho: **"What is the difference between Save and Publish in n8n?"** → dekho jawab ke neeche **Sources** aati hain (retrieval ka saboot — Step 4)
2. Ab poocho: **"Hi"** → koi sources nahi aayengi. Kyun? Kyunke greeting ke liye retrieval ki zaroorat nahi thi — system ne khud faisla kiya (yeh "agentic RAG" hai — Lesson 4 ka topic)
3. Roman Urdu mein poocho — jawab Roman Urdu mein aayega (language mirroring — Lesson 5)

> 💡 Poori series mein hum isi system ko kholte jayenge — jo cheez aap use kar rahe ho, wohi banana seekhoge.

---

## 8. Real-World Scenario

**Scenario:** Lahore ki ek travel agency hai — 200+ visa/package documents, roz dozens WhatsApp inquiries: *"Turkey ke package mein kya included hai?", "Visa processing kitne din?"* Do employees sara din yehi jawab dete hain.

**RAG solution:** Documents → chunks → embeddings → vector database. WhatsApp bot har sawal per relevant document-section retrieve karke jawab deta hai, source ke sath.

**Result:** Repetitive sawalon ka bara hissa bot handle karta hai; staff sirf bookings aur complex cases dekhta hai. Aur jab package rates change hon? Sirf updated document re-embed karo — **model ko chhuna bhi nahi para.**

> 🗣️ English: A travel agency with 200+ package documents answers the same questions all day. RAG retrieves the right section per question and cites it. When rates change, only the document is re-embedded — the model is never retrained. That is the real business case: the data keeps changing, and the system keeps working.

---

## 9. Common Beginner Mistakes

| Mistake | Sahi Approach |
|---------|---------------|
| "ChatGPT ko apni files upload kar dein, ho gaya RAG" | Woh ek session ka hal hai — production RAG apna pipeline hota hai (chunks, vectors, retrieval) jo aapke control mein ho |
| Har problem per "fine-tuning kar lete hain" | Facts/knowledge ke liye RAG; fine-tuning sirf style/behavior ke liye — mehenga aur har update per repeat |
| Structured data (counts, totals, records) ke liye RAG lagana — *"pichle mahine kitne orders?"* | Woh database ka sawal hai, RAG ka nahi. Vector search "milta-julta matlab" dhoondta hai — **ginti nahi kar sakta.** Agent ko CRM/database se **tool** ke zariye jorein. RAG unstructured text ke liye hai: policies, FAQs, manuals, contracts |
| Poora document ek chunk bana dena | Retrieval kharab hogi — chunking strategy matter karti hai (Lesson 3) |
| Sochna ke RAG hallucination 100% khatam kar deta hai | Kam karta hai, khatam nahi — grounding rules + citations chahiye (Lesson 5) |
| **Yeh maan lena ke client ka data likha hua mojood hai** | Asal projects ki pehli rukavat yehi hai: policy malik ke dimagh mein hai, rates WhatsApp ki chat mein bikhre hain, SOP kabhi likhi hi nahi gayi. **RAG sirf us cheez ko parh sakta hai jo likhi hui ho.** Pehla kaam aksar automation nahi hota — content ikattha karwana hota hai. Yeh scope aur price dono mein shamil karein |
| Sirf demo bana kar client ko production bol dena | Production = cost control, rate limiting, security (Lesson 6), aur deployment (Lesson 7) |

---

## 10. Best Practices & Industry Tips

1. **Start every client conversation with the decision framework** (Section 5) — recommending RAG vs fine-tuning correctly is what separates professionals from tutorial-followers.
2. **Always show citations in business RAG** — trust is the product; an answer without a source is just a confident guess with extra steps.
3. **Design for data change from day one** — the whole point of RAG is that content updates without retraining; keep your ingestion script re-runnable.
4. **Keep a "not in the data" behavior** — a good RAG bot says "this isn't covered in our documents" instead of guessing.
5. **Sell outcomes, not architecture** — clients buy "fewer support hours" and "faster onboarding," not "vector databases."

---

## 11. Assignment

Think of 3 businesses around you (or ones you'd like to work with) and map a RAG use case for each:

| # | Business | What data exists? (docs/FAQs/policies) | Who asks questions? | What will RAG solve? |
|---|----------|----------------------------------------|---------------------|----------------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

**Filled example:**

| # | Business | What data exists? | Who asks questions? | What will RAG solve? |
|---|----------|-------------------|---------------------|----------------------|
| 1 | Travel agency (Lahore) | 200+ visa/package documents | WhatsApp customers | Bot handles most repetitive inquiries — staff focuses on bookings only |

Share your table in the comments — I'll feature the best use case in the next video. 👇

---

## 12. Quick Quiz

**Q1.** Ek client ka product catalog har hafte update hota hai aur bot ko latest prices batane hain. Best approach?

- A) Fine-tuning — har hafte model retrain karo
- B) RAG — updated catalog re-embed karo
- C) Long context — har sawal per poora catalog bhejo
- D) LLM as-is — usse prices yaad hain

**Q2.** Aapka bot ek sawal ka jawab poore confidence se deta hai, lekin woh maloomat aapke documents mein hai hi nahi. Yeh kya hai?

- A) Retrieval failure
- B) Hallucination
- C) Embedding error
- D) Rate limiting

**Q3.** RAG architecture mein "Retrieve" step exactly kya karta hai?

- A) Model ko dobara train karta hai
- B) User ke sawal ka vector bana kar database se sab se milte-julte chunks nikalta hai
- C) Poora database LLM ko bhej deta hai
- D) Jawab ko translate karta hai

**Q4.** Client chahta hai ke AI hamesha formal legal language mein jawab de — facts to theek hain, sirf *style* ka masla hai. Best tool?

- A) RAG
- B) Fine-tuning
- C) Bara vector database
- D) Prompt mein "be formal" likhna kabhi kaam nahi karta

**Q5.** Business RAG mein citations (sources) kyun zaroori hain?

- A) Woh response ko lamba banati hain
- B) SEO ke liye
- C) Trust — user verify kar sakta hai jawab kahan se aaya
- D) Unke baghair LLM chalta hi nahi

<details>
<summary><b>Answers (click to reveal)</b></summary>

**Q1: B** — Weekly data changes are the classic RAG case: just re-embed the updated catalog. Retraining every week is expensive overkill, and sending the full catalog on every question burns tokens.

**Q2: B** — Hallucination: the model didn't have the fact, so it invented one. (A is wrong because the information was never in the data — retrieval couldn't have found it.)

**Q3: B** — Retrieve = embed the user's question → similarity search in the vector database → return the top matching chunks.

**Q4: B** — Teaching style/behavior is what fine-tuning is for. (Note: trying a good prompt first is the cheaper fix — but among these options, fine-tuning is best.)

**Q5: C** — Citations build trust: the user (and the client) can verify the answer came from their own documents, not a guess.

</details>

---

## 13. Summary & Key Takeaways

1. **LLMs alone fail on business data** — stale knowledge, hallucination, and no access to your own documents.
2. **RAG = retrieve first, then generate** — the AI answers from YOUR data with citations, the way a doctor reads your file before prescribing.
3. **Five steps power every RAG system:** ingest → embed → store → retrieve → generate.
4. **RAG beats fine-tuning for facts/knowledge** — data changes without retraining; fine-tuning is for style/behavior.
5. **RAG sells** — support bots, internal knowledge, docs assistants, and product Q&A are real revenue use cases for automation developers.

---

## 14. Interview Points

**Q: What is RAG in one sentence?**
A: Retrieval-Augmented Generation — the system first retrieves relevant chunks from a knowledge base, then the LLM generates an answer grounded in those chunks.

**Q: Why not just fine-tune the model on company data?**
A: Fine-tuning teaches behaviour, not facts — knowledge baked into weights is unreliable and can't be cited. It also has to be repeated on every data change. RAG keeps the data outside the model, updates by re-embedding, and cites its sources.

**Q: What is the first thing that blocks a RAG project in practice?**
A: Missing written content. RAG can only read what exists as text — if the client's policies live in someone's head or in chat threads, the first phase of the project is content collection, not engineering.

**Q: What are the main stages of a RAG pipeline?**
A: Ingestion (chunking), embedding, vector storage, retrieval (similarity search), and generation (LLM answer with context).

**Q: Does RAG eliminate hallucinations?**
A: No — it reduces them by grounding answers in retrieved context; you still need grounding instructions, relevance thresholds, and "not in the data" behavior.

**Q: When is long context better than RAG?**
A: For one-off analysis of a single document that fits in the context window — no infrastructure needed; RAG wins when data is large, changing, or needs citations.

**Q: What does "grounded" mean in RAG?**
A: The answer is based only on the retrieved context, not the model's internal (possibly hallucinated) knowledge.

---

## 15. Sources

| Claim used in this lesson | Source | Published | Checked |
|---|---|---|---|
| RAG as a named technique — retrieval + generation combined | Lewis et al., *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* — [arxiv.org/abs/2005.11401](https://arxiv.org/abs/2005.11401) (NeurIPS 33, pp. 9459–9474) | 2020 | 30 Jul 2026 |
| Embeddings turn text into vectors for similarity search | OpenAI — Embeddings guide: [platform.openai.com/docs/guides/embeddings](https://platform.openai.com/docs/guides/embeddings) | — | 30 Jul 2026 |
| Vector database stores embeddings and returns nearest matches | Qdrant — Documentation overview: [qdrant.tech/documentation/overview](https://qdrant.tech/documentation/overview/) | — | 30 Jul 2026 |
| Retrieval exposed to a model as a callable tool | OpenAI Agents SDK — tools: [openai.github.io/openai-agents-python](https://openai.github.io/openai-agents-python/) | — | 30 Jul 2026 |
| Our tutor's stack: `text-embedding-3-small` at 1536 dimensions, heading-based chunking with page/section/URL metadata | Verified directly in this book's source: `backend/src/services/embedding_service.py` and `backend/scripts/embed_content.py` — [github.com/Shahzain-Ali/agentive-solutions-book](https://github.com/Shahzain-Ali/agentive-solutions-book) | — | 30 Jul 2026 |
| Chunk count in our tutor | Runtime value — **not verifiable from source.** Re-run `embed_content.py` and read the printed total before quoting a number on camera | — | pending |

> **Model names change.** `text-embedding-3-small` and `gpt-4o-mini` are what our tutor runs as of **July 2026**. Re-check OpenAI's model list before quoting these in a later lesson.

---

**Next Lesson →** Lesson 02 — Embeddings & Vector Databases *(coming soon)*

**Agentive Solutions** · [YouTube](https://www.youtube.com/@SolutionsWithShahzain) · [GitHub](https://github.com/Shahzain-Ali) · [LinkedIn](https://linkedin.com/in/shahzain-ali1) · [Instagram](https://instagram.com/shahzainalibangash1) · [Facebook](https://facebook.com/shahzainalibangash1)

---

## Resources

- 📊 **Slides (PDF):** <a href="/agentive-solutions-book/resources/rag-for-automation/lesson-01/slides.pdf" target="_blank" rel="noopener noreferrer">slides.pdf</a>
- ▶️ **Video:** Coming soon
