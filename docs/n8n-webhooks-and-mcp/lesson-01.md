---
id: lesson-01
sidebar_position: 1
sidebar_label: "Lesson 01 — Connect n8n Cloud MCP to Claude Code"
description: "Connect your n8n Cloud instance to Claude Code over n8n's instance-level MCP server, and prove the connection works."
---

# Lesson 01 — Connect n8n Cloud MCP to Claude Code

**Book:** n8n Webhooks & MCP
**Lesson:** 1
**Type:** Implementation guide
**Prerequisites:** An n8n Cloud instance where you are the owner or an admin · Claude Code installed
**Facts verified:** August 2026 (n8n instance MCP — Public Preview)

---

## Table of Contents

1. [What You'll Learn in This Lesson](#1-what-youll-learn-in-this-lesson)
2. [Before You Start](#2-before-you-start)
3. [Three Terms You Need First](#3-three-terms-you-need-first)
4. [Step-by-Step Implementation](#4-step-by-step-implementation)
5. [Verification Checklist](#5-verification-checklist)
6. [Troubleshooting](#6-troubleshooting)
7. [Summary](#7-summary)
8. [Sources](#8-sources)

---

## 1. What You'll Learn in This Lesson

- [ ] Enable MCP access on an n8n Cloud instance
- [ ] Register the n8n MCP server with Claude Code and complete the OAuth authorisation
- [ ] Enable MCP access on an individual workflow
- [ ] Verify the connection by reading a real workflow from the terminal

---

## 2. Before You Start

Ye guide sirf **connection** banati hai. Neeche wali cheezein pehle se honi chahiyen:

| # | Cheez | Kyun darkar hai |
|---|-------|-----------------|
| 1 | **n8n Cloud instance** jismein aap owner ya admin hain | Ye setting sirf owner/admin ko nazar aati hai |
| 2 | **Claude Code** installed | Yehi MCP client hai |
| 3 | **Kam az kam ek workflow** us instance par | Verification isi se hogi |

> 🧑 Aap ke paas Cloud nahi, **self-hosted Docker** hai? Wo alag setup hai — **Lesson 03** us ke liye hai.

---

## 3. Three Terms You Need First

Sirf teen lafz — inke baghair steps mein confusion hoti hai.

### Instance

> **Instance:** one running copy of n8n that belongs to you — your workflows, your credentials, your URL.

> 🗣️ **Roman Urdu:** Aap ka apna chalta hua n8n. Cloud par wo `<naam>.app.n8n.cloud` hota hai.

Ek shakhs ke do instance ho sakte hain — Cloud par ek, Docker par doosra:

```
Aap
 ├── Cloud instance    →  <naam>.app.n8n.cloud
 └── Docker instance   →  localhost:5678
```

### MCP server

> **MCP server:** an endpoint your n8n instance exposes so an MCP client — such as Claude Code — can read and edit the workflows inside it.

> 🗣️ **Roman Urdu:** Aap ke instance par ek darwaza, jahan se Claude Code andar ja kar workflows parh aur badal sakta hai. Is se pehle JSON export kar ke Import from File karna parta tha — ye us chakkar ko khatam kar deta hai.

### Do alag "MCP" — inhe mat milayein

| | **Instance MCP server** *(ye lesson)* | **MCP Server Trigger node** |
|---|---|---|
| Rukh | Claude Code → **n8n ko** hukum | n8n → **AI ko** tools |
| Maqsad | AI aap ki workflows **banaye** | AI aap ki workflow **chalaye** |
| Kahan | Settings → Instance-level MCP | Workflow canvas par node |

> 🗣️ **Roman Urdu:** Pehla wo hai jahan Claude Code aap ke n8n ko chalata hai. Doosra wo jahan aap ki workflow kisi AI ko apne tools deti hai. **Rukh ulta hai.**

### Teen switch — teenon on hone chahiyen

```
     Claude Code                      n8n Cloud
   ┌──────────────┐            ┌─────────────────────┐
   │              │──── ① ────▶│  ② instance-level   │
   │  MCP client  │            │       MCP           │
   │              │            │         │           │
   │              │            │         ▼           │
   │              │            │  ③ har workflow     │
   └──────────────┘            └─────────────────────┘
```

| # | Switch | Kahan |
|---|--------|-------|
| ① | Server register | Terminal — `claude mcp add` |
| ② | Instance-level MCP | n8n → Settings |
| ③ | Us workflow ka MCP access | Workflow card |

⚠️ ② kar ke ③ bhool jana sab se aam ghalti hai — connection ban jata hai, workflow phir bhi nazar nahi aati.

---

## 4. Step-by-Step Implementation

### Step 1 — Instance-level MCP enable karein

🧑 n8n Cloud → **Settings** → **Instance-level MCP** → **Enable MCP access** toggle ON

**Expected result:** toggle green, aur connection details ka panel khul jata hai jismein server URL hai.

`[screenshot: 01-instance-level-mcp-toggle.png — capture on recording day]`

> ⚠️ Ye option na dikhe to aap **owner/admin nahi** hain. Role check karein.

---

### Step 2 — Server URL copy karein

Panel se URL lein. Shakl ye hogi:

```
https://<aap-ka-instance>.app.n8n.cloud/mcp-server/http
```

**Expected result:** URL `/mcp-server/http` par khatam hota hai.

> ⚠️ Na `/api/v1` lagayein, na koi aur suffix. Wo REST API ka path hai — MCP ka nahi.

---

### Step 3 — Claude Code mein server register karein

📋 Terminal mein:

```bash
claude mcp add --transport http n8n-cloud https://<aap-ka-instance>.app.n8n.cloud/mcp-server/http
```

**Expected result:**
```
Added HTTP MCP server n8n-cloud with URL: ... to local config
```

> ⚠️ Naam **`n8n-cloud`** rakha hai, `n8n-mcp` nahi. Agar aap pehle se koi `n8n-mcp` server istemal karte hain, wohi naam dobara likhne se purana **overwrite** ho jayega.

---

### Step 4 — Claude Code restart karein

🧑 Claude Code band karein, dobara kholein.

**Expected result:** kuch nazar nahi aayega — lekin server ab load ho chuka hai.

> ⚠️ **Ye qadam chhorna sab se aam ghalti hai.** `claude mcp add` sirf config file mein likhta hai. Chalta hua session naye server ko utha nahi sakta.

---

### Step 5 — OAuth authorisation

🧑 `/mcp` type karein → `n8n-cloud` chunein → **Authenticate** → browser mein **Authorize**

**Expected result:** browser *"Authentication successful"* kehta hai, aur Claude Code mein `n8n-cloud` ke tools aa jate hain.

`[screenshot: 02-oauth-authorize-screen.png — capture on recording day]`

> ⚠️ **Jo permissions maangi jati hain unmein `credential:read` bhi hai** (credentials ki list — naam aur type). Client ke instance par karte waqt ye list unhe **pehle** dikha dein.

> 💡 Settings mein ek **"Allowed OAuth Redirect URLs"** khana bhi hota hai. Ye batata hai ke Authorize ke baad n8n kis pate par wapas bhej sakta hai. **Chhune ki zaroorat nahi** — default localhost ko cover kar leta hai, aur Claude Code localhost hi istemal karta hai.

---

### Step 6 — Us workflow ka MCP access on karein

🧑 n8n → **Workflows** → jis workflow par kaam karna hai, us ke card par **⋯** → **Enable MCP access**

*(ya: workflow kholein → upar right **⋯** → Settings → **Available in MCP**)*

**Expected result:** workflow par MCP ka nishan aa jata hai.

`[screenshot: 03-enable-mcp-on-workflow.png — capture on recording day]`

> ⚠️ **Step 1 kar lena kaafi nahi.** Har workflow alag se enable karni parti hai. Warna Claude Code kehta hai:
> ```
> Workflow is not available in MCP.
> ```

---

### Step 7 — Connection tasdeeq karein

📋 Claude Code mein:

```
List my n8n workflows
```

**Expected result:** aap ki workflows ki fehrist — naam, ID, active/inactive.

📋 Phir:

```
Show me the details of <workflow ka naam>
```

**Expected result:** us workflow ke nodes aur connections nazar aate hain.

`[screenshot: 04-list-workflows-from-terminal.png — capture on recording day]`

**Yahan pohanch gaye — connection mukammal hai.**

---

## 5. Verification Checklist

Har item **apni screen par dekh kar** tick karein:

- [ ] Instance-level MCP ka toggle **green** hai
- [ ] Server URL `/mcp-server/http` par khatam hota hai
- [ ] `claude mcp add` ne *"Added HTTP MCP server"* kaha
- [ ] Claude Code **restart** ho chuka hai
- [ ] `/mcp` mein `n8n-cloud` **connected** dikhta hai
- [ ] Jis workflow par kaam karna hai, us par **MCP access on** hai
- [ ] *"List my n8n workflows"* par **asli fehrist** aayi — khali nahi
- [ ] *"Show me the details of &lt;workflow&gt;"* par **nodes nazar aaye**

Aakhri do tick ho gaye — connection waqai chal raha hai.

---

## 6. Troubleshooting

Ye woh masail hain jo is setup ke doran waqai pesh aaye:

| Error / Symptom | Cause | Solution |
|-----------------|-------|----------|
| `/mcp` mein server nazar hi nahi aata | Restart nahi hua | Claude Code band kar ke dobara kholein |
| Server dikhta hai lekin connected nahi | OAuth mukammal nahi hui | `/mcp` → server → **Authenticate** → browser mein Authorize |
| `Workflow is not available in MCP` | Us workflow ka MCP access off hai | Workflow card → ⋯ → Enable MCP access |
| `MCP server n8n-cloud already exists in local config` | Pehle se added hai | Dobara add na karein — sirf restart |
| Server `connected` dikhta hai lekin call fail hoti hai | `/mcp` sirf ye batata hai ke Claude Code ke paas token **mehfooz** hai — ye nahi ke wo token abhi bhi **jaiz** hai | Koi asli call chala kar dekhein — "connected" par bharosa na karein |
| `MCP server "n8n-cloud" requires re-authorization (token expired)` | Token expire ho gaya, **ya** aap ne n8n mein access **revoke** kar diya | `/mcp` → `n8n-cloud` → **Authenticate** dobara |
| Workflow update kiya, live behaviour purana | Update **draft** mein gaya | Workflow **publish** karein — n8n mein publish alag qadam hai |
| Execution ka data khali aata hai | n8n MCP clients se execution data redact karta hai | Asli values n8n ke **Executions** tab mein dekhein |

---

## 7. Summary

1. Three switches must all be on: the server registered in Claude Code, instance-level MCP enabled, and MCP access enabled on the specific workflow.
2. Registering the server is not enough — Claude Code must be restarted, and OAuth must be completed.
3. "Connected" in `/mcp` only proves the client reached the server. Prove the rest by reading a real workflow.
4. This feature is in Public Preview — review anything it generates before it touches production.

---

## 8. Sources

| Source | Used for | Verified |
|--------|----------|----------|
| [n8n Docs — Connect to n8n MCP server](https://docs.n8n.io/connect/connect-to-n8n-mcp-server) | Enable path, `claude mcp add` command, OAuth flow | 2026-08-03 |
| Live setup on the author's own n8n Cloud instance | Every step, error message and gotcha in this lesson | 2026-08-03 to 2026-08-05 |

> Every command and error message in this lesson was produced on a real instance during setup — none are reconstructed from memory.

---

**Next Lesson →** Lesson 02 — n8n Webhook Node Deep Dive *(coming soon)*

**Agentive Solutions** · [YouTube](https://www.youtube.com/@SolutionsWithShahzain) · [GitHub](https://github.com/Shahzain-Ali) · [LinkedIn](https://linkedin.com/in/shahzain-ali1) · [Instagram](https://instagram.com/shahzainalibangash1) · [Facebook](https://facebook.com/shahzainalibangash1)
