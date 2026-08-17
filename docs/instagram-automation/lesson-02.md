---
id: lesson-02
sidebar_position: 2
sidebar_label: "Lesson 02 — Auto-Reply to Comments and DMs"
description: "Reply automatically to Instagram comments and DMs from n8n, and stop the bot from answering its own replies — two loops, two guards, and the field subscription that quietly creates a third."
---

# Lesson 02 — Auto-Reply to Comments and DMs

**Book:** Instagram Automation
**Lesson:** 2
**Type:** Implementation guide
**Prerequisites:** Lesson 01 completed — events already arriving in your n8n workflow
**Facts verified:** August 2026 — Instagram Platform API v25.0, tested live on the author's own account

---

## Table of Contents

1. [What You'll Learn in This Lesson](#1-what-youll-learn-in-this-lesson)
2. [Before You Start](#2-before-you-start)
3. [Why the Bot Answers Itself](#3-why-the-bot-answers-itself)
4. [The Guards](#4-the-guards)
5. [Step-by-Step Implementation](#5-step-by-step-implementation)
6. [Verification Checklist](#6-verification-checklist)
7. [Troubleshooting](#7-troubleshooting)
8. [Best Practices](#8-best-practices)
9. [Summary](#9-summary)
10. [Interview Points](#10-interview-points)
11. [Sources](#11-sources)

---

## 1. What You'll Learn in This Lesson

- [ ] Normalise a comment payload and a DM payload into one flat shape
- [ ] Route an incoming event to the correct branch with a Switch node
- [ ] Reply to a comment with `POST /{comment-id}/replies`
- [ ] Reply to a DM with `POST /me/messages`
- [ ] Explain the two loops an unguarded reply bot creates, and stop both with two guards
- [ ] Tell a loop guard apart from a content guard, and know why the difference matters

---

## 2. Before You Start

Ye lesson **wahin se shuru hota hai jahan Lesson 01 khatam hua tha.** Neeche wali cheezein pehle se honi chahiyen — ye guide inhe dobara nahi banati:

| # | Cheez | Note |
|---|-------|------|
| 1 | **Lesson 01 wali workflow** — events aa rahe hain | Callback URL verified, subscribe call chal chuki, app Live |
| 2 | **Access token** us workflow ke setup se | Lesson 01, Step 4 mein bana tha |
| 3 | **Doosra Instagram account** | Test ke liye |

> 🧑 Lesson 01 mein dekha tha: comment aur DM dono ke events `Executions` tab mein nazar aa rahe hain, lekin aage kuch nahi hota. **Wo "aage" is lesson mein banega.**

**Token ke scopes** — ye 3 chahiyen. Lesson 01 wala token pehle se inke saath bana tha:

```
instagram_business_basic
instagram_business_manage_comments      ← comment reply ke liye
instagram_business_manage_messages      ← DM reply ke liye
```

---

## 3. Why the Bot Answers Itself

Ye is lesson ka sab se ahem hissa hai. Steps se pehle ye samajh lena zaroori hai, warna aap ek aisa bot bana denge jo apne aap se baat karta rahega.

### Masla ek line mein

> **Bot jo bhi bhejta hai, Meta uski khabar bhi wapas bot ko bhej deta hai.**

Lesson 01 mein aap ne 2 fields subscribe ki theen — `comments` aur `messages`. **Dono par ek ek loop maujood hai.**

### Loop 1 — Comment ka loop  *(`comments` field)*

```
User comment karta hai
      │
      ▼
Bot reply karta hai  ─────►  wo reply KHUD ek naya comment hai
      │                             │
      │                             ▼
      │                     Meta naya comment event bhejta hai
      │                             │
      └─────────────────────────────┘
                  🔁
```

### Loop 2 — DM ka loop  *(`messages` field)*

```
User DM karta hai
      │
      ▼
Bot reply bhejta hai  ────►  Meta us reply ki copy (echo) wapas bhejta hai
      │                             │
      └─────────────────────────────┘
                  🔁
```

> 🗣️ Dono loops ki shakl ek hi hai: **jo bahar gaya, wohi wapas andar aa gaya** — aur bot ko pata hi nahi ke ye uska apna bheja hua hai.

**Achhi khabar:** Meta dono cases mein ek nishan chhor deta hai jisse hum pehchan sakte hain. Wohi 2 nishan hamare 2 loop guards banenge.

---

## 4. The Guards

4 conditions lagengi — lekin **sab loop guards nahi hain.** Har ek ka kaam alag hai:

| # | Condition | Kaam | Kya rokta hai |
|---|-----------|------|---------------|
| 1 | `parent_id` **empty** | 🔒 Loop guard | Bot ka apna comment reply |
| 2 | `is_echo` **false** | 🔒 Loop guard | Bot ka apna DM (echo) |
| 3 | `text` **not empty** | 📭 Content guard | Image, sticker, voice note — jin mein jawab dene ko kuch hai hi nahi |
| 4 | `from_id ≠ account_id` | 🛡️ Backup | Guard 2 ka doosra rasta |

> ⚠️ **Guard 3 loop nahi rokta.** Wo bilkul alag masla rokta hai. Isay "loop guard" samajh lena aam ghalti hai — aur us ghalti ki wajah se log usay hata dete hain.

### Guard 1 — `parent_id` empty  🔒

Meta ki apni definition: *"ID of parent IG Comment if this comment was created on another IG Comment."*

```
Post par seedha comment   →  parent_id maujood NAHI  →  ✅ jawab do
Kisi comment ka jawab     →  parent_id maujood HAI   →  ❌ chhoro
```

Bot ka reply hamesha kisi comment ke **neeche** hota hai — is liye us mein `parent_id` hamesha hota hai. Loop 1 yahan khatam.

### Guard 2 — `is_echo` false  🔒

Meta har us DM par `is_echo: true` lagata hai jo **aap ke apne account se** gaya ho — chahe bot ne bheja ho ya aap ne khud phone se.

> 🗣️ Ek baat jo ajeeb lagti hai: asli incoming DM mein `is_echo` **likha hi nahi hota**. Wo sirf `true` ke waqt aata hai. Isliye "field maujood nahi" ka matlab hai "echo nahi hai".

Loop 2 yahan khatam.

### Guard 3 — `text` not empty  📭

Har DM mein text nahi hota. Ye 3 cases aam hain:

| User ne bheja | `message` object | `text` |
|---------------|------------------|--------|
| Sirf image | ✅ hai | ❌ nahi |
| Sticker ya GIF | ✅ hai | ❌ nahi |
| Voice note | ✅ hai | ❌ nahi |

In teenon mein `message` object **maujood hota hai** — to Guard 2 aaram se pass ho jata hai. Lekin **jawab dene ko kuch hai hi nahi.**

Iske baghair bot khali text par reply bhej deta. Aur aage chal kar jab AI add hoga, us AI ko khali input jayega — aur khali input par model kuch bhi bana deta hai.

> 💡 Ye guard ek **doosri layer** ka kaam bhi karta hai. Meta kal koi naya event type add kar sakta hai. Agar us mein text na hua, to bot **chup rahega** — pagal nahi hoga.

### Guard 4 — `from_id ≠ account_id`  🛡️

```
account_id  =  jis account par event aaya   (aap ka business account)
from_id     =  jisne bheja
```

Dono barabar hain to bhejne wala aap ka apna account hai. Ye Guard 2 ka hi kaam karta hai, magar **Meta ke label par bharosa kiye baghair** — khud hisaab laga kar.

---

## 5. Step-by-Step Implementation

Lesson 01 wali workflow open karein. Usmein abhi **5** nodes hain aur `Extract Event Data` par silsila khatam ho jata hai.

```
Instagram Webhook ─┬─ GET  → Is Verification Request? → Send hub.challenge
                   └─ POST → Send 200 OK → Extract Event Data → ⛔
```

Is lesson ke baad ye shakl hogi:

```
Instagram Webhook ─┬─ GET  → Is Verification Request? → Send hub.challenge
                   └─ POST → Send 200 OK → Extract Event Data → Route Event ─┬─ comment → Reply to Comment
                                                                             ├─ dm      → Send DM Reply
                                                                             └─ ignored → Ignored Event
```

---

### Part A — Prepare the Credential

#### Step 1 — Create the Header Auth Credential

🧑 n8n → **Credentials** → **Add credential** → `Header Auth` search karein → add

| Field | Value |
|-------|-------|
| **Name** | `Authorization` |
| **Value** | `Bearer <aap ka token>` |

Credential ka name set karein: `Instagram Token`

**Expected result:** credential list mein `Instagram Token` nazar aata hai.

> ⚠️ `Bearer` ke baad **ek space** lazmi hai, phir token. `BearerIGQ...` kaam nahi karega.

> 🔒 Token yahan **ek hi jagah** store karein. Dono HTTP nodes isi credential ko istemal karenge — token kisi node ke parameters mein likhne ki zaroorat nahi.

---

### Part B — Extend the Data Extraction

`Extract Event Data` abhi 5 fields nikalta hai. Guards ke liye 4 aur chahiyen.

#### Step 2 — Add the Four New Fields

🧑 Usi node mein **Add Field** click karke ye 4 fields add karein:

| Name | Type | Value |
|------|------|-------|
| `comment_id` | String | `{{ $json.body.entry[0].changes?.[0]?.value?.id ?? '' }}` |
| `parent_id` | String | `{{ $json.body.entry[0].changes?.[0]?.value?.parent_id ?? '' }}` |
| `account_id` | String | `{{ $json.body.entry[0].id ?? '' }}` |
| `is_echo` | **Boolean** | `{{ $json.body.entry[0].messaging?.[0]?.message?.is_echo === true }}` |

**Expected result:** node ke output mein ab **9** fields hain.


> ⚠️ `is_echo` ka type **Boolean** select karein, String nahi. Switch node ka boolean operator String par theek kaam nahi karta.

> 💡 Har expression mein `?.` aur `??` isliye hain ke comment ke payload mein `messaging` hota hi nahi, aur DM ke payload mein `changes` hota hi nahi. `?.` crash rokta hai, `??` khali string bhar deta hai — is tarah har field hamesha maujood rehti hai, chahe khali ho.

---

### Part C — Route the Events

#### Step 3 — Add the Route Event Node

🧑 Canvas → **+** → `Switch` search karein → add karein → name set karein **`Route Event`**

🧑 **Connect:** `Extract Event Data` → `Route Event`

**Routing Rule 1** — output ka naam `comment`:

| # | Left value | Operator | Right value |
|---|-----------|----------|-------------|
| 1 | `{{ $json.event_type }}` | is equal to | `comments` |
| 2 | `{{ $json.comment_id }}` | is not empty | — |
| 3 | `{{ $json.parent_id }}` | is empty | — |

**Routing Rule 2** — output ka naam `dm`:

| # | Left value | Operator | Right value |
|---|-----------|----------|-------------|
| 1 | `{{ $json.event_type }}` | is equal to | `message` |
| 2 | `{{ $json.is_echo }}` | is false | — |
| 3 | `{{ $json.from_id }}` | is not equal to | `{{ $json.account_id }}` |
| 4 | `{{ $json.text }}` | is not empty | — |

🧑 **Options** → *Add option* → **Fallback Output** → `Extra Output`

**Expected result:** node par **3** outputs nazar aate hain — `comment`, `dm`, aur `Fallback`.

`[screenshot: 01-route-event-three-outputs.png — capture on recording day]`

> ⚠️ **Fallback output chhorna sab se aam ghalti hai.** Uske baghair jo event kisi rule se match na kare wo **khamoshi se gayab** ho jata hai — na error, na koi nishan. Executions mein dekh kar bhi pata nahi chalta ke event aaya tha ya nahi.

---

#### Step 4 — Add the Ignored Event Node

🧑 Canvas → **+** → `No Operation, do nothing` → add → name set karein **`Ignored Event`**

🧑 **Connect:** `Route Event` ka **teesra output** (`Fallback`) → `Ignored Event`

**Expected result:** teesra output ab kisi node se juda hua hai.

> 🗣️ Ye node **kuch bhi nahi karta** — aur wohi iska maqsad hai. Har echo aur bot ka apna har comment yahan aa kar rukta hai, aur `Executions` mein **nazar aata hai**. "Kuch nahi hua" ka bhi record hona chahiye.

---

### Part D — Send the Replies

#### Step 5 — Add the Reply to Comment Node

🧑 Canvas → **+** → `HTTP Request` → add → name set karein **`Reply to Comment`**

🧑 **Connect:** `Route Event` ka **pehla output** (`comment`) → `Reply to Comment`

| Setting | Value |
|---------|-------|
| **Method** | `POST` |
| **URL** | `https://graph.instagram.com/v25.0/{{ $json.comment_id }}/replies` |
| **Authentication** | Generic Credential Type → **Header Auth** → `Instagram Token` |
| **Send Body** | ON → **JSON** |

**JSON Body:**

📋
```
{{ JSON.stringify({ message: 'Thanks for your comment! We have sent you the details in a DM.' }) }}
```

🧑 **Settings** tab → **On Error** → `Continue (using regular output)`

**Expected result:** test karne par response mein naye comment ki ID aati hai:
```json
{ "id": "18615430021004868" }
```

> 💡 URL mein `comment_id` isliye hai ke Instagram ko batana hota hai **kis comment ke neeche** reply lagani hai.

---

#### Step 6 — Add the Send DM Reply Node

🧑 Canvas → **+** → `HTTP Request` → add → name set karein **`Send DM Reply`**

🧑 **Connect:** `Route Event` ka **doosra output** (`dm`) → `Send DM Reply`

| Setting | Value |
|---------|-------|
| **Method** | `POST` |
| **URL** | `https://graph.instagram.com/v25.0/me/messages` |
| **Authentication** | Generic Credential Type → **Header Auth** → `Instagram Token` |
| **Send Body** | ON → **JSON** |

**JSON Body:**

📋
```
{{ JSON.stringify({ recipient: { id: $json.from_id }, message: { text: 'Thanks for your message! Our team will get back to you shortly.' } }) }}
```

🧑 **Settings** tab → **On Error** → `Continue (using regular output)`

**Expected result:** response mein `recipient_id` aur `message_id` aate hain.

> ⚠️ **Meta ka 24-ghante ka window:** ye call sirf tab kaam karti hai jab us user ne **pichhle 24 ghante mein** aap ko message bheja ho. Us se pehle ya baad mein Meta *"outside of allowed window"* wala error deta hai.

---

#### Step 7 — Publish and Test

🧑 Workflow **Publish** karein.

> ⚠️ **n8n mein Save aur Publish alag qadam hain.** Save sirf draft banata hai. Jab tak Publish nahi karenge, live version purana hi rahega — canvas naya dikhega, behaviour purana. Ye ghalti pakadni bohot mushkil hoti hai.

🧑 **Doosre Instagram account se:**
1. Apni kisi post par **comment** karein
2. Alag se ek **DM** bhejein

**Expected result:**

| Kya kiya | Kya hona chahiye |
|----------|------------------|
| Comment | Comment ke neeche reply · **ek** execution jismein `Reply to Comment` chala |
| DM | DM ka jawab · **ek** execution jismein `Send DM Reply` chala |
| Kuch na karein | Kuch aur executions jo `Ignored Event` par khatam hoti hain — **ye bilkul theek hai** |

`[screenshot: 02-execution-ignored-event.png — capture on recording day]`

**Yahan pohanch gaye — auto-reply chal raha hai.**

> 🗣️ `Ignored Event` par kai executions dikhein to worry na karein. Ek comment par aam tor par **2** executions banti hain — ek jawab deti hai, doosri bot ke apne reply ko rok deti hai. Yehi guard ka kaam hota hua dikhna hai.

---

## 6. Verification Checklist

Har item **apni screen par dekh kar** tick karein:

- [ ] `Extract Event Data` ke output mein **9** fields hain
- [ ] Ek echo wali execution mein `is_echo` ki value **`true`** hai, aur wo `Ignored Event` par khatam hui
- [ ] `Route Event` par **3** outputs nazar aate hain
- [ ] Teesra output `Ignored Event` se **juda hua** hai
- [ ] Dono HTTP nodes par credential **attached** hai
- [ ] Workflow **Published** hai — sirf saved nahi
- [ ] Comment karne par Instagram par **reply nazar aayi**
- [ ] DM bhejne par **jawab aaya**
- [ ] Bot ke apne reply par **koi doosra reply nahi gaya**
- [ ] Ek execution aisi mili jo `Ignored Event` par khatam hoti hai, aur usmein `is_echo: true` ya `parent_id` bhara hua hai

Aakhri 2 tick ho gaye — guards waqai kaam kar rahe hain.

---

## 7. Troubleshooting

Ye woh masail hain jo is build ke doran **waqai** pesh aaye:

| Error / Symptom | Cause | Solution |
|-----------------|-------|----------|
| Ek DM ka jawab **baar baar** jata hai | `is_echo` guard nahi laga, ya uska type String rakh diya gaya hai | Rule 2 mein `is_echo is false` add karein, aur field ka type **Boolean** karein |
| Bot **apne hi comment reply** ka jawab deta hai | Rule 1 mein `parent_id is empty` wali condition nahi hai | Wo condition add karein |
| Event aata hai lekin **kuch nahi chalta**, koi error bhi nahi | Event kisi rule se match nahi kar raha aur fallback output nahi hai | Fallback Output → `Extra Output`, aur `Ignored Event` se connect karein |
| Canvas naya dikhta hai lekin **behaviour purana** | Workflow save hua, **publish nahi** | Publish karein · `activeVersionId` khali nahi hona chahiye |
| HTTP node par authorization error | Credential attach nahi hui | Node → Authentication → Header Auth → `Instagram Token` |
| DM reply fail — *"outside of allowed window"* | User ne pichhle 24 ghante mein message nahi bheja | User ka naya message aane ka intezar karein — ye galti nahi, Meta ka rule hai |
| `is_echo` guard kaam nahi kar raha | Field ka type String rakh diya gaya hai | Type **Boolean** karein |

---

## 8. Best Practices

1. **Guard the reply before you write the reply.** An unguarded reply node is not a half-finished feature — it is a live incident. Build the Switch conditions first, then connect the HTTP nodes.
2. **Never let an event vanish.** Every branch should end somewhere visible, even when the correct action is to do nothing. A no-op node costs nothing and turns "no idea what happened" into "it was ignored, and here is why".
3. **Treat a missing field as a decision, not an accident.** `undefined === true` returns `false` without any warning, so a guard built on a missing field will confidently give the wrong answer. Ask what else could make that field missing.
4. **Publish, then verify on the live version.** Writing a guard is not shipping a guard. Until `activeVersionId` changes, the canvas and the running workflow are two different things.
5. **Test with a second account, and then leave it alone.** The most important observation is what happens in the seconds *after* your reply goes out — that is when a loop reveals itself.
6. **Keep the token in one credential.** Two HTTP nodes, one credential. Pasting a token into node parameters means rotating it becomes an archaeology exercise.

---

## 9. Summary

1. Every reply the bot sends comes back as a new webhook event, so an unguarded reply bot answers itself forever.
2. With `comments` and `messages` subscribed there are exactly two self-generated events, and Meta marks each one: a comment reply carries `parent_id`, a sent DM carries `is_echo`. Those two marks are the two loop guards.
3. Not every guard is a loop guard. Requiring non-empty text blocks nothing that loops — it blocks images, stickers and voice notes, where there is no text to reply to at all.
4. Four conditions, not one, are what make the routing safe; each blocks a different event and none substitutes for another.
5. A fallback output turns silent disappearance into a visible, explainable outcome — which is the difference between a system you can debug and one you can only guess at.

---

## 10. Interview Points

**Q: Why does an Instagram auto-reply bot end up replying to itself?**
A: Meta delivers the account's own activity back as webhook events. A reply to a comment arrives as a new comment, and a sent DM arrives as an echo. Without guards the bot treats its own output as new input, and the chain never ends.

**Q: Why is requiring non-empty text not a loop guard?**
A: Nothing that loops is blocked by it. It blocks images, stickers and voice notes — messages that carry a `message` object but no text, so there is nothing to reply to. Calling it a loop guard is how it ends up deleted during a cleanup.

**Q: How do you stop a comment reply from triggering another comment reply?**
A: A reply to a comment carries `parent_id`, the id of the comment it replies to. A genuine top-level comment does not. Requiring `parent_id` to be empty ends the chain.

**Q: Why add a no-op node to a workflow?**
A: So that "nothing happened" is recorded rather than inferred. Without it, unmatched events leave no trace in the execution list, and a real routing bug is indistinguishable from a quiet day.

---

## 11. Sources

| Source | Used for | Verified |
|--------|----------|----------|
| [Instagram Platform — Webhooks](https://developers.facebook.com/docs/instagram-platform/webhooks) | Comment payload fields, `parent_id` definition | 2026-08-14 |
| [Instagram API with Instagram Login — Messaging API](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api) | `POST /me/messages`, 24-hour messaging window, required scopes | 2026-08-13 |
| [Meta Webhooks — Getting Started](https://developers.facebook.com/docs/graph-api/webhooks/getting-started) | 200 OK requirement, retry behaviour over 36 hours | 2026-08-16 |
| Live executions 49–56 on the author's own account | The infinite loop: one DM, eight executions, four identical replies | 2026-08-14 |
| Live executions 58–73 on the author's own account | Every guard in this lesson, verified after the fix | 2026-08-14 |
| Live executions 86–87 on the author's own account | One DM produces exactly two executions — the reply, and the echo dropped by the guard | 2026-08-17 |

> The loop in §3 is not an illustration. It happened on the author's own Instagram account, the
> workflow had to be unpublished by hand to stop it, and the payload that caused it is quoted in
> §3 exactly as Meta delivered it.

---

**Next Lesson →** Lesson 03 — Private Replies: Comment to DM *(coming soon)*

**Agentive Solutions** · [YouTube](https://www.youtube.com/@SolutionsWithShahzain) · [GitHub](https://github.com/Shahzain-Ali) · [LinkedIn](https://linkedin.com/in/shahzain-ali1) · [Instagram](https://instagram.com/shahzainalibangash1) · [Facebook](https://facebook.com/shahzainalibangash1)
