---
id: lesson-02
sidebar_position: 2
sidebar_label: "Lesson 02 — Setting Up n8n: Cloud vs Self-Hosted"
description: "n8n Mastery Lesson 02 — Setting Up n8n: Cloud vs Self-Hosted"
---

# Lesson 02 — Setting Up n8n: Cloud vs Self-Hosted

**Course:** n8n Complete Course (Zero to AI Automation Expert)
**Module:** 1 — Foundations · **Video:** ~15 min
**Prerequisites:** Lesson 01 (automation, trigger + steps ka concept)
**Facts verified:** July 2026 (sources end mein)

---

:::info 🎥 Video Lesson
Video coming soon — the YouTube embed will appear here once this lesson is published on the SolutionsWithShahzain channel.
:::

## 🖥️ Slides — Teaching Aid

<iframe
  src="/agentive-solutions-book/resources/n8n-mastery/lesson-02/slides.pdf"
  width="100%"
  height="480"
  title="Lesson 02 — Slides"
  style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: '8px'}}
></iframe>

<p>
  <a href="/agentive-solutions-book/resources/n8n-mastery/lesson-02/slides.pdf" target="_blank" rel="noopener noreferrer">🖥️ Fullscreen</a> · <a href="/agentive-solutions-book/resources/n8n-mastery/lesson-02/slides.pptx">⬇️ Download (PowerPoint)</a>
</p>

---

## Table of Contents

