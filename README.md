# Nivara Product Hub

Nivara Product Hub is the internal catalog for Nivara AI solutions, built with Next.js + Supabase and protected by role-based access control.

Live site: [https://nivara.dev](https://nivara.dev)

## What It Does

- Authenticated access with Supabase Auth
- Approval-gated onboarding (`approved` users only)
- Product catalog dashboard with search and sector filters
- Product detail pages with role-based visibility
- External users restricted to explicitly granted products
- Admin navigation ready for Users and Invites management

## Roles and Access

Supported roles:

- `admin`
- `team_tech`
- `team_business`
- `external`

Access behavior:

- `admin`, `team_tech`, `team_business` can see all products in the dashboard
- `external` can see only products granted in `product_access`
- Architecture and repository links are visible only to technical/admin roles
- Pitch content is visible to admin/business roles

## Tech Stack

- Next.js 15 (App Router)
- TypeScript 5.7
- React 19
- Tailwind CSS v4
- Supabase Auth + PostgreSQL
- Lucide React
- Vercel deployment

## Data Model (Core Tables)

- `user_profiles`
- `products`
- `product_access`
- `invite_links`

The `products` table is seeded with:

- `lobby-ai`
- `nina`
- `bally`
- `tender-ai`
- `artimino`
- `fiee`
- `nivara-os`
- `nivara-hr`

## Local Development

### Prerequisites

- Node.js 20+
- Supabase project with required schema

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Run

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## CI/CD

- CI: GitHub Actions workflow at `.github/workflows/ci.yml` (type-check + production build)
- CD: production deploys on Vercel from `main`

## Security

Please read [Security Policy](.github/SECURITY.md) for vulnerability reporting and response process.

## License

Proprietary - (c) Nivara AI. All rights reserved.
