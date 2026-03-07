<div align="center">

# Nivara Product Hub

[![CI](https://github.com/nivara-ai/nivara.dev/actions/workflows/ci.yml/badge.svg)](https://github.com/nivara-ai/nivara.dev/actions/workflows/ci.yml)
[![Deploy](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://nivara.dev)
[![License](https://img.shields.io/badge/license-Proprietary-red)]()

**The centralized catalog for Nivara's AI proof-of-concepts.**

[Live Site](https://nivara.dev) · [Wiki](https://github.com/nivara-ai/nivara.dev/wiki) · [Releases](https://github.com/nivara-ai/nivara.dev/releases)

</div>

---

## Overview

Nivara Product Hub (`nivara.dev`) is the internal platform where the Nivara team showcases, manages, and shares its portfolio of AI solutions. It replaces the previous `playground.nivara.io` showroom with a secure, role-gated experience that supports four distinct user personas — from CEO-level full visibility down to external stakeholders who can only access specific demos.

## Key Features

- **Role-Based Access Control** — four roles (`admin`, `team_tech`, `team_business`, `external`) with granular visibility rules
- **Product Catalog** — searchable grid with sector filters, tech-stack tags, version badges, and status indicators
- **Product Detail Pages** — role-aware content: technical users see repo links and architecture; business users see pitch and factsheet; external users see demo access only
- **Approval Workflow** — new sign-ups land in a "Pending Approval" state until an admin promotes them
- **Invite System** *(Phase 3 — planned)* — token-based invite links scoped to specific products
- **Admin Panel** *(Phase 4 — planned)* — user management, product CRUD, invite dashboard
- **AI Chat per Product** *(Phase 5 — planned)* — conversational assistant with product-specific system prompts

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Server Components, Server Actions) |
| Language | TypeScript 5.7 |
| UI | React 19, Tailwind CSS v4 |
| Auth & DB | Supabase Auth + PostgreSQL with Row Level Security |
| Icons | Lucide React |
| Hosting | Vercel (auto-deploy from `main`) |
| DNS | Cloudflare |
| CI | GitHub Actions (type-check + build) |

## Project Structure

```
src/
├── app/
│   ├── auth/              # Auth callback + server actions
│   ├── create-account/    # Registration page
│   ├── reset-password/    # Password recovery
│   ├── dashboard/         # Protected dashboard layout + pages
│   │   └── products/[slug]/ # Product detail page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Sign-in (home)
├── components/
│   ├── ui/                # Sign-in, shared UI primitives
│   └── dashboard/         # Sidebar, header, product grid, product detail
├── lib/
│   ├── data.ts            # Server-side data fetching
│   ├── roles.ts           # Role permission helpers
│   └── types.ts           # TypeScript interfaces
├── utils/supabase/        # Supabase client (server, client, middleware)
└── middleware.ts           # Auth session refresh middleware
```

## Data Model

Four core tables in the `public` schema, all protected by RLS policies:

- **`user_profiles`** — extends `auth.users` with `role`, `approved`, `organization`, `full_name`
- **`products`** — 21+ columns including slug, name, tagline, description, sector, tech_stack (JSONB), features (JSONB), repo_url, demo_url, pitch_content, factsheet_content, ai_system_prompt
- **`product_access`** — junction table mapping users to products with access levels (`view`, `demo`, `full`)
- **`invite_links`** — token-based invitations scoped to products, roles, and expiration

### Seeded Products

| Slug | Name | Sector |
|------|------|--------|
| `lobby-ai` | LobbyAI | Legal Tech |
| `nina` | Nina® | AI Planning |
| `bally` | OTB Intelligence Platform | Luxury Retail |
| `tender-ai` | Tender AI | Healthcare / Medical Devices |
| `artimino` | Artimino Futura | Agriculture / Wine Production |
| `fiee` | FIEE | FinTech / Private Equity |
| `nivara-os` | Nivara OS | AI Governance & Compliance |
| `nivara-hr` | Nina HR Intelligence | HR Tech |

## Roles and Access

| Capability | admin | team_tech | team_business | external |
|------------|:-----:|:---------:|:-------------:|:--------:|
| See all products | ✅ | ✅ | ✅ | ❌ |
| See granted products only | — | — | — | ✅ |
| View repo links | ✅ | ✅ | ❌ | ❌ |
| View architecture | ✅ | ✅ | ❌ | ❌ |
| View pitch/factsheet | ✅ | ❌ | ✅ | ❌ |
| Admin panel (Users/Invites) | ✅ | ❌ | ❌ | ❌ |
| Manage products | ✅ | ❌ | ❌ | ❌ |

## Local Development

### Prerequisites

- Node.js 20+
- A Supabase project with the required schema (see Wiki for migration SQL)

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

Open [http://localhost:3000](http://localhost:3000).

## CI/CD

| Pipeline | Trigger | Steps |
|----------|---------|-------|
| **CI** (GitHub Actions) | Push to `main`, PRs | `tsc --noEmit` → `npm run build` |
| **CD** (Vercel) | Push to `main` | Auto-deploy to production |

The CI workflow lives at `.github/workflows/ci.yml`.

## Roadmap

- [x] **Phase 1** — Database schema, RLS policies, seed data (8 products)
- [x] **Phase 2** — Frontend dashboard with role-based access, product grid, detail pages *(core complete — detail page parity with playground tracked in [#1](https://github.com/nivara-ai/nivara.dev/issues/1), catalog refinements in [#7](https://github.com/nivara-ai/nivara.dev/issues/7))*
- [ ] **Phase 3** — Invite system and external user access ([#3](https://github.com/nivara-ai/nivara.dev/issues/3))
- [ ] **Phase 4** — Admin panel: user management ([#2](https://github.com/nivara-ai/nivara.dev/issues/2)), settings ([#4](https://github.com/nivara-ai/nivara.dev/issues/4)), RBAC ([#5](https://github.com/nivara-ai/nivara.dev/issues/5))
- [ ] **Phase 5** — AI chat per product ([#6](https://github.com/nivara-ai/nivara.dev/issues/6)), factsheet PDF export, pitch view

## Security

See [SECURITY.md](.github/SECURITY.md) for vulnerability reporting and response process.

## License

Proprietary — © Nivara AI. All rights reserved.