1. [What You'll Learn in This Lesson](#1-what-youll-learn-in-this-lesson)
2. [Two Ways to Run n8n](#2-two-ways-to-run-n8n)
3. [Cloud or Self-Hosted — The Decision](#3-cloud-or-self-hosted--the-decision)
4. [What is an "Instance"?](#4-what-is-an-instance)
5. [Step-by-Step: Creating Your n8n Cloud Account](#5-step-by-step-creating-your-n8n-cloud-account)
6. [The Free Trial — Honest Reality](#6-the-free-trial--honest-reality)
7. [Real-World Scenario](#7-real-world-scenario)
8. [Common Beginner Mistakes](#8-common-beginner-mistakes)
9. [Best Practices & Industry Tips](#9-best-practices--industry-tips)
10. [Troubleshooting](#10-troubleshooting)
11. [Assignment](#11-assignment)
12. [Quick Quiz](#12-quick-quiz)
13. [Summary & Key Takeaways](#13-summary--key-takeaways)
14. [Interview Points](#14-interview-points)
15. [Sources](#15-sources)

---

## 1. What You'll Learn in This Lesson

Is lesson ke end tak aap:

- [ ] Cloud aur self-hosted n8n ka farq samjha sakenge
- [ ] Apne liye sahi option choose kar sakenge (aur kyun)
- [ ] "Instance" ka matlab jaan lenge
- [ ] Apna n8n Cloud account khud bana chuke honge (14-day free trial, no card)
- [ ] Jaan lenge ke trial ke baad kya hota hai — koi surprise nahi

---

## 2. Two Ways to Run n8n

n8n chalane ke sirf 2 tareeqe hain:

### Option 1: n8n Cloud

- n8n ke apne servers per chalta hai — aap sirf browser se login karte ho
- Kuch install nahi karna, kuch maintain nahi karna
- 5 minute mein ready, kisi bhi browser se
- Trial ke baad paid ($24/month Starter — verified July 2026)

### Option 2: Self-Hosted

- Aapke apne computer ya server per chalta hai (Docker ke zariye)
- Free forever — unlimited workflows, unlimited executions
- Updates, backups, security — sab aapki zimmedari
- One-time setup effort (Module 6 mein sath karenge)

### Analogy: Hotel Room vs Apna Ghar 🏨🏠

**Cloud = hotel room:** sab kuch ready, room service milti hai, lekin kiraya har mahine. **Self-hosted = apna ghar:** aapka hai, hamesha ke liye, koi kiraya nahi — lekin bulb bhi aap hi badloge.

> **Docker kya hai?** Abhi ke liye sirf itna: ek tool jo software ko "packaged box" ki tarah kisi bhi computer per chala deta hai. Poora Docker Lesson 37 (Module 6) mein — abhi iski fikar mat karo.

---

## 3. Cloud or Self-Hosted — The Decision

*(Verified July 2026)*

| | **n8n Cloud** | **Self-Hosted** |
|---|---------------|-----------------|
| Setup time | 5 minutes | 1–2 hours (pehli baar) |
| Cost | Free 14 days → $24/mo | Free forever |
| Maintenance | n8n sab sambhalta hai | Aap sambhalte ho |
| Data control | n8n ke servers (EU/US) | 100% aapki machine per |
| Best while | Seekhte waqt, shuruaat mein | Client work, scaling |

### Our Path (is course ka plan)

**Aaj Cloud** (learning ke liye zero friction) → **Module 6 mein Docker self-host** (free forever). Dono seekhoge, sahi waqt per.

Yeh order isliye: agar aaj self-hosting se shuru karo to n8n seekhne ki jagah servers debug karte rahoge. Pehle automation seekho, phir hosting.

---

## 4. What is an "Instance"?

> **Your instance = your own private copy of n8n.**

- Apna address milta hai: `yourname.app.n8n.cloud`
- Aapke workflows, aapka data, aapki credentials — sirf aapke
- Cloud ho ya self-hosted — "instance" ka matlab same

### Analogy: WhatsApp Number 📱

App sab ke paas same hai — lekin aapka number, aapki chats, aapke contacts sirf aapke hain. Koi aur nahi dekh sakta. Instance bhi yehi hai: n8n same, "aapka n8n" alag.

Yeh word yaad rakho — docs, community, aur is course mein har jagah aayega.

---

## 5. Step-by-Step: Creating Your n8n Cloud Account

**Time:** 5 minutes · **Cost:** Free (no credit card)

### Step 1 — Signup Page Kholo

1. Browser mein jao: **n8n.io**
2. Top-right corner mein **"Get started for free"** button click karo
3. Signup form khulega

`[screenshot: signup-page.png — capture on recording day]`

### Step 2 — Account Details Bharo

| Field | Kya Dalna Hai | Note |
|-------|---------------|------|
| Email | Apni REAL email | ⚠️ Temp/fake email mat dalo — verification aayegi |
| Password | Strong password | Password manager use karo |

> Google account se bhi sign up kar sakte ho — jaldi hai, lekin jo bhi use karo, yaad rakho ke aage yehi login method use hoga.

4. **"Create account"** (ya "Sign up") click karo

### Step 3 — Email Verify Karo

1. Apna inbox kholo — n8n ki verification email aayegi (1–2 minute)
2. Email mein **verification link/button** click karo
3. Agar email na aaye → Spam/Promotions folder check karo

**Expected result:** email verify hote hi setup continue hota hai ✅

### Step 4 — Workspace Name Set Karo

1. Workspace/instance ka naam poocha jayega
2. ⚠️ **Yeh naam aapka instance URL banega:** `aapkanaam.app.n8n.cloud` — soch kar rakho (apna naam ya brand name, professional rakho)
3. Naam available hona chahiye — agar taken hai to variation try karo

`[screenshot: workspace-name.png — capture on recording day]`

### Step 5 — Onboarding Questions

1. n8n 2–3 chote sawal poochega (role, company size, use case waghera)
2. Kuch bhi honest select karo — yeh sirf personalization ke liye hai, kuch lock/unlock nahi hota

### Step 6 — Dashboard

**Expected result:** Aap apne dashboard per land karoge — yeh aapka live instance hai ✅

`[screenshot: first-dashboard.png — capture on recording day]`

> **Bas itna hi aaj.** Dashboard ko explore karne ka structured tour agla lesson hai (Lesson 3). Abhi kuch banane ki koshish mat karo.

---

## 6. The Free Trial — Honest Reality

*(Verified July 2026)*

| Fact | Detail |
|------|--------|
| Trial duration | **14 days** — full features |
| Credit card | **Nahi chahiye** trial ke liye |
| After trial | Starter plan **$24/month** (2,500 executions) |

### Trial khatam ho jaye to? (koi surprise nahi)

Do honest options:

1. **Cloud ke paise do** — $24/month (agar tab tak client kaam mil gaya ho to yeh khud pay ho jata hai)
2. **Self-host free mein** — Module 6 mein hum yehi karenge, sath

**Aur aapka kaam kabhi zaya nahi hota:** workflows ek click mein export hote hain (JSON files) aur kisi bhi n8n instance mein import ho jate hain — cloud se self-host migration asaan hai.

**14 din is course ke Module 1–2 ke liye kaafi hain** — timing isi hisaab se design ki hai.

---

## 7. Real-World Scenario

**Scenario:** Aap ek freelancer ho. Client kehta hai: "Mujhe order-confirmation automation chahiye, lekin hamara customer data hamari building se bahar nahi ja sakta (compliance rule)."

**Aapka jawab ab ready hai:** n8n Cloud yahan disqualify ho gaya (data n8n ke servers per jata hai) — **self-hosted n8n** client ke apne server per lagega, data 100% unke paas rahega, aur license cost zero. Yehi ek jumla aapko "sirf tool user" se "consultant" bana deta hai — aur yeh sirf n8n jaise self-hostable tools ke sath possible hai (Zapier/Make yeh offer hi nahi kar sakte).

---

## 8. Common Beginner Mistakes

| Mistake | Sahi Approach |
|---------|---------------|
| Temp/fake email se signup | Verification + account recovery dono tootte hain. Real inbox use karo |
| Pehle din self-hosting ki koshish | Classic complexity trap — hafta servers mein nikal jayega, n8n seekhna zero. Module 6 ka intezar karo |
| "Trial khatam ho jayega" ke dar se shuru na karna | 14 din Module 1–2 cover kar lete hain. Shuru karo |
| Workspace name mein "test123" type naam | Yeh aapka URL hai — professional rakho, clients ko bhi dikh sakta hai |
| Aaj hi dashboard mein sab kuch click karna | UI tour agla lesson hai — structured seekho, random nahi |

---

## 9. Best Practices & Industry Tips

1. **Use a dedicated work email.** Aage credentials, client systems, aur billing isi se judenge — personal spam wale inbox se alag rakho.
2. **Name your workspace like a brand.** `shahzainali.app.n8n.cloud` > `coolguy42.app.n8n.cloud` — clients URL dekhte hain.
3. **Set a calendar reminder for day 12 of the trial.** Do din ka buffer — decide karne ke liye ke continue kaise karna hai (tab tak Module 2 mein hoge).
4. **Bookmark your instance URL.** Roz wahi jana hai — one-click access chahiye.

---

## 10. Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Verification email nahi aayi | Spam filter ya typo | Spam/Promotions folder dekho; email address double-check karo; "Resend" option use karo |
| Workspace name unavailable | Kisi ne le liya | Variation try karo: naam + year, naam + "hq", brand name |
| Signup page load nahi ho raha | Browser extension/VPN interference | Incognito window try karo ya doosra browser |
| "Too many attempts" error | Baar baar retry | 15–30 minute ruko, phir try karo |
| Login ke baad blank/loading screen | Slow connection ya cache | Hard refresh (Ctrl+Shift+R); internet check karo |

---

## 11. Assignment

**Apna n8n instance live karo — agle lesson se pehle.**

1. **Account banao** — n8n.io → free trial (upar ke steps follow karo)
2. **Login karo aur sirf dekho** — kuch banao mat, kuch tordo mat 🙂 (building Lesson 4 mein)
3. **Comment karo apna workspace name** — taake pata chale aap ready ho

*Lesson 1 ka assignment yaad hai? Apne 3 repetitive tasks ready rakho — jald unpe kaam shuru hoga.*

---

## 12. Quick Quiz

Answer first, then check below.

**Q1.** Your friend wants to learn n8n but has zero budget and gets confused by servers. What should they start with?
- (a) Self-hosted on a VPS — free forever
- (b) n8n Cloud free trial — zero setup friction, learn first
- (c) Wait until they learn Docker
- (d) Use Zapier instead

**Q2.** A client's compliance policy says business data cannot leave their own servers. Which n8n setup do you propose?
- (a) n8n Cloud — it's encrypted anyway
- (b) Self-hosted n8n on the client's own server
- (c) n8n Cloud with a strong password
- (d) This is impossible with n8n

**Q3.** Your 14-day trial ended and you built 6 workflows. What happens to your work?
- (a) Deleted permanently — start over
- (b) Locked forever unless you pay
- (c) Workflows export as JSON — import them into Cloud (paid) or a free self-hosted instance
- (d) They automatically convert to Zapier zaps

**Q4.** What does `yourname.app.n8n.cloud` represent?
- (a) n8n's marketing website
- (b) Your instance — your private copy of n8n
- (c) A shared community server
- (d) The n8n documentation site

<details>
<summary><b>Answers (click to reveal)</b></summary>

**Q1: (b)** — Learning phase mein friction kam karna sab se zaroori hai. Self-hosting valuable hai, lekin pehle automation seekhni chahiye, servers baad mein (Module 6).

**Q2: (b)** — Self-hosting ka core value: data ownership. Client ke server per n8n = data kabhi bahar nahi jata. Yehi n8n ka competitive advantage hai Zapier/Make per.

**Q3: (c)** — Workflows JSON files ke tor per export hote hain aur kisi bhi n8n instance mein import — vendor lock-in nahi hai.

**Q4: (b)** — Workspace name se bana URL aapke private instance ka address hai — aapke workflows, data, credentials sirf yahan.

</details>

---

## 13. Summary & Key Takeaways

1. **Two ways to run n8n:** Cloud (fast, managed, paid after trial) vs Self-hosted (free forever, you maintain it)
2. **Our path:** Cloud today for learning → Docker self-hosting in Module 6 — both skills, right order
3. **Instance = your private copy of n8n** with its own URL, workflows, and data
4. **Trial reality:** 14 days, no card, full features — and workflows export as JSON, so nothing is ever lost
5. **Self-hosting is a consulting superpower:** data-sensitive clients can only be served by self-hostable tools

---

## 14. Interview Points

**Q: What deployment options does n8n offer?**
A: Two — n8n Cloud (managed SaaS, subscription-based) and self-hosted (Docker/npm on your own infrastructure, free Community Edition with unlimited executions).

**Q: When would you recommend self-hosting n8n over the cloud version?**
A: When data residency/compliance requires data to stay on-premises, when execution volume makes per-plan pricing expensive, or when full control over updates and infrastructure is needed.

**Q: What is an n8n instance?**
A: A single running copy of n8n with its own URL, database, workflows, and credentials — whether hosted on n8n Cloud or self-hosted.

**Q: Is workflow migration between instances possible?**
A: Yes — workflows export as JSON and import into any other n8n instance, cloud or self-hosted. Credentials must be re-created for security reasons.

---

## 15. Sources

*Facts verified July 12, 2026:*

- Trial & pricing: [n8n.io/pricing](https://n8n.io/pricing/), [Cloud free trial docs](https://docs.n8n.io/manage-cloud/cloud-free-trial/)
- Self-hosting: [docs.n8n.io/hosting](https://docs.n8n.io/hosting/)

---

**← Previous:** [Lesson 01 — What is Automation & Why n8n?](./lesson-01.md)
**Next Lesson →** Lesson 03 — The n8n Interface Tour
*Apne instance ko samajhna seekhenge — canvas, panels, aur woh concept jo sab galat samajhte hain (Save vs Publish).*

---

*n8n Complete Course · SolutionsWithShahzain · [GitHub](https://github.com/Shahzain-Ali/n8n-mastery) · [YouTube](https://www.youtube.com/@SolutionsWithShahzain) · [LinkedIn](https://www.linkedin.com/in/shahzain-ali1/) · [Instagram](https://www.instagram.com/shahzainalibangash1/) · [Facebook](https://www.facebook.com/shahzainalibangash1/)*

---

## Resources

- 📊 **Slides (PDF):** <a href="/agentive-solutions-book/resources/n8n-mastery/lesson-02/slides.pdf" target="_blank" rel="noopener noreferrer">slides.pdf</a>
- 📥 **Slides (PowerPoint):** <a href="/agentive-solutions-book/resources/n8n-mastery/lesson-02/slides.pptx">slides.pptx</a>
- ▶️ **Video:** Coming soon
