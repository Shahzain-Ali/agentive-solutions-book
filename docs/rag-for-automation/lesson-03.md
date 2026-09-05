---
id: lesson-03
sidebar_position: 3
sidebar_label: "Lesson 03 — Vector Databases & Qdrant Hands-On"
description: "RAG for Automation Lesson 03 — what a vector database actually does, and a hands-on Qdrant Cloud build: free cluster, collection, distance metric, embed, search, and the real cost"
---

# Lesson 03 — Vector Databases & Qdrant Hands-On

**Book:** RAG for Automation (Agentive Solutions) · **Lesson:** 3
**Type:** Implementation guide
**Prerequisites:** Lesson 01 (5-step architecture) · Lesson 02 (embeddings aur cosine similarity)
**Facts verified:** 5 September 2026 — har claim ka source aur check date §12 ki table mein

---

:::info 🎥 Video Lesson
Video coming soon — the YouTube embed will appear here once this lesson is published on the SolutionsWithShahzain channel.
:::

## 🖥️ Slides — Teaching Aid

<iframe
  src="/agentive-solutions-book/resources/rag-for-automation/lesson-03/slides.pdf"
  width="100%"
  height="480"
  title="Lesson 03 — Slides"
  style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}
></iframe>

<p>
  <a href="/agentive-solutions-book/resources/rag-for-automation/lesson-03/slides.pdf" target="_blank" rel="noopener noreferrer">🖥️ Fullscreen</a> · <a href="/agentive-solutions-book/resources/rag-for-automation/lesson-03/slides.pptx">⬇️ Download (PowerPoint)</a>
</p>

---

:::note 📍 Yahan chunking kyun nahi hai
Is lesson mein hum **chhote texts** embed kar rahe hain — ek ek line ke FAQ answers. Itne chhote text ko divide karne ki zarurat nahi hoti, isliye yahan chunking ka sawal hi nahi uthta.

Asli business documents bare hote hain — unhe pehle divide karna parta hai, aur **woh poora topic Lesson 04 ka hai.** Is lesson ka kaam sirf do hain: vectors ko **store** karna aur unmein **search** karna.
:::

## Table of Contents

