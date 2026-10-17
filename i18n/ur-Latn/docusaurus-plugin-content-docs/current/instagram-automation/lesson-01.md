---
id: lesson-01
sidebar_position: 1
sidebar_label: "Lesson 01 — Instagram Webhook Setup"
description: "Set up Instagram webhooks from the Meta dashboard so comments and DMs arrive in your automation — including the two settings that silently block every event."
---

# Lesson 01 — Instagram Webhook Setup

**Book:** Instagram Automation
**Lesson:** 1
**Type:** Implementation guide
**Prerequisites:** A Meta Business app · an Instagram professional account · a second Instagram account for testing
**Facts verified:** August 2026 — Instagram Platform API v23.0, tested live on the author's own account

---

## Table of Contents

1. [What You'll Learn in This Lesson](#1-what-youll-learn-in-this-lesson)
2. [Before You Start](#2-before-you-start)
3. [Three Terms You Need First](#3-three-terms-you-need-first)
4. [How the Handshake Works](#4-how-the-handshake-works)
5. [Step-by-Step Implementation](#5-step-by-step-implementation)
6. [Verification Checklist](#6-verification-checklist)
7. [Troubleshooting](#7-troubleshooting)
8. [Best Practices](#8-best-practices)
9. [Summary](#9-summary)
10. [Interview Points](#10-interview-points)
11. [Sources](#11-sources)

---

## 1. What You'll Learn in This Lesson

- [ ] Explain what a callback URL is and what can serve as one
- [ ] Complete Meta's verification handshake by echoing `hub.challenge`
- [ ] Subscribe an Instagram account to the `comments` and `messages` webhook fields
- [ ] Take the app Live and receive a real comment and DM in your automation

---

## 2. Before You Start

Ye guide **webhook setup** karati hai. Neeche wali cheezein pehle se honi chahiyen — guide inhe nahi banati:

| # | Cheez | Note |
|---|-------|------|
| 1 | **Meta Business app** — bani hui | `developers.facebook.com` par. App banane ke steps is lesson mein nahi hain |
| 2 | **Instagram professional account** (Business ya Creator) | Personal account par API chalti hi nahi |
| 3 | **Doosra Instagram account** | Test ke liye — apne comment par bharosa na karein |
| 4 | Ek **HTTPS endpoint** | Hum n8n dikha rahe hain — §3 mein doosre options bhi hain |

**Kharcha:** kuch nahi. Sab kuch free tier par ho jata hai.

> 🧑 Facebook Page ki **zaroorat nahi.** Ye guide *Instagram API with Instagram Login* wale raaste par chalti hai, jismein Page shamil hi nahi hota.

---

## 3. Three Terms You Need First

### Webhook

> **Webhook:** an HTTP request a platform sends to your address the moment something happens, instead of you asking it again and again.

> 🗣️ **Roman Urdu:** Aap Meta se baar baar poochte nahi — jab koi comment ya DM aata hai, Meta khud aap ke address par khabar bhej deta hai.

Webhook ki tafseel `n8n Webhooks & MCP` book ki Lesson 02 mein hai. Yahan sirf itna kaafi hai.

### Callback URL

> **Callback URL:** the public HTTPS address where Meta delivers those events.

> 🗣️ **Roman Urdu:** Wo address jahan Meta khabar bhejta hai. Meta ko sirf ek cheez chahiye — aisa address jo public ho, HTTPS ho, aur jawab de sake.

**n8n ke ilawa kya kya ho sakta hai:**

| Option | Kab munasib hai |
|--------|-----------------|
| **n8n** *(is lesson mein yehi)* | Automation pehle se chal rahi ho |
| Make · Pipedream | Aisa hi no-code tool |
| Apna code (Node/Python) on Railway · Render · Vercel | Poora control chahiye |
| **ngrok** | **Sirf testing** — production mein nahi |

> **Self-signed certificate:** an HTTPS certificate the server issues to itself, instead of one issued by a trusted certificate authority.

> 🗣️ **Roman Urdu:** Apna shanakhti card khud ghar par print kar lena. Card to ban jata hai, lekin kisi trusted idare ne uski tasdeeq nahi ki — is liye koi use qabool nahi karta.

⚠️ **Meta self-signed certificate qabool nahi karta** — uski apni shart hai. Isi liye localhost seedha kaam nahi karta, aur hosting platforms (n8n Cloud, Railway, Render) behtar hain: wo asli certificate khud-ba-khud dete hain.

### Verify token

> **Verify token:** a secret string you choose, which Meta sends back once so you can confirm the request came from your own setup.

> 🗣️ **Roman Urdu:** Ek password jo aap khud banate hain. Meta use ek dafa wapas bhejta hai — aap milaate hain, aur tasdeeq ho jati hai ke request aap ke apne setup ki hai.

---

## 4. How the Handshake Works

Aap ka endpoint **do** qism ki requests sambhalta hai. Dono ka rukh alag hai:

```
①  VERIFICATION — sirf ek dafa, setup ke waqt
    Meta  ──GET──▶  aap ka address
                    ?hub.mode=subscribe
                    &hub.verify_token=aapka-token
                    &hub.challenge=1158201444
    Meta  ◀────────  "1158201444"        ✅ green tick

②  EVENTS — is ke baad, har dafa
    Meta  ──POST──▶  aap ka address
                     { comment / DM ka poora data }
    Meta  ◀────────  200 OK
```

| Field | Kya hai |
|-------|---------|
| `hub.mode` | Hamesha `subscribe` |
| `hub.verify_token` | Wohi token jo aap ne Meta ke khane mein likha tha |
| **`hub.challenge`** | **Ek random number — Meta ka sawal** |

**Aap ka kaam:** token milaayein; sahi ho to **`hub.challenge` ka number hu-ba-hu wapas bhej dein** — plain text mein.

> ⚠️ Number ke aage peeche kuch na likhein — na quotes, na JSON. Sirf number. Warna verification fail ho jati hai.

---

## 5. Step-by-Step Implementation

### Part A — Prepare the Meta App

#### Step 1 — Add the Instagram Product

🧑 `developers.facebook.com` → apni app → **Add Product** → **Instagram** → *API setup with Instagram business login*

**Expected result:** ek setup page khulta hai jismein chaar numbered steps hain — *Generate access tokens*, *Configure webhooks*, *Set up Instagram business login*, *Complete app review*.

`[screenshot: 01-instagram-product-setup.png — capture on recording day]`

> 🧑 Sirf **Instagram** product add karna hai. Alag se "Webhooks" product add karne ki zaroorat nahi — webhook isi page se configure ho jata hai.

---

#### Step 2 — Assign the Instagram Tester Role

🧑 **App Roles** → **Roles** → **Instagram Testers** tab → **Add People** → apna Instagram username → **Add**

**Expected result:** username list mein *Pending* halat ke saath aa jata hai.

> ⚠️ Ye step **token se pehle** hona chahiye. Meta ka apna instruction hai: *"Before proceeding, make sure to assign the Instagram Tester role to the account in the Roles tab."*

---

#### Step 3 — Accept the Tester Invite

🧑 📱 **Instagram app** (phone) → **Settings and privacy** → **Apps and Websites** → **Tester Invites** → app par tap → **Accept**

**Expected result:** dashboard mein wohi username ab *Pending* se badal kar accepted ho jata hai.

`[screenshot: 02-tester-invite-accept.png — capture on recording day]`

> ⚠️ Ye phone par karna parta hai. Desktop par ye option nahi milta.

---

#### Step 4 — Generate the Access Token

🧑 Instagram product ke setup page par → **Generate token** → apna account chunein → allow karein

**Expected result:** ek lamba token milta hai. Meta ki doc ke mutabiq dashboard se bana hua token **long-lived** hota hai aur **60 din** chalta hai.

**Ye scopes hona zaroori hain:**

```
instagram_business_basic
instagram_business_manage_comments      ← comments ke liye
instagram_business_manage_messages      ← DMs ke liye
```

📋 Token abhi copy kar lein — **Step 11** mein lagega.

> 🔒 Token kisi ke saath share na karein aur screenshot mein dhaanp dein. Jise ye mil jaye, wo aap ke account par kaam kar sakta hai.

---

#### Step 5 — Fill the Privacy Policy and Data Deletion URLs

🧑 **App settings** → **Basic** → do khane bharein:

| Field | Kya daalein |
|-------|-------------|
| **Privacy policy URL** | Aap ka public privacy policy page |
| **User data deletion** | *Data deletion instructions URL* chunein → us page ka `#data-deletion` wala section |

**Expected result:** Save Changes ke baad koi error nahi aata.

**Page kahan se laayein?** Ek simple HTML page **GitHub Pages** par muft host ho jata hai. Usmein likha ho: aap kaunsa data lete hain, aur user delete kaise karwa sakta hai.

> ⚠️ **Ye khana khali chhorenge to Step 12 (Live) wahin ruk jayega:**
> ```
> Invalid Privacy Policy URL
> You must provide a valid Privacy Policy URL in order to take your app Live.
> ```

> **User data deletion ke do options:**
> **Instructions URL** — ek page jispe likha ho ke delete karwane ke liye kya karna hai. Kaam aap haath se karte hain. *(Chhote setups ke liye — is lesson mein yehi.)*
> **Callback URL** — ek endpoint jise Meta khud call karta hai, aur aap ka server data khud delete karta hai. *(Bare products ke liye — code aur server chahiye.)*
> Meta ki doc: *"Developers need to specify **either** a data deletion callback instruction URL **or** a callback URL."* Volume ki koi shart nahi — dono mein se koi bhi chalega.

---

### Part B — Build the Endpoint (n8n)

#### Step 6 — Create the Webhook Node

🧑 n8n → naya workflow → **Webhook** node add karein:

| Setting | Value |
|---------|-------|
| **Allow Multiple HTTP Methods** | **ON** → `GET` aur `POST` dono |
| **Path** | `instagram-webhook-setup` |
| **Respond** | *Using 'Respond to Webhook' Node* |

**Expected result:** node par do URL nazar aate hain — **Test URL** aur **Production URL**.

> ⚠️ **Multiple methods on karne se webhook node ke DO output ban jate hain** — output 0 = GET, output 1 = POST. Dono ko alag alag jorna parta hai. Sirf pehla jorenge to events kabhi nahi pohanchenge, aur koi error bhi nahi aayega. Iski poori tafseel `n8n Webhooks & MCP` book ki Lesson 02 mein hai.

---

#### Step 7 — Answer `hub.challenge`

🧑 Do branch banayein:

```
Webhook ─ output 0 (GET)  ──▶ IF: verify token sahi hai?
                                 ├─ haan → Respond: hub.challenge wapas
                                 └─ nahi → kuch nahi
        └ output 1 (POST) ──▶ Respond: 200 OK  ──▶ event ka data
```

**GET wali branch ka Respond node:**

| Setting | Value |
|---------|-------|
| Respond With | **Text** |
| Response Body | `{{ $json.query['hub.challenge'] }}` |

**POST wali branch ka Respond node:** Text → `EVENT_RECEIVED`

**Expected result:** workflow par chaar node — Webhook, IF, aur do Respond.

`[screenshot: 03-n8n-webhook-workflow.png — capture on recording day]`

---

#### Step 8 — Activate and Copy the Production URL

🧑 Workflow ko **Active** karein → Webhook node → **Production URL** tab → copy

**Expected result:** URL is shakl mein hoga:
```
https://<aap-ka-instance>.app.n8n.cloud/webhook/instagram-webhook-setup
```

> ⚠️ **Test URL nahi — Production URL.** Test URL sirf tab zinda hota hai jab aap *"Listen for test event"* daba kar baithe hon. Aur **workflow Active na ho to Production URL 404 deta hai**, jis se Meta ki verification foran fail ho jati hai.

---

### Part C — Connect the Two

#### Step 9 — Enter the Callback URL and Verify Token

🧑 Instagram product ke setup page → **Configure webhooks** →

| Field | Value |
|-------|-------|
| **Callback URL** | Step 8 wala Production URL |
| **Verify Token** | Koi bhi string jo aap chunein — wohi jo aap ne IF node mein likhi hai |

→ **Verify and Save**

**Expected result:** green tick. Isi lamhe Meta ne GET bheji, aap ke workflow ne `hub.challenge` wapas kiya, aur Meta ne qabool kar liya.

`[screenshot: 04-callback-url-verified.png — capture on recording day]`

> ⚠️ Verify token **dono jagah hu-ba-hu** honi chahiye — ek space ka farq bhi verification fail kar deta hai.

---

#### Step 10 — Subscribe to the Fields

🧑 Usi page par fields ki list se tick karein:

```
comments      ← post par comment aane par
messages      ← DM aane par
```

**Expected result:** dono fields subscribed nazar aate hain.

---

#### Step 11 — Run the Subscribe Call

Do tareeqe hain — jo aasan lage, wohi chunein. Nateeja dono ka ek hi hai.

**Option A — Graph API Explorer** *(Meta ka apna tool, koi terminal nahi)*

🧑 `developers.facebook.com/tools/explorer/` →

| Setting | Value |
|---------|-------|
| Host | **`graph.instagram.com`** *(dropdown se — `facebook.com` nahi)* |
| Method | **POST** |
| Path | `me/subscribed_apps` |
| Add parameter | `subscribed_fields` = `comments,messages` |

→ **Submit**

Access token ka khana Explorer khud bhar deta hai — alag se likhne ki zaroorat nahi.

**Option B — curl** *(ya Postman, ya n8n ka HTTP Request node)*

📋
```bash
curl -X POST "https://graph.instagram.com/v23.0/me/subscribed_apps" \
  -d "subscribed_fields=comments,messages" \
  -d "access_token=<Step 4 ka token>"
```

**Expected result** *(dono ka ek hi)*:
```json
{"success": true}
```

> 🧑 Graph API Explorer ab teen hosts support karta hai — `graph.facebook.com`, `graph.instagram.com`, aur `graph.threads.net`. Host badalna **na bhoolein**: default `facebook.com` par ye call kaam nahi karegi.

> ⚠️ **Ye lesson ka sab se zyada chhoot jane wala step hai.** Step 10 mein tick karna sirf **app** ko batata hai ke kaunse events chahiyen. Ye call **account** ko us app se jorti hai. Ye na chalayein to callback URL verified rahega, fields ticked rahenge — aur **ek bhi event nahi aayega.**

🗣️ Farq yun samjhein: Step 10 akhbar walay ko aap ka pata dena hai. Step 11 subscription shuru karwana hai. Pehle ke baghair akhbar kahan aaye, doosre ke baghair aaye hi na.

---

### Part D — Go Live and Test

#### Step 12 — Switch the App to Live

🧑 App dashboard → upar **App Mode** → **Development** se **Live**

**Expected result:** toggle Live par aa jata hai.

> ⚠️ **Development mode mein Meta ek bhi webhook nahi bhejta** — na comment ka, na DM ka. Baqi sab kuch theek hone ke bawajood khamoshi rehti hai. Meta ki doc: *"Your app must be set to Live in the App Dashboard for Meta to send webhook notifications."*

> 🧑 **App Review yahan zaroori nahi.** Wo tab lagta hai jab doosre log — jinka aap ki app par koi role nahi — apne accounts connect karein. Apne ya tester accounts ke liye Live toggle hi kaafi hai.

---

#### Step 13 — Test with a Real Event

🧑 **Doosre Instagram account se:**
1. Apni kisi post par **comment** karein
2. Thora ruk kar ek **DM** bhejein

**Expected result:** n8n → **Executions** tab → dono ke liye alag execution, aur webhook node ke output mein poora payload:

```json
{
  "object": "instagram",
  "entry": [{
    "id": "<aap ka Instagram account ID>",
    "changes": [{
      "field": "comments",
      "value": { "id": "...", "text": "...", "from": { ... } }
    }]
  }]
}
```

`[screenshot: 05-execution-with-real-event.png — capture on recording day]`

**Yahan pohanch gaye — setup mukammal hai.**

> 🧑 Comment **doosre** account se karein. Apne hi account se test karne par nateeja gumraah kar sakta hai.

---

## 6. Verification Checklist

Har item **apni screen par dekh kar** tick karein:

- [ ] Instagram Tester invite phone par **accept** ho chuka hai
- [ ] Token mil gaya, aur usmein `instagram_business_manage_comments` aur `_manage_messages` dono hain
- [ ] App settings → Basic mein Privacy Policy URL aur Data Deletion URL **bhare hue** hain
- [ ] n8n workflow **Active** hai
- [ ] Meta mein **Production URL** daala hai (Test URL nahi)
- [ ] Callback URL par **green tick** aaya
- [ ] `comments` aur `messages` dono fields ticked hain
- [ ] Subscribe call ne `{"success": true}` diya
- [ ] App Mode **Live** hai
- [ ] Doosre account ke **comment** par n8n mein execution aayi
- [ ] Doosre account ke **DM** par bhi execution aayi

Aakhri do tick ho gaye — webhook waqai chal raha hai.

---

## 7. Troubleshooting

Ye woh masail hain jo is setup ke doran waqai pesh aaye:

| Error / Symptom | Cause | Solution |
|-----------------|-------|----------|
| Callback URL par **Verify and Save** fail | Verify token dono jagah alag hai, ya `hub.challenge` wapas nahi ja raha | Token hu-ba-hu milaayein; Respond node **Text** mode mein sirf number bheje |
| Verification fail — endpoint 404 | Workflow **Active** nahi, ya Test URL diya hua hai | Workflow activate karein, Production URL dobara paste karein |
| Callback verified, fields ticked — **phir bhi koi event nahi** | Subscribe call nahi chalayi (Step 11) | `POST /me/subscribed_apps` chalayein, `{"success": true}` ka intezar karein |
| Sab kuch theek — **phir bhi khamoshi** | App **Development mode** mein hai | App Mode → **Live** |
| Live karte waqt: `Invalid Privacy Policy URL` | App settings → Basic mein Privacy Policy URL khali hai | Public HTTPS page ka link daalein (GitHub Pages muft hai) |
| Token generate nahi ho raha | Instagram Tester invite accept nahi hua | 📱 Instagram app → Apps and Websites → Tester Invites → Accept |
| Event n8n tak aata hai lekin **webhook node ke aage kuch nahi chalta** | `multipleMethods` ne do output banaye — POST doosre output par girta hai, jo juda hua nahi | Output 1 (POST) ko bhi jorein — tafseel `n8n Webhooks & MCP` Lesson 02 mein |

---

## 8. Best Practices

1. **Test the handshake before subscribing anything.** A green tick on the callback URL proves your endpoint answers correctly; everything after that assumes it does.
2. **Keep the verify token in one place only.** It lives in your workflow. Writing it into notes or a second document is how the two copies drift apart and verification starts failing.
3. **Always test from a second account.** Your own activity behaves differently from a real visitor's, and a test that passes for the wrong reason is worse than one that fails.
4. **Fill the Privacy Policy and Data Deletion fields even when nobody will read them.** For your own account they are a formality; for a client's app they are what App Review checks first.
5. **Treat "no error" as no evidence.** Most failures here are silent — Meta simply sends nothing. The only proof the setup works is an execution appearing after a real comment.

---

## 9. Summary

1. Instagram webhooks need three things switched on together: a verified callback URL, a subscribed account, and an app in Live mode.
2. The verification handshake is a single GET — echo `hub.challenge` back as plain text and nothing else.
3. Ticking fields in the dashboard subscribes the **app**; the `/me/subscribed_apps` call subscribes the **account**. Both are required.
4. Development mode delivers no webhooks at all, which is why a correct setup can still look completely dead.
5. Facebook Page, App Review and Business Verification are not needed for your own account — only the Live toggle is.

---

## 10. Interview Points

**Q: What is the webhook verification handshake?**
A: Meta sends a GET with `hub.mode`, `hub.verify_token` and `hub.challenge`. The endpoint checks the token and echoes the challenge value back as plain text, which proves the endpoint belongs to the developer.

**Q: A callback URL is verified and the fields are ticked, but no events arrive. What is missing?**
A: Most likely the `/me/subscribed_apps` call — dashboard fields subscribe the app, that call subscribes the account. The other common cause is the app still being in Development mode.

**Q: Does receiving Instagram webhooks require a Facebook Page?**
A: Not on the Instagram Login path. That path works on an Instagram professional account alone; only the Facebook Login path routes through a Page.

---

## 11. Sources

| Source | Used for | Verified |
|--------|----------|----------|
| [Instagram Platform — Webhooks](https://developers.facebook.com/docs/instagram-platform/webhooks) | Handshake fields, `subscribed_apps` endpoint, required scopes, Live-mode requirement | 2026-08-03 |
| [Instagram API with Instagram Login — Get Started](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/get-started) | Dashboard token generation, 60-day lifetime | 2026-08-03 |
| [Meta — App Modes](https://developers.facebook.com/docs/development/build-and-test/app-modes/) | When App Review is and is not required | 2026-08-03 |
| [Meta — Data Deletion Callback](https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback/) | Instructions URL vs callback URL | 2026-08-08 |
| Live setup on the author's own Instagram account and n8n instance | Every step, error message and gotcha in this lesson | 2026-08-03 to 2026-08-05 |

> Every error message in this lesson was produced during the real setup — none are reconstructed from memory.
>
> One exception worth naming: the subscribe call in Step 11 was run with **curl** (Option B). Option A uses the Graph API Explorer, whose support for the `graph.instagram.com` host is confirmed, but that specific POST was not run there during testing.

---

**Next Lesson →** [Lesson 02 — Auto-Reply to Comments and DMs](./lesson-02.md)

**Agentive Solutions** · [YouTube](https://www.youtube.com/@SolutionsWithShahzain) · [GitHub](https://github.com/Shahzain-Ali) · [LinkedIn](https://linkedin.com/in/shahzain-ali1) · [Instagram](https://instagram.com/shahzainalibangash1) · [Facebook](https://facebook.com/shahzainalibangash1)
