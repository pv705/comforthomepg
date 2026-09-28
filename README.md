# Comfort Home PG - Full-Stack Website

A modern, professional full-stack website for Comfort Home PG (Paying Guest accommodation in Sarita Vihar, New Delhi).

## Tech Stack

- **Frontend:** Next.js 15 (App Router) + React 19 + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** MySQL (via Prisma ORM)
- **Auth:** NextAuth.js (Credentials Provider)
- **Deployment:** Vercel (free tier)

## Features

### Public Website
- Responsive, modern UI with hero section, rooms & rates, gallery, amenities, location
- Real-time room availability
- Multi-step booking form with date selection
- Inquiry/contact form
- WhatsApp integration
- SEO optimized

### Admin Dashboard (`/admin`)
- Secure login (NextAuth.js)
- Dashboard with stats overview
- Bookings management (view, confirm, cancel)
- Rooms management (CRUD, pricing, availability, photos)
- Inquiries management (view, mark as contacted/resolved)

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL database (Aiven free tier or local)

### Setup

1. **Clone and install:**
   ```bash
   cd comforthomepg
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database URL and other credentials.

3. **Set up database:**
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Access the site:**
   - Website: http://localhost:3000
   - Admin: http://localhost:3000/admin
   - Default admin login: `admin@comforthomepg.in` / `admin123`

## Deployment

### Vercel (Recommended - Free)
1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy!

### Database (Aiven - Free Tier)
1. Create account at [aiven.io](https://aiven.io)
2. Create a free MySQL service
3. Copy connection string to `DATABASE_URL`

## Project Structure

```
comforthomepg/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Seed data
├── src/
│   ├── app/
│   │   ├── page.tsx       # Home page
│   │   ├── booking/       # Booking page
│   │   ├── contact/       # Contact page
│   │   ├── admin/         # Admin dashboard
│   │   └── api/           # API routes
│   ├── components/        # React components
│   ├── lib/               # Utilities
│   └── middleware.ts      # Auth protection
├── public/                # Static assets
└── package.json
```

## Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | MySQL connection string |
| `NEXTAUTH_URL` | Your app URL |
| `NEXTAUTH_SECRET` | Random secret key |
| `RESEND_API_KEY` | Email API key (optional) |
| `EMAIL_FROM` | Sender email address |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |

## License

Private - All rights reserved.