1. [What You'll Learn in This Lesson](#1-what-youll-learn-in-this-lesson)
2. [Before You Start](#2-before-you-start)
3. [What a Vector Database Actually Does](#3-what-a-vector-database-actually-does)
4. [The Four Words — Cluster, Collection, Size, Distance Metric](#4-the-four-words--cluster-collection-size-distance-metric)
5. [Step-by-Step — Build It](#5-step-by-step--build-it)
6. [Verification Checklist](#6-verification-checklist)
7. [Troubleshooting](#7-troubleshooting)
8. [Alternatives — pgvector, Pinecone, Chroma](#8-alternatives--pgvector-pinecone-chroma)
9. [Best Practices & Industry Tips](#9-best-practices--industry-tips)
10. [Summary & Key Takeaways](#10-summary--key-takeaways)
11. [Interview Points](#11-interview-points)
12. [Sources](#12-sources)

---

## 1. What You'll Learn in This Lesson

By the end of this lesson you will be able to:

- [ ] Explain what a vector database does that a normal database cannot
- [ ] Name the four things you configure — cluster, collection, size, distance metric — and say what each one controls
- [ ] Create a free Qdrant Cloud cluster, and choose a cloud provider and region deliberately
- [ ] Store credentials in a `.env` file and load them in Python — instead of retyping them every session
- [ ] Create a collection with the correct vector size and distance metric, and find it in the dashboard
- [ ] Embed your own texts, store them as points, and run a semantic search that returns ranked results
- [ ] Calculate how many vectors fit in a given amount of storage, using Qdrant's official formula
- [ ] Calculate the real embedding cost of a document set — and measure the token count instead of estimating it
- [ ] Explain what Matryoshka embeddings are, and decide whether your project needs a shorter vector

---

## 2. Before You Start

Yeh cheezein aap ke paas pehle se honi chahiyen. **Yeh guide inhe banati nahi hai:**

| Cheez | Kaise milti hai | Kharcha |
|---|---|---|
| **OpenAI API key** | [platform.openai.com](https://platform.openai.com) → API keys | Paid — lekin is lesson ka poora demo **1 cent se bhi kam** ka hai (§5, Step 7) |
| **Python 3.9+** | [python.org](https://www.python.org/downloads/) | Free |
| **Ek email address** | Qdrant Cloud signup ke liye | Free — **credit card ki zarurat nahi** *(Official)* |

**Lesson 02 ka concept jo yahan chal raha hai:** embedding ek text ko numbers ki list bana deti hai, aur do texts ka matlab **cosine similarity** se compare hota hai. Agar yeh yaad nahi to pehle Lesson 02 dekh lein — is lesson ka har step usi per khara hai.

**🧑 Ek naya khali folder banayein** (`rag-lesson-03/`), kisi purane project ke andar nahi. Isse aap ka environment bilkul wohi rahega jo is lesson mein dikhaya gaya hai, aur koi purani setting beech mein nahi aayegi.

---

## 3. What a Vector Database Actually Does

### Definition (English — quotable)

> **A vector database stores embeddings and finds the ones closest in meaning to a query — ranked by similarity, not by exact match.**

### Normal database aur vector database ka farq

Normal database **exact match** dhoondta hai. Vector database **closest match** dhoondta hai. Poora farq bas itna hai — lekin result bilkul badal jata hai.

Farz karein aap ke database mein yeh line mojood hai:

```
"Refunds are processed within 7 working days of approval."
```

Ab ek customer likhta hai: **"I want my money back"**

| Database ka type | Kya hota hai | Result |
|---|---|---|
| **Normal database** (SQL) | Word by word match karta hai. `refund` in `"I want my money back"` → nahi mila | ❌ Kuch nahi milta |
| **Vector database** | Dono ka **matlab** compare karta hai | ✅ Refund policy top per aati hai |

Dono jumlon mein **ek bhi word common nahi hai.** Phir bhi vector database ise dhoond leta hai, kyunke woh words match nahi kar raha — woh Lesson 02 wali cosine similarity run kar raha hai.

### Analogy: Medical Store 💊

Aap medical store per jate hain.

- **Parchi le kar jayein** — "Panadol chahiye" — dukaandaar bilkul wohi de dega. **Yeh normal database hai.** Naam exactly chahiye.
- **Sirf problem batayein** — "sar dard ki dawa de dein" — dukaandaar phir bhi Panadol de dega. Usne naam nahi suna tha, **matlab samjha tha.** **Yeh vector database hai.**

Aur dhyan dein: woh sirf ek dawa nahi deta. Woh kehta hai *"yeh sab se pehle try karein, warna yeh doosri hai."* Vector database bhi bilkul yehi karta hai — ek **ranked list** deta hai, sab se closest sab se upar.

### Yeh RAG pipeline mein kahan hai

Lesson 01 wala 5-step architecture yaad karein. Yeh lesson uske **beech ke do steps** build kar raha hai:

```
ingest → embed → [ STORE ] → [ RETRIEVE ] → generate
                     ▲             ▲
                     │             │
              yeh lesson       yeh lesson
```

---

## 4. The Four Words — Cluster, Collection, Size, Distance Metric

Yeh chaar words shuru mein confuse karte hain, kyunke documentation mein saath saath aate hain. Asal mein yeh ek doosre ke **andar** hain — ek hi cheez ke chaar levels.

### Analogy: Office ki Filing 🗄️

| Qdrant ka word | Office mein | Kya control karta hai |
|---|---|---|
| **Cluster** | Poora **office** | Aap ka apna server — jahan sab kuch rakha hai |
| **Collection** | Ek **filing cabinet** | Ek project ka data. Alag project = alag cabinet |
| **size** | **Form ke fields** | Har record exactly 1,536 fields wale form per. Doosre form wala record cabinet reject kar dega |
| **distance metric** | **"Milti-julti file" ka rule** | "Closest" ka matlab kya hai — kis tarah measure hoga |

### Diagram

```
Qdrant Cloud
│
└── Cluster ─────────────────── aap ka server (free tier: 1 GB RAM, 4 GB disk)
      │
      ├── Collection: book_content
      │     ├── size: 1536 ─────────── har vector mein exactly 1,536 numbers
      │     ├── distance: Cosine ───── "closest" kaise measure hoga
      │     │
      │     └── Points ────────────── 1 point = vector + original text
      │           ├── id: 1 · vector: [0.021, -0.045, ...] · payload: {"text": "Refunds are..."}
      │           ├── id: 2 · vector: [0.113,  0.008, ...] · payload: {"text": "Orders above..."}
      │           └── ...
      │
      └── Collection: support_faqs ─── doosra project, alag cabinet
```

### Terms Table

| Term | Matlab |
|---|---|
| **Cluster** | Aap ka Qdrant server. Ek dafa banta hai, poore account ke liye |
| **Collection** | Vectors ka group. Har project ke liye alag banayein |
| **size** | Har vector mein kitne numbers honge. `text-embedding-3-small` = **1536** |
| **distance metric** | Similarity measure karne ka rule — `Cosine`, `Dot`, `Euclid`, ya `Manhattan` *(Official)* |
| **Point** | Ek record = `id` + `vector` + `payload` |
| **payload** | Vector ke saath rakha gaya original data (text, URL, section name) |

**Payload optional nahi hai.** Vector sirf numbers hain — un se wapas text nahi banta. Agar aap ne payload mein original text nahi rakha, to search ke baad aap ke paas sirf **numbers aur scores** honge, jawab nahi. Citations bhi isi se bante hain.

### Sequence — yeh order fix hai

```
1. Cluster banayein        → ek dafa, poore account ke liye
2. Collection banayein     → har project ke liye ek
3. size chunein            → aap decide nahi karte — embedding model deta hai
4. distance chunein        → model recommend karta hai (OpenAI → Cosine)
5. Points daalein          → vector + original text
6. Search karein           → query bhi embed hoti hai, phir compare
```

:::danger Sab se important rule
`size` aur `distance` **collection banate waqt hi** fix ho jate hain — **baad mein change nahi hote** *(Official — Qdrant docs)*.

Galat chuna, to poora collection **delete** karke dobara banana parega, aur saara data dobara embed karna parega. Isliye step 3 aur 4 **sochne wale** steps hain, type karne wale nahi.
:::

### size aap kyun nahi chunte

`size` embedding model se aati hai, aap ki marzi se nahi:

| Model | Vector size |
|---|---|
| `text-embedding-3-small` | **1536** |
| `text-embedding-3-large` | **3072** |

Model 1,536 numbers deta hai, to collection bhi 1,536 ka hona chahiye. 1,537 ya 1,535 nahi chalega — Qdrant seedha error de dega.

### distance metric kaunsa chunein

Qdrant chaar options deta hai *(Official)*, lekin faisla aasan hai:

| Metric | Kab use hota hai |
|---|---|
| **Cosine** ⭐ | OpenAI embeddings ke saath — **yahi chunein** |
| Dot | Jab vectors already normalized hon (OpenAI ke saath yeh Cosine ke barabar hi hai) |
| Euclid | Coordinates jaisa data, jahan asal distance matter karta hai |
| Manhattan | Grid-type data |

**Wajah:** Lesson 02 mein humne dekha tha ke OpenAI khud cosine similarity recommend karta hai *(Official)*. Aur ek achhi baat — **Qdrant `Cosine` collections mein vectors khud normalize kar deta hai** *(Official)*, isliye aap ko manually kuch karne ki zarurat nahi.

---

## 5. Step-by-Step — Build It

Ab hum yeh build karenge: ek free cluster → ek collection → 6 texts embed karke store → ek semantic search → aur aakhir mein asal cost.

Har step teen sawalon ka jawab deta hai: **kyun kar rahe hain → kaise karna hai → theek hua ya nahi.**

### Step 1 — 🧑 Free Qdrant Cloud cluster banayein

**Kyun:** vectors ko kahin rehna hai. Cluster woh server hai jahan aap ka saara data rakha jayega. Yeh **ek dafa** ka kaam hai — aage ke saare projects isi cluster ke andar alag collections ban jayenge.

**Kaise:**

1. [cloud.qdrant.io](https://cloud.qdrant.io) per jayein
2. Email ya Google se sign up karein
3. **Create Cluster** per click karein
4. **Free** tier chunein
5. **Cloud provider** aur **region** chunein — neeche samjhaya gaya hai
6. Cluster ka naam dein, phir **Create**

**Cluster ka naam** aap ki apni pehchan ke liye hai, koi technical rule nahi. Aisa naam dein jo 6 mahine baad bhi samajh aaye:

```
agentive-rag-book          ← achha: project ka naam saaf hai
lesson-03-demo             ← achha: maqsad saaf hai
cluster-1  /  test  /  abc ← bura: 3 clusters ke baad yaad nahi rahega
```

#### Cloud provider aur region ka matlab kya hai

Yeh dono milkar tay karte hain ke aap ka server **physically kahan chalega.**

| Field | Matlab | Analogy |
|---|---|---|
| **Cloud provider** | Server kis company ka hai — AWS, GCP, ya Azure | Kis company ki **building** hai? 🏢 |
| **Region** | Woh server **geographically kahan** hai — Frankfurt, Singapore, Mumbai | Building **kis sheher** mein hai? 📍 |

**Faisla ka usool:** apne users ke **sab se qareeb** wala region chunein. Har request ko physically us server tak jana aur wapas aana hota hai — jitna faasla zyada, latency utni zyada.

**Pakistan se kaam karne walon ke liye:**

| Preference | Region | Wajah |
|---|---|---|
| **1st** | Asia — Singapore ya Mumbai | Geographically sab se qareeb |
| **2nd** | Europe — Frankfurt (Germany) | Asia available na ho to yeh North/South America se behtar hai |
| **Aakhri** | North / South America | Sab se zyada faasla, sab se zyada latency |

**Free tier per har provider ke saare regions available nahi hote** — list mein jo mojood ho, usi mein se upar wali priority order follow karein. Aur yaad rahe: yeh sirf **latency** ka faisla hai, kaam sab jagah se chalega.

#### Free tier mein kya milta hai

| Resource | Free tier |
|---|---|
| Node | 1 (no high availability) |
| CPU | 0.5 vCPU |
| RAM | 1 GB |
| Disk | 4 GB |
| Capacity | ~1 million vectors at 768 dimensions |
| Credit card | Not required |

*(Sab **Official** — Qdrant Cloud docs, checked 5 Sep 2026.)*

> ⚠️ **GB ya GiB?** Qdrant ki official documentation aur pricing page dono **"4 GB"** likhte hain. Cluster banane wale dashboard per kuch users ko **"4 GiB"** dikhta hai. Yeh do alag units hain — GB decimal hai (10⁹), GiB binary (2³⁰), aur **4 GiB ≈ 4.29 GB**. Farq chhota hai aur kisi faisle ko nahi badalta, lekin hum wohi likh rahe hain jo **official docs** kehti hain. Aap ke dashboard per GiB dikhe to woh thora zyada space hai, kam nahi.

:::danger Free cluster suspend aur delete ho jata hai
**1 week** tak koi activity na ho to cluster **suspend** ho jata hai, aur **4 weeks** baad **delete** *(Official)*.

Yeh sab se aam wajah hai jis se log samajhte hain "mera code toot gaya" — halanke code theek hota hai, cluster hi gayab ho chuka hota hai. Course beech mein chhor kar wapas aayein to pehle cluster ka status check karein.
:::

#### Kitne vectors aayenge? — official formula se

Qdrant capacity ka formula khud deta hai *(Official)*:

```
dense_size = number_of_points × replication_factor × dimensions × bytes_per_dim
```

Free tier single node hai, to `replication_factor = 1`. Default datatype `float32` hai, yani **har number 4 bytes** *(Official)*.

To har vector ka size sirf itna hai:

```
bytes per vector = dimensions × 4
```

| Dimensions | Har vector ka size | ~3 GB mein kitne vectors |
|---|---|---|
| **256** (Matryoshka) | 1,024 B ≈ 1 KB | ~3,000,000 |
| **768** | 3,072 B ≈ 3 KB | **~1,000,000** ← Qdrant ka apna quoted number |
| **1,536** (`3-small`) | 6,144 B ≈ 6 KB | **~500,000** |
| **3,072** (`3-large`) | 12,288 B ≈ 12 KB | ~250,000 |

**Yahan asal sabaq yeh hai:** dimensions **double** karein to vectors **aadhe** ho jate hain. Rishta bilkul seedha hai — size sirf `dimensions × 4` hai, koi aur cheez beech mein nahi.

Isi liye Qdrant ka "~1 million vectors" wala figure **768 dimensions** ke saath likha jata hai. Hamara `text-embedding-3-small` **1,536** dimensions ka hai — yani theek **aadhe**, lagbhag **500,000 vectors**.

*(768 per 1M vectors ≈ 3.07 GB, jo 4 GB disk ke andar aa jata hai. Table ka hisaab hamara apna hai, upar wale official formula se — Qdrant sirf 768 wala figure quote karta hai.)*

**Aap ke liye iska matlab?** Hamari poori book lagbhag 500 chunks ki hai. Free tier per aap **hazaar guna** zyada rakh sakte hain. Yeh limit aap ka masla nahi banegi.

### Step 2 — 🧑 API key banayein

**Kyun:** cluster ki URL public hai. API key woh cheez hai jo sirf aap ko andar aane deti hai — uske baghair connection reject ho jayega.

**Kaise:**

1. Cluster ke page per **API Keys** section kholein
2. **Create API Key** per click karein
3. Key copy karein

:::danger 🔐 Key sirf ek dafa dikhti hai
Qdrant yeh key dobara nahi dikhata. Abhi copy karke mehfooz jagah rakhein — warna nayi key banani paregi.

Aur key ko **kabhi** code mein direct na likhein, na screenshot mein aane dein. Agla step isi ka hal hai.
:::

### Step 3 — 📋 Install karein, credentials rakhein, aur connect karein

**Kyun:** teen keys ko har baar type karna practical nahi, aur unhe code mein likhna khatarnaak hai. `.env` file dono masle hal karti hai — keys ek jagah rehti hain, code se bahar, aur git se bahar.

**Install:**

```bash
pip install qdrant-client openai python-dotenv
```

#### Terminal variables vs `.env` file — farq samajh lein

Do tareeqe hain, aur yeh **ek jaise nahi** hain:

**Tareeqa 1 — terminal variables (sirf abhi ke liye):**

```bash
# macOS / Linux
export OPENAI_API_KEY="sk-..."
export QDRANT_URL="https://xxxx.aws.cloud.qdrant.io:6333"
export QDRANT_API_KEY="..."
```

```powershell
# Windows PowerShell
$env:OPENAI_API_KEY="sk-..."
$env:QDRANT_URL="https://xxxx.aws.cloud.qdrant.io:6333"
$env:QDRANT_API_KEY="..."
```

⚠️ **Yeh sirf usi terminal window ke liye hain jo abhi khuli hai.** Terminal band kiya, ya naya terminal khola, ya computer restart kiya — **sab khatam.** Dobara set karni parengi. Editor ke andar naya terminal bhi ek alag terminal hota hai.

**Tareeqa 2 — `.env` file (recommended):**

Project folder mein `.env` naam ki file banayein:

```bash
OPENAI_API_KEY=sk-...
QDRANT_URL=https://xxxx.aws.cloud.qdrant.io:6333
QDRANT_API_KEY=...
```

Ab yeh values **file mein mehfooz** hain. Terminal band karein, computer restart karein — file wahin rahegi, aur har script khud parh legi.

| | Terminal variable | `.env` file |
|---|---|---|
| Kitni der chalti hai | Sirf **current terminal session** | **Hamesha** — file mein likhi hai |
| Naya terminal khola | ❌ Dobara set karni paregi | ✅ Khud kaam karegi |
| Computer restart | ❌ Khatam | ✅ Mojood |
| Team ke saath share | Mushkil | `.env.example` file se aasan |
| Git mein jane ka risk | Nahi | **Haan — `.gitignore` lazmi hai** |

:::danger `.env` ko `.gitignore` mein daalna lazmi hai
Ek line jo har project mein pehle din likhni chahiye:

```bash
echo ".env" >> .gitignore
```

Agar `.env` galti se commit ho gayi aur repo public hai, to aap ki keys public ho chuki hain. Key **delete karke nayi** banani paregi — file hata dene se woh git history se nahi jati.
:::

#### Connection test karein

`connect.py` naam ki file banayein:

```python
import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient

# .env file parh kar uski values environment mein daal deta hai
load_dotenv()

qdrant = QdrantClient(
    url=os.environ["QDRANT_URL"].strip(),
    api_key=os.environ["QDRANT_API_KEY"].strip(),
    timeout=30,
)

print(qdrant.get_collections())
```

```bash
python connect.py
```

**Expected result:**
```
collections=[]
```

Khali list ka matlab hai **connection kaam kar raha hai** — bas abhi koi collection banayi nahi. Yeh success hai, error nahi.

> 💡 **`.strip()` yahan kyun hai:** jab aap key copy-paste karte hain, aksar aakhir mein ek invisible space ya newline saath aa jata hai. Woh request ko fail kar deta hai, aur error message bilkul nahi batata ke masla kya hai. Yeh hamare apne production code mein bhi mojood hai (`backend/scripts/setup_qdrant.py`) — kyunke development ke waqt yehi masla asal mein pesh aaya tha.

### Step 4 — 📋 Collection banayein

**Kyun:** vectors ko ek container chahiye, aur usi container per do faisle hamesha ke liye fix ho jate hain — `size` aur `distance`. Yeh step short hai lekin isi mein woh dono faisle likhe jate hain.

`setup.py` banayein:

```python
import os
from dotenv import load_dotenv
from qdrant_client import QdrantClient, models

load_dotenv()

COLLECTION = "lesson03_demo"
VECTOR_SIZE = 1536                       # text-embedding-3-small ka size
DISTANCE = models.Distance.COSINE        # OpenAI embeddings ke liye

qdrant = QdrantClient(
    url=os.environ["QDRANT_URL"].strip(),
    api_key=os.environ["QDRANT_API_KEY"].strip(),
    timeout=30,
)

existing = [c.name for c in qdrant.get_collections().collections]

if COLLECTION in existing:
    print(f"Collection '{COLLECTION}' already exists.")
else:
    qdrant.create_collection(
        collection_name=COLLECTION,
        vectors_config=models.VectorParams(size=VECTOR_SIZE, distance=DISTANCE),
    )
    print(f"Created '{COLLECTION}' — size={VECTOR_SIZE}, distance={DISTANCE}")
```

```bash
python setup.py
```

**Expected result:**
```
Created 'lesson03_demo' — size=1536, distance=Distance.COSINE
```

> ⚠️ **Pehle check, phir create.** Ghor karein ke script pehle `get_collections()` se check karti hai. Agar aap seedha `create_collection` chala dein aur collection already mojood ho, to Qdrant error deta hai. Aur **kabhi** aisa code na likhein jo bina poochhe collection delete karke dobara bana de — production mein woh ek command hai jo saara data uda deti hai.

#### Collection dashboard mein kahan milegi

Terminal ne "Created" keh diya — lekin **apni aankh se dekhna** hamesha behtar hai. Qdrant dashboard mein rasta yeh hai:

```
Cluster → Overview → "Access the Cluster" → Manage Collections
       → aap ki collection (lesson03_demo) → Points
```

1. Apne **cluster** per click karein — **Overview** page khulta hai
2. **Access the Cluster** section mein **Manage Collections** per click karein
3. Collections ki list mein **`lesson03_demo`** dikhegi
4. Us per click karein — yahan `size`, `distance` aur `Points count` sab likha hoga
5. **Points** tab woh jagah hai jahan aap ka asal data dikhega — abhi khali hai, Step 5 ke baad bhar jayega

**Abhi kya dikhna chahiye:** collection mojood hai, `size: 1536`, `distance: Cosine`, aur `Points count: 0`.

---

#### 🪆 Aside — Matryoshka: chhota vector kaise banta hai

Abhi aap ne `size = 1536` chuna. Aur Step 1 ki table mein aap ne dekha ke dimensions aadhe karne se vectors dugne aa jate hain. To sawal banta hai: **kya vector chhota kiya ja sakta hai?**

Jawab **haan** hai — aur yeh jaanna zaroori hai ke kaise, aur kab.

**Pehle ek ghalat-fehmi door karein:** model khud faisla nahi karta ke vector kitna bara hoga. **Aap batate hain.** `text-embedding-3-large` by default 3,072 numbers deta hai, lekin aap API call mein `dimensions` parameter de kar chhota maang sakte hain:

```python
client.embeddings.create(
    model="text-embedding-3-large",
    input=text,
    dimensions=256          # 3,072 ki jagah sirf 256
)
```

…aur phir Qdrant collection bhi `size=256` ki banayein. Dono ka match hona lazmi hai.

**Yeh kaam kaise karta hai — Matryoshka**

**Matryoshka** woh Russian nesting doll hai jiske andar chhoti doll, uske andar aur chhoti — aur **har doll apne aap mein poori doll hoti hai.**

OpenAI ne apne naye embedding models ko isi tarah train kiya hai: vector ke **shuru ke numbers sab se zyada matlab rakhte hain.** Isliye aakhir se numbers hata dene per bhi jo bachta hai, woh ab bhi kaam ka rehta hai.

```
3,072  ┌─────────────────────────────────────────────┐  poora vector (3-large)
       │                                             │
1,536  ┌──────────────────────┐                         aadha — ab bhi kaam karta hai
       │                      │
  256  ┌───┐                                            chhota — phir bhi kaam karta hai
       │   │
       └───┘
```

⚠️ **Yeh compression nahi hai, aur na hi average.** Bilkul seedha matlab hai: shuru ke 256 numbers rakh lein, baaqi hata dein.

```
Poora vector (3,072 numbers):
[0.021, -0.045, 0.310, ... , 0.002, -0.019]
 └──── pehle 256 rakhe ────┘   └── yeh 2,816 hata diye ──┘
```

Aam model mein aisa karna tabahi hota — kyunke wahan matlab poore vector mein phaila hota hai. Matryoshka training ne matlab ko **shuru ke numbers mein ikattha** kar diya hai.

Address ki tarah samjhein: *"Pakistan, Karachi, Clifton, Block 5, House 12"* — aakhri hissa hata dein, phir bhi kaafi pata chal jata hai, kyunke sab se aham words **pehle** hain.

**OpenAI ka apna claim** *(Official, verbatim)*:

> *"a `text-embedding-3-large` embedding can be shortened to a size of 256 while still outperforming an unshortened `text-embedding-ada-002` embedding with a size of 1536"*

Yani 256 numbers wala naya model, 1,536 numbers wale purane model se **behtar** hai — 6 guna kam storage mein.

**Do tareeqe hain — aur sirf ek free hai:**

| Tareeqa | Kab | Extra step |
|---|---|---|
| **`dimensions` parameter** ⭐ | Embed karte waqt, API call mein | Koi nahi — OpenAI normalized vector wapis deta hai |
| **Manual truncation** | Vector banne ke **baad** list chhoti karna | **Normalize karna lazmi hai** — OpenAI: *"When you change the dimension manually, you need to be sure to normalize the dimensions of the embedding"* *(Official)* |

**Kab asal mein zarurat parti hai?** Seedha jawab: **shayad kabhi nahi.**

Step 1 ki capacity table dobara dekhein — free tier per bhi `1,536` dimensions ke lagbhag **500,000 vectors** aa jate hain. Hamari poori book **500 chunks** ki hai. Yeh parameter tab kaam ka banta hai jab aap **lakhon** vectors tak pahunch jayein, jahan har mahine ka RAM bill farq dikhata hai.

> **Aap ke liye ek line:** jab tak chunks lakh se neeche hain, `dimensions` ko haath na lagayein — default hi sahi hai. Bas itna jaanna kaafi hai ke yeh cheez exist karti hai aur kis liye hai.

---

### Step 5 — 📋 Texts embed karke store karein

**Kyun:** collection abhi khali hai. Search tabhi kaam karegi jab andar kuch mojood ho. Yahan hum text ko vector banate hain (OpenAI se) aur vector ko Qdrant mein daalte hain — RAG pipeline ke **embed** aur **store** steps, ek script mein.

`load.py` banayein:

```python
import os
from dotenv import load_dotenv
from openai import OpenAI
from qdrant_client import QdrantClient, models

load_dotenv()

COLLECTION = "lesson03_demo"
MODEL = "text-embedding-3-small"

TEXTS = [
    "Refunds are processed within 7 working days of approval.",
    "Orders above Rs. 5,000 qualify for free delivery across Pakistan.",
    "Our support team is available Monday to Saturday, 9 AM to 6 PM.",
    "Every product carries a one-year manufacturer warranty.",
    "You can track your order using the tracking ID sent over SMS.",
    "Exchange is allowed within 14 days if the packaging is unopened.",
]

openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"].strip())
qdrant = QdrantClient(
    url=os.environ["QDRANT_URL"].strip(),
    api_key=os.environ["QDRANT_API_KEY"].strip(),
    timeout=30,
)

# Ek hi API call mein saare texts — 6 alag calls se tez aur sasta
response = openai_client.embeddings.create(model=MODEL, input=TEXTS)
vectors = [item.embedding for item in response.data]

print(f"Embedded {len(vectors)} texts · har vector mein {len(vectors[0])} numbers")

qdrant.upsert(
    collection_name=COLLECTION,
    points=[
        models.PointStruct(id=i, vector=vector, payload={"text": text})
        for i, (vector, text) in enumerate(zip(vectors, TEXTS))
    ],
)

info = qdrant.get_collection(COLLECTION)
print(f"Collection mein ab {info.points_count} points hain")
```

```bash
python load.py
```

**Expected result:**
```
Embedded 6 texts · har vector mein 1536 numbers
Collection mein ab 6 points hain
```

`1536` ka dikhna sab se important confirmation hai — iska matlab model ka output aur collection ka `size` **match kar rahe hain.**

**Dashboard per bhi dekh lein:** Manage Collections → `lesson03_demo` → **Points**. Ab wahan 6 records honge, har ek ke saath uska original text (`payload`).

> 💡 **`upsert` ka matlab:** update + insert. Agar us `id` per point pehle se hai to woh **update** ho jata hai, warna naya **insert** hota hai. Isi wajah se yeh script dobara chalayein to points 12 nahi hote — 6 hi rehte hain. Yeh galti nahi, design hai.

### Step 6 — 📋 Search karein

**Kyun:** yahi poore lesson ka asal maqsad hai. Ab tak humne data rakha hai; ab dekhna hai ke woh **matlab se** milta hai ya nahi. Isliye hum jaan boojh kar aisi query denge jismein **stored text ka ek bhi word nahi** hai.

`search.py` banayein:

```python
import os
from dotenv import load_dotenv
from openai import OpenAI
from qdrant_client import QdrantClient

load_dotenv()

COLLECTION = "lesson03_demo"
MODEL = "text-embedding-3-small"
QUERY = "I want my money back"

openai_client = OpenAI(api_key=os.environ["OPENAI_API_KEY"].strip())
qdrant = QdrantClient(
    url=os.environ["QDRANT_URL"].strip(),
    api_key=os.environ["QDRANT_API_KEY"].strip(),
    timeout=30,
)

# Query ko usi model se embed karna lazmi hai jis se texts embed hue thay
query_vector = openai_client.embeddings.create(
    model=MODEL, input=QUERY
).data[0].embedding

hits = qdrant.query_points(
    collection_name=COLLECTION,
    query=query_vector,
    limit=3,
).points

print(f"Query: {QUERY}\n")
for rank, hit in enumerate(hits, start=1):
    print(f"{rank}. {hit.score:.4f}  {hit.payload['text']}")
```

```bash
python search.py
```

**Expected result** — top result refund wali line honi chahiye:

```
Query: I want my money back

1. 0.####  Refunds are processed within 7 working days of approval.
2. 0.####  Exchange is allowed within 14 days if the packaging is unopened.
3. 0.####  Every product carries a one-year manufacturer warranty.
```

**Ghor karne wali baat:** query aur jawab mein **ek bhi word common nahi hai.** "money" aur "refund" alag words hain — lekin unka **matlab** qareeb hai, aur vector database matlab per kaam karta hai. Yehi poori RAG ki bunyaad hai.

Doosre number per "Exchange" ka aana bhi theek hai — paisa wapas maangne wale customer ke liye exchange bhi ek related option hai. Yeh system ki galti nahi, uski samajh hai.

> ⚠️ **`search()` nahi, `query_points()`.** Bohat se purane tutorials abhi bhi `client.search()` sikha rahe hain. Woh method **qdrant-client 1.12 se remove ho chuka hai** — sirf deprecated nahi, poori tarah hata diya gaya. Qdrant ki official docs ab `query_points()` hi dikhati hain. `AttributeError: 'QdrantClient' object has no attribute 'search'` ka matlab yehi hai.

> 💡 **Ek rule jo har RAG project per laagu hai:** query **usi model** se embed honi chahiye jis se documents embed hue thay. Alag model = alag vector space = bilkul bekaar results. Isliye model ka naam ek jagah likhein aur wahan se import karein — jaise hamare production code mein `backend/src/settings.py` karta hai. Do jagah likha hua model naam ek din alag ho jata hai, aur ye masla chup chaap chalta rehta hai: error koi nahi aata, bas jawab ghalat aane lagte hain.

### Step 7 — Asal cost nikalna

**Kyun:** client ka pehla sawal yehi hota hai. Aur zyadatar log iska jawab andaze se dete hain — aap hisaab lagana seekhenge.

**Official price** *(5 Sep 2026)*:

| Model | Price |
|---|---|
| `text-embedding-3-small` | **$0.02 / 1M tokens** |
| `text-embedding-3-large` | **$0.13 / 1M tokens** |

#### Formula

Cost sirf tokens per lagti hai — words per nahi, documents per nahi:

```
tokens ÷ 1,000,000 × price per 1M tokens = embedding cost
```

#### Worked example — 100,000 words ka document set

**Step A — words se tokens:**

```
100,000 words × 1.33 ≈ 133,000 tokens
```

**Step B — tokens se cost:**

```
133,000 ÷ 1,000,000 × $0.02 = $0.00266  ≈  $0.003
```

Yani ek **200-safhe ki poori kitab** embed karna lagbhag **teen-hazaarwan hissa ek dollar ka** — ek cent se bhi kam.

Aur is lesson ka demo:

| Cheez | Tokens | Cost |
|---|---|---|
| 6 texts embed karna | ~75 | $0.0000015 |
| 1 query embed karna | ~6 | $0.00000012 |
| Qdrant free cluster | — | **$0** |

#### ⚠️ `1.33` ek andaza hai — asal ginti alag hoti hai

Woh `× 1.33` koi official formula nahi. English text ka ek motа sa andaza hai, aur yeh **galat ho jata hai** jab text mein code, URLs, numbers, ya English ke ilawa koi zubaan ho. Roman Urdu aur Urdu dono mein token count aksar zyada nikalta hai.

Client ko number dena ho to **andaza nahi, ginti** karein. OpenAI ka apna tokenizer `tiktoken` hai *(Official)*:

```bash
pip install tiktoken
```

```python
import tiktoken

encoding = tiktoken.encoding_for_model("text-embedding-3-small")

texts = [
    "Refunds are processed within 7 working days of approval.",
    "Orders above Rs. 5,000 qualify for free delivery across Pakistan.",
]

total_tokens = sum(len(encoding.encode(t)) for t in texts)
cost = total_tokens / 1_000_000 * 0.02

print(f"Tokens: {total_tokens}")
print(f"Cost:   ${cost:.8f}")
```

**Ab yeh number andaza nahi, measurement hai** — aur client meeting mein yehi farq aap ko professional dikhata hai.

> 💰 **Client ko yeh baat zaroor batayein:** embedding ka kharcha asal masla **nahi** hai — woh cents mein hai, aur ek dafa ka hai. Asal kharcha **LLM ke jawab** ka hota hai, jo har message per lagta hai. Woh Lesson 11 ka topic hai. Zyadatar log "AI mehnga hai" kehte hain bina yeh jaane ke mehnga **kaunsa hissa** hai.

---

## 6. Verification Checklist

Har item ka natija **dikhna** chahiye — sirf "ho gaya" kaafi nahi.

- [ ] **Cluster Healthy hai** → dashboard per status **Healthy**, `Provisioning` ya `Suspended` nahi
- [ ] **`.env` file ban gayi aur gitignored hai** → `git status` mein `.env` **nahi** dikhni chahiye
- [ ] **Connection kaam kar raha hai** → `connect.py` per `collections=[]` ya list print hoti hai, koi exception nahi
- [ ] **Collection dashboard mein mojood hai** → Manage Collections mein `lesson03_demo` dikhti hai
- [ ] **Size aur distance sahi hain** → collection kholne per `size: 1536` aur `distance: Cosine` likha hai
- [ ] **Points andar hain** → `load.py` per `6 points` print hota hai, aur dashboard ke **Points** tab mein 6 records dikhte hain
- [ ] **Vector ki lambai match karti hai** → `load.py` ka output `har vector mein 1536 numbers` kehta hai
- [ ] **Search chal rahi hai** → `search.py` teen results deta hai, har ek ke saath score
- [ ] **Semantic match ho raha hai** → `"I want my money back"` ka top result **refund wali line** hai, halanke dono mein koi word common nahi
- [ ] **Scores ghat rahe hain** → result 1 ka score result 2 se bara, aur 2 ka 3 se — ranking sahi kaam kar rahi hai
- [ ] **Token count nikala** → `tiktoken` wali script chali aur asal number aaya, andaza nahi

Koi bhi fail ho raha ho to agla section dekhen.

---

## 7. Troubleshooting

Yeh saare errors hamare apne development ke doran **asal mein pesh aaye** — is book ke backend code mein inke fixes abhi bhi mojood hain.

| Error | Cause | Solution |
|---|---|---|
| `UnexpectedResponse: 401` / `403` | API key ghalat, ya key ke aakhir mein invisible space / newline copy ho gaya | Key per `.strip()` lagayein. Hamare `setup_qdrant.py` mein isi wajah se hai |
| `KeyError: 'QDRANT_URL'` | `.env` file nahi mili, ya `load_dotenv()` likhna bhool gaye | Check karein ke `.env` **usi folder** mein hai jahan se script chala rahe hain, aur `load_dotenv()` imports ke baad likha hai |
| `ResponseHandlingException` / timeout | Cluster provision ho raha hai, network slow hai, ya cluster suspend ho chuka hai | Dashboard per status **Healthy** check karein. `timeout=30` rakhein. Free cluster 1 week inactivity per suspend hota hai — resume karein |
| `Vector dimension error: expected 1536, got 3072` | Collection `3-small` (1536) ki thi, embed `3-large` (3072) se hua — ya iska ulta | Model aur collection ka size **match** karayein. Model badalna hai to collection **delete karke dobara** banani paregi aur saara data phir se embed hoga — purane vectors convert nahi hote |
| `Collection 'xyz' already exists` | Collection pehle se mojood hai aur `create_collection` dobara chala diya | Pehle `get_collections()` se check karein (Step 4 wali script yehi karti hai) |
| `AttributeError: ... has no attribute 'search'` | Purana tutorial follow kiya — `search()` **qdrant-client 1.12 se remove ho chuka hai** | `query_points()` use karein |
| Search results khali aate hain | Points upsert nahi huay, ya galat collection ka naam use ho raha hai | `get_collection(...).points_count` check karein. `0` hai to `load.py` dobara chalayein |
| Results aate hain lekin bilkul bekaar | Query kisi **doosre model** se embed hui | Query aur documents ka model bilkul same hona chahiye |

---

## 8. Alternatives — pgvector, Pinecone, Chroma

Qdrant hamara choice hai, lekin client ka stack alag ho sakta hai. Yeh table client meeting ke liye hai:

| Option | Kab chunein | Dhyan rakhein |
|---|---|---|
| **Qdrant** | Default. Free cloud tier, achhi Python library, self-host bhi ho sakta hai | Ek aur service manage karni parti hai |
| **pgvector** | Client ke paas **already PostgreSQL** hai | Bohat bare paimane per dedicated vector DB se dheema par sakta hai |
| **Pinecone** | Client ko fully managed chahiye aur budget hai | Sirf cloud — self-host ka option nahi |
| **Chroma** | Local prototype, laptop per testing | Production ke liye pehla choice nahi |

**Ek line ka rule:** agar client ke paas PostgreSQL already chal raha hai, to **pgvector** se shuru karein — nayi service add karne ka koi faida nahi. Baqi har surat mein **Qdrant**.

**HNSW** ka naam aap documentation mein dekhenge — yeh woh indexing algorithm hai jis se Qdrant lakhon vectors mein tezi se search karta hai. Iski settings badalne ki zarurat tab tak nahi parti jab tak aap bohat bare scale per na hon. Bas itna jaanna kaafi hai ke yeh mojood hai aur speed uski wajah se hai.

---

## 9. Best Practices & Industry Tips

1. **Declare the model and its vector size in one place, and import it everywhere.** The embedding model, the collection's size, and the ingestion script must always agree. Two hardcoded copies will drift apart, and the failure is silent — no error, just bad answers.
2. **Keep credentials in `.env`, never in code, and never commit that file.** Add `.env` to `.gitignore` on the first day of a project, before the first commit.
3. **Always store the original text in the payload.** A vector cannot be converted back into text. Without the payload you have scores and no answer — and no citations.
4. **Never write code that deletes and recreates a collection without an explicit confirmation flag.** In production that is a single command that destroys everything.
5. **Strip whitespace from every API key read from the environment.** A trailing newline from a copy-paste fails with an authentication error that never mentions whitespace.
6. **Use one collection per project, not one per customer.** Filtering by payload is cheaper and simpler than managing hundreds of collections.
7. **Embed in batches, not one call per text.** One request with a list is faster and cheaper in overhead than a loop of single calls.
8. **Measure token counts with `tiktoken` before quoting a price.** The words-to-tokens ratio is only an estimate, and it drifts badly on code, URLs, and non-English text.
9. **Set an explicit timeout on the client.** The default can hang a script indefinitely when a cluster is provisioning or suspended.
10. **Check the free cluster before a demo.** It suspends after one week of inactivity — verify status before a client call, not during one.

---

## 10. Summary & Key Takeaways

1. **A vector database finds the closest match in meaning, not the exact match in words.** That single difference is what lets a customer ask "I want my money back" and receive the refund policy.
2. **Four things sit inside each other: cluster → collection → size → distance metric.** The cluster is your server, the collection is one project's data, the size is how many numbers each vector holds, and the distance metric defines what "closest" means.
3. **Size and distance are fixed when the collection is created and cannot be changed afterwards.** Choosing wrong means deleting the collection and re-embedding everything, so these two are decisions, not keystrokes.
4. **Storage scales linearly with dimensions:** a vector costs `dimensions × 4` bytes. Double the dimensions and you halve the number of vectors that fit — which is why the free tier's "1 million vectors" figure is quoted at 768 dimensions, and why 1,536 dimensions gives roughly half that.
5. **Credentials belong in a `.env` file, not in a terminal session.** Terminal variables vanish when the window closes; a `.env` file persists, and `.gitignore` keeps it private.
6. **Embedding is close to free, and the free tier costs nothing.** A 200-page book costs about a third of a cent to embed. The real cost in a RAG system is the LLM generating answers — that comes in Lesson 11.
7. **Estimate with a ratio, quote with a tokenizer.** `words × 1.33` is fine for a rough sense; `tiktoken` is what you use before telling a client a number.
8. **The query must be embedded with the same model as the documents.** A mismatch produces no error and no warning — only quietly wrong results.

---

## 11. Interview Points

**Q: What does a vector database do that a relational database cannot?**
A: It ranks records by semantic similarity rather than matching values. A SQL query for "refund" will not find "I want my money back"; a vector search will, because it compares embeddings rather than strings.

**Q: What is a distance metric, and which one do you use with OpenAI embeddings?**
A: It defines how closeness between two vectors is measured. With OpenAI embeddings I use Cosine — OpenAI recommends it, and Qdrant normalizes vectors in Cosine collections automatically.

**Q: Can you change a collection's vector size later?**
A: No. Size and distance metric are set at creation. Changing either means creating a new collection and re-embedding all the data, because existing vectors are not convertible.

**Q: How do you estimate how much storage a vector database will need?**
A: Qdrant's formula is `points × replication_factor × dimensions × bytes_per_dim`, and float32 is 4 bytes per dimension by default. So a 1,536-dimension vector is about 6 KB. A million of them is roughly 6 GB before any index overhead.

**Q: You are asked to switch the embedding model from 3-small to 3-large. What has to change?**
A: Three things together — the model name, the collection's vector size from 1,536 to 3,072, and a full re-ingestion. Old vectors cannot be reused, and mixing the two produces silently wrong retrieval.

**Q: What is Matryoshka in the context of embeddings?**
A: OpenAI's newer embedding models are trained so the earliest numbers in the vector carry the most meaning. You request a shorter vector with the `dimensions` parameter, and it still works — OpenAI reports that 3-large at 256 dimensions still outperforms ada-002 at 1,536. It is a storage optimisation that only matters at a scale of roughly a million vectors or more.

**Q: What is the payload in Qdrant and why does it matter?**
A: It is the data stored alongside the vector — the original text, a URL, a section name. Vectors cannot be reversed back into text, so without a payload a search returns scores with nothing to show the user. It is also what makes citations possible.

**Q: How do you calculate the cost of embedding a document set?**
A: Count the tokens with `tiktoken`, then `tokens ÷ 1,000,000 × price per 1M tokens`. I count rather than estimate, because the words-per-token ratio shifts on code, URLs, and non-English text.

---

## 12. Sources

*All claims re-checked against the original sources on **5 September 2026**.*

| Claim used in this lesson | Source | Checked |
|---|---|---|
| Free tier: 1 node, 0.5 vCPU, 1 GB RAM, 4 GB disk · "supports serving about 1 M vectors of 768 dimensions" · no credit card required · suspended after 1 week of inactivity, deleted after 4 weeks | Qdrant Cloud docs (official): [qdrant.tech/documentation/cloud/create-cluster](https://qdrant.tech/documentation/cloud/create-cluster/) · pricing page states "0.5 vCPU / 1GB RAM / 4 GB Disk": [qdrant.tech/pricing](https://qdrant.tech/pricing/) | 5 Sep 2026 |
| **GB vs GiB — contradiction, reported not resolved.** Official docs and the pricing page both say **GB**; some users report the cluster dashboard displaying **GiB**. 4 GiB ≈ 4.29 GB. This lesson uses the official figure | Qdrant docs and pricing page as above vs. dashboard UI (not reproducible from documentation) | 5 Sep 2026 |
| Capacity formula `dense_size = base × dimensions × bytes_per_dim`, `base = points × replication_factor`, float32 = 4 bytes (default) | Qdrant capacity planning (official): [qdrant.tech/documentation/capacity-planning](https://qdrant.tech/documentation/capacity-planning/) | 5 Sep 2026 |
| Per-dimension storage table (256 / 768 / 1,536 / 3,072 dims) and the "double the dimensions, halve the vectors" conclusion | Our own arithmetic from the official formula above, with `replication_factor = 1` for the single-node free tier. Qdrant itself only quotes the 768-dimension figure | 5 Sep 2026 |
| Distance metrics available (Cosine, Dot, Euclid, Manhattan) · the metric is chosen at collection creation · Qdrant normalizes vectors in Cosine collections | Qdrant collections docs (official): [qdrant.tech/documentation/manage-data/collections](https://qdrant.tech/documentation/manage-data/collections/) | 5 Sep 2026 |
| `query_points()` is the current search method in the Python client | Qdrant search docs (official): [qdrant.tech/documentation/search/search](https://qdrant.tech/documentation/search/search/) | 5 Sep 2026 |
| `search()` was removed in qdrant-client ≥ 1.12 | Verified in this book's source: `backend/src/services/vector_service.py` (comment at the `query_points` call) and `backend/requirements.txt` (`qdrant-client>=1.12.0`) | 5 Sep 2026 |
| Pricing: `text-embedding-3-small` $0.02 / 1M tokens · `text-embedding-3-large` $0.13 / 1M tokens | OpenAI pricing (official): [developers.openai.com/api/docs/pricing](https://developers.openai.com/api/docs/pricing) | 5 Sep 2026 |
| 3-small = 1,536 dims · 3-large = 3,072 dims · cosine recommended · vectors returned normalized | OpenAI embeddings guide (official): [developers.openai.com/api/docs/guides/embeddings](https://developers.openai.com/api/docs/guides/embeddings) | 5 Sep 2026 |
| Matryoshka: *"developers can shorten embeddings … without the embedding losing its concept-representing properties by passing in the `dimensions` API parameter"* · *"a `text-embedding-3-large` embedding can be shortened to a size of 256 while still outperforming an unshortened `text-embedding-ada-002` embedding with a size of 1536"* · *"When you change the dimension manually, you need to be sure to normalize the dimensions of the embedding"* | OpenAI embeddings guide (official), quoted verbatim: [developers.openai.com/api/docs/guides/embeddings](https://developers.openai.com/api/docs/guides/embeddings) | 5 Sep 2026 |
| `tiktoken` is OpenAI's own tokenizer for counting tokens in Python | OpenAI embeddings guide (official): *"In Python, you can split a string into tokens with OpenAI's tokenizer `tiktoken`"* | 5 Sep 2026 |
| Words-to-tokens ratio of ~1.33 | **Estimate — not official.** Used only for a rough figure; the lesson shows `tiktoken` as the way to get a real count | 5 Sep 2026 |
| Troubleshooting errors (whitespace in API key, connection timeout, dimension mismatch, collection already exists) | Verified in this book's source: `backend/scripts/setup_qdrant.py`, `backend/src/services/embedding_service.py`, `backend/src/settings.py` — these are the fixes written during our own development | 5 Sep 2026 |
| Region recommendation for Pakistan (Asia first, then Europe) | **Our own reasoning** from the general principle that latency grows with physical distance. Qdrant does not publish a region-by-region latency table, and free-tier region availability varies | 5 Sep 2026 |
| Search result scores in §5, Step 6 | **Pending — not yet measured.** Run `search.py` and fill in the actual scores before recording. Do not quote a number until then | pending |

> **Prices and free-tier limits change.** Re-check the Qdrant pricing page and the OpenAI pricing page before quoting these on camera.

---

**Next Lesson →** Lesson 04 — Chunking: Retrieval Quality ka #1 Driver *(coming soon)*

**Agentive Solutions** · [YouTube](https://www.youtube.com/@SolutionsWithShahzain) · [GitHub](https://github.com/Shahzain-Ali) · [LinkedIn](https://linkedin.com/in/shahzain-ali1) · [Instagram](https://instagram.com/shahzainalibangash1) · [Facebook](https://facebook.com/shahzainalibangash1)

---

## Resources

- 📊 **Slides (PDF):** <a href="/agentive-solutions-book/resources/rag-for-automation/lesson-03/slides.pdf" target="_blank" rel="noopener noreferrer">slides.pdf</a>
- 📊 **Slides (PowerPoint):** <a href="/agentive-solutions-book/resources/rag-for-automation/lesson-03/slides.pptx">slides.pptx</a>
- ▶️ **Video:** Coming soon
- 🧪 **Scripts:** §5 mein poore mojood hain — `connect.py`, `setup.py`, `load.py`, `search.py`. Copy karein aur chala lein
- 🗄️ **Qdrant Cloud:** [cloud.qdrant.io](https://cloud.qdrant.io)
