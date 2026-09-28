# Client Playbook — Websites for Local Businesses

How I sell, price, build, and retain small-business websites (PGs, salons, clinics, coaches). Copy-paste ready.

## 1. Pricing (INR, 2026)

| Package | Price | Includes | Timeline |
|---|---|---|---|
| Starter | ₹8,000–15,000 | 1–5 page site, contact buttons, WhatsApp, map, basic SEO, hosting+domain setup | 3–5 days |
| Business (this PG build) | ₹25,000–45,000 | Everything in Starter + booking/inquiry forms, admin panel, callback lead flow, hosting + domain + launch | 10–15 days |
| Business+ | ₹50,000–80,000 | Business + payments advance (UPI/Razorpay), reviews/testimonials system, Hindi+English, analytics dashboard | 3–4 weeks |

Care plans (monthly, the real income):
| Plan | Price/mo | Includes |
|---|---|---|
| Essential | ₹1,500–2,500 | content edits (prices/photos/hours), uptime check, domain/SSL renewals handled, backup |
| Growth | ₹3,000–5,000 | Essential + monthly inquiry summary, 1 improvement/mo, review-request setup, priority 48-hr fixes |

Terms: 50% advance, 50% on go-live. Content deadline in writing (photos/text late = timeline shifts). Month 1 care free with Business+, then paid. Client owns domain/hosting logins; I hold documented access. 30-day exit with full handover.

## 2. Intake form (WhatsApp this)

> Hi! To build your website fast, please send:
> 1. Business name + one-line intro
> 2. Exact address + Google Maps pin/link
> 3. Phone/WhatsApp number + email + working hours
> 4. Services + prices (as text is fine)
> 5. 10–20 real photos (rooms/products/work) — phone photos OK
> 6. Logo if you have one (else I'll make a simple mark)
> 7. 2–3 customer names + their feedback I can quote
> 8. Where should inquiries go (which WhatsApp/email, who replies)?
> 9. Booking with dates needed, or just callback requests?
> 10. Do you own a domain? If yes, who has the login?
> 11. 2–3 websites you like the look of
> 12. Anything customers always ask you? (I'll put it in FAQ)

## 3. Discovery questions (call, 15 min)
- Who is your best customer? (student/working pro/family…)
- What makes you better than the place next door?
- How do customers find you today? What % comes from Google/WhatsApp/walk-in?
- Who answers inquiries, and how fast?
- One thing the website must do in month 1? (calls, bookings, trust…)

## 4. Management pitch (say this, not "maintenance")
> "One missed booking a month costs you more than my care plan. I keep your number, prices and photos current, make sure the booking form and site stay up, renew the domain/SSL on time, and send you a monthly inquiry summary. Anything breaks, I fix it within 48 hours. You own everything; I just run it. First month free — if it's not worth it, walk away with everything."

Proof to show live: homepage → booking submit → admin inbox entry → WhatsApp follow-up draft.

## 5. Build checklist (per client, from PROJECT_CONTEXT.md)
1. Copy repo; re-skin colors, favicon, wordmark, copy.
2. Set contact phone, WhatsApp texts, address, map query/pin.
3. Swap illustrations for `public/images/*` real photos; update seed.
4. New DB (`db push` + seed with new admin creds); new Vercel project + `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`.
5. Point DNS; verify preview fully (booking → admin → inquiry) before switching.
6. Add LocalBusiness schema; claim Google Business Profile for them (upsell).

## 6b. US clients — USD tier + outreach
| Package | Price (USD) | Notes |
|---|---|---|
| Starter | $500–1,200 | same scope as INR Starter |
| Business | $1,500–4,000 | booking/admin like this PG build |
| Care | $100–300/mo | same care scope, 48-hr fixes |

Payments: Wise or Stripe to India, 50% upfront. Keep 2–3 hrs US-evening overlap for calls. Portfolio demo + video walkthrough closes deals.

Email template:
> Subject: Your website (quick idea for [Business])
> Hi [Name], I build websites for local businesses and noticed [one specific issue on their site/no site]. I made booking-ready sites for similar businesses — live demo here: [link]. Starter rebuilds run $500–1,200, done in ~2 weeks, you own everything. Want a free homepage mockup this week?

Follow-up (4 days): short bump + mockup offer. Track: sent → reply → mockup → call → advance.

## 6. Red flags (walk away or charge more)
- No photos and won't take any. No decision-maker on calls. Wants "just like OYO app" for ₹10k. Won't pay advance. Asks for login passwords over chat.
