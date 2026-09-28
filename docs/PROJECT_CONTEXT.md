# Comfort Home PG — Project Context (reusable blueprint)

Last updated: 2026-09-29. Stack: Next.js 15 (App Router) + React 19 + Tailwind 3 + Prisma 6 + MySQL + NextAuth 4 (credentials) + Zod. Hosting: Vercel Hobby (free). DB: Aiven MySQL (free tier). Domain: GoDaddy (`comforthomepg.in`), DNS hosted on Netlify (`*.nsone.net`) — edit records in Netlify DNS, not GoDaddy. Repo: `pv705/comforthomepg`, branch `main`, auto-deploys to Vercel.

## 1. What this is
Full-stack PG website: public site (home, rooms, booking, contact) + admin panel (`/admin`: dashboard, bookings, rooms, inquiries) + JSON APIs. Lead flow: dismissible name+phone callback dialog (once per tab via sessionStorage) → POST `/api/inquiries` → admin Inquiries list. WhatsApp opens a prefilled draft (visitor taps Send; page views send nothing). No payment integration. No email service (removed `resend`), no image CDN (removed Cloudinary) — keep it free and light.

## 2. Repo layout
- `src/app/page.tsx` — homepage (server, `force-dynamic`, reads rooms via Prisma directly; falls back to static room guide if DB down; never invents availability)
- `src/app/booking/page.tsx` — booking form (client, honeypot, guards non-array API responses)
- `src/app/contact/page.tsx` — static contact page with LeadButtons (no form on page)
- `src/app/admin/{login,dashboard,bookings,rooms,inquiries}` — admin UI (all `force-dynamic`; layout wraps SessionProvider; middleware also protects `/admin/*`)
- `src/app/api/{rooms,bookings,inquiries,availability,admin/*,auth/[...nextauth]}` — REST routes
- `src/components/{LeadCapture,RoomIllustration,Reveal,RoomCard,Navbar,Footer,WhatsAppButton,admin/Sidebar}.tsx`
- `src/lib/{prisma,authOptions,auth,contact,inquiry-validation,request-body,utils}.ts`
- `prisma/{schema.prisma,seed.js}` — MySQL schema + seed (3 rooms, admin user)
- `src/app/icon.svg` — favicon (`ch` mark). `next.config.js` — images + security headers.

## 3. Environment variables (names only — never commit values)
| Var | Where | Notes |
|---|---|---|
| `DATABASE_URL` | local `.env` + Vercel Production | `mysql://avnadmin:<pw>@<aiven-host>:10794/defaultdb`. Vercel UI once showed empty/placeholder — must hold the real string or builds/APIs fail |
| `NEXTAUTH_URL` | Vercel Production | Must be `https://comforthomepg.in`. Empty value caused `Invalid URL input: ''` prerender crash on `/admin/login` |
| `NEXTAUTH_SECRET` | local + Vercel | Random base64. Rotate if ever screenshared |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | local seed only | Seed defaults `admin@comforthomepg.in` / `admin123`; change after first login (no in-app change-password UI yet) |

`.env` is git-ignored and was never committed (verified). Do not paste secrets in chat/screenshots.

## 4. Database
Models: `Room` (amenities stored as JSON string; images via `RoomImage`), `Booking` (Pending/Confirmed/Cancelled + overlap check), `Inquiry` (New/Contacted/Resolved), `AdminUser` (bcrypt hash). Setup: `npm install` → fill `.env` → `npx prisma db push` → `npm run db:seed` → `npm run dev`. Build runs `prisma generate && next build` (generate must precede build on Vercel).

## 5. API surface
| Method | Route | Auth | Notes |
|---|---|---|---|
| GET | `/api/rooms`, `/api/rooms/[id]` | public | listings |
| POST/PUT/DELETE | `/api/rooms…` | admin only | 401 unauth (fixed post-review) |
| GET/POST | `/api/bookings` | public POST (zod) | overlap check; GET used by admin dashboard (session cookie) |
| GET/PATCH | `/api/bookings/[id]` | admin only | GET exposes guest PII — guarded |
| GET | `/api/availability` | public | date overlap check |
| POST | `/api/inquiries` | public | zod + 12KB body cap + origin check + honeypot + 3-per-10min per phone; returns `{success:true}` only (no PII echo) |
| GET/PATCH/DELETE | `/api/inquiries…` | admin only | PATCH validates status enum + numeric id; latest 200 |
| … | `/api/auth/[...nextauth]` | — | credentials provider; `authOptions` lives in `src/lib/authOptions.ts` (route file must export only handlers or Next build fails) |

## 6. Key fixes already applied (don't regress)
1. `authOptions` moved out of route file (Next route-type error).
2. Admin pages + login marked `force-dynamic` (prerender `Invalid URL` crash).
3. `SessionProvider` added in admin layout (useSession without provider crashed prerender).
4. Client lists guard `Array.isArray` (API error object → `.map` white-screen on `/booking`).
5. `target="_blank"` all carry `rel="noopener noreferrer"`; security headers in `next.config.js`; Zod on bookings/inquiries; honeypot on forms.
6. Public pages show no PG phone digits as text (verified 0 hits in home HTML); number lives only in link targets + admin views.
7. Stock photos removed from public pages; `RoomIllustration` variants per type (`single|double|triple`); captions state "illustration".
8. Old Google-Maps embed removed (wrong coords); area link + "request exact pin" pattern. **Still needed: exact property pin/plus-code from owner.**

## 7. Deploy & DNS (frozen state)
- Vercel project `comforthomepg` ← GitHub `pv705/comforthomepg` `main`, auto-deploy on push. Promote the newest Ready build to Production if a stale redeploy is Current (happened: `a848a9c` served while `dddc4a2` sat non-current).
- Custom domain NOT yet switched (fallback plan): live domain still serves old Netlify static site. To switch: Netlify DNS → `A @ 76.76.21.21`, `CNAME www cname.vercel-dns.com` → Vercel Domains → Refresh. Rollback: re-add domain alias in Netlify project `silver-jalebi-dfb5ae`.
- Never delete the old Netlify project until the Vercel production URL is fully verified (home, booking submit, admin approve, inquiry).

## 8. Test checklist (local: `npm run dev -- --port 3001`)
- `GET /` 200, no phone digits, no unsplash in HTML
- `POST /api/inquiries` invalid phone → 400; honeypot → 400; text/plain → 415
- `GET /api/inquiries`, `POST /api/rooms`, `PATCH /api/bookings/1`, `DELETE /api/inquiries/1` unauth → 401
- `GET /api/rooms` 200; `/booking`, `/contact`, `/admin/login` 200
- Booking submit → success screen; admin login → approve → status flips
- Dialog: opens once/tab, ×/Escape/buttons close, focus returns, reduced-motion respected

## 9. Reuse for next client (paid template)
1. Copy repo; re-skin `tailwind.config` brand colors, `icon.svg`, wordmark, copy.
2. Replace `contactPhone`, WhatsApp messages, address, map query.
3. Swap `RoomIllustration` or add `public/images/*` + update `RoomCard`/seed image URLs.
4. New Aiven DB + `db push` + `db:seed` (change admin creds); new Vercel project + 3 env vars; point DNS.
5. Keep deferred list: in-app password change, email/SMS notifications, payment for deposits, real-photo pipeline, exact map pin component.

## 10. Known deferred
- `npm audit`: 5 vulns (postcss via next) need breaking `next@16`; deferred (build-time advisory, no runtime exploit).
- Real property photos + exact map pin still owed by owner.
- No automated tests; verification is build + curl + manual preview.
