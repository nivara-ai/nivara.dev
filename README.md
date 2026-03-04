# Nivara.dev

The official web platform for **Nivara** — a modern, dark-themed authentication portal built with Next.js 15, Supabase, and Tailwind CSS v4.

🌐 **Live:** [https://nivara.dev](https://nivara.dev)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.7 |
| UI | React 19, Tailwind CSS v4 |
| Auth | Supabase Auth (email/password) |
| Database | Supabase PostgreSQL |
| Icons | Lucide React |
| Hosting | Vercel (Pro) |
| DNS | Cloudflare |
| CI/CD | GitHub Actions + Vercel auto-deploy |

## Features

- **Dark theme** with emerald accent colors
- **Email/password authentication** via Supabase
- **User approval workflow** — new signups require manual team approval
- **Protected dashboard** with role-based access (team vs external)
- **Password reset** via email link
- **Responsive design** — mobile-first, split-panel layout on desktop
- **Animated UI** with fade-in and slide transitions
- **Google OAuth** module ready for future activation

## Project Structure

```
nivara.dev/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── public/
│   ├── hero-bg.png             # Hero background image
│   └── favicon.png             # Nivara favicon
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── callback/
│   │   │   │   └── route.ts    # OAuth/email callback handler
│   │   │   └── actions.ts      # Server actions (login, signup, etc.)
│   │   ├── create-account/
│   │   │   └── page.tsx        # Registration page
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Protected dashboard
│   │   ├── reset-password/
│   │   │   └── page.tsx        # Password reset page
│   │   ├── globals.css         # Theme variables, animations
│   │   ├── layout.tsx          # Root layout (dark mode)
│   │   └── page.tsx            # Home / Sign-in page
│   ├── components/ui/
│   │   ├── sign-in.tsx         # Sign-in form component
│   │   ├── create-account.tsx  # Registration form component
│   │   └── reset-password.tsx  # Reset password form component
│   ├── lib/
│   │   └── google-oauth.ts     # Google OAuth config (ready, not active)
│   ├── utils/supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server Supabase client
│   │   └── middleware.ts       # Session management middleware
│   └── middleware.ts           # Next.js middleware (route protection)
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project
- A Vercel account (for deployment)

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For Google OAuth (when activated):

```env
# These are configured in Supabase Dashboard > Auth > Providers > Google
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Installation

```bash
git clone https://github.com/nivara-ai/nivara.dev.git
cd nivara.dev
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database Setup

Run the following SQL in Supabase SQL Editor:

```sql
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'team', 'admin')),
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Service role full access"
  ON public.user_profiles FOR ALL
  USING (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Authentication Flow

1. **Sign Up** — User registers with email/password at `/create-account`
2. **Email Confirmation** — Supabase sends a confirmation email
3. **Profile Creation** — A database trigger auto-creates a `user_profiles` row with `approved: false`
4. **Pending State** — User can sign in but sees "Pending Approval" on the dashboard
5. **Team Approval** — A team member sets `approved: true` in Supabase
6. **Access Granted** — User sees the full dashboard

### Roles

| Role | Description |
|------|-------------|
| `user` | External user, requires approval |
| `team` | Internal team member |
| `admin` | Full administrative access |

## Deployment

The project auto-deploys to Vercel on every push to `main`.

- **Production URL:** [https://nivara.dev](https://nivara.dev)
- **Vercel Project:** nivara-dev (Nivara team)
- **Branch:** `main` → Production

### Vercel Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_SITE_URL` | Production URL (https://nivara.dev) |

## Google OAuth (Ready, Not Active)

The Google OAuth module is prepared in `src/lib/google-oauth.ts` and `src/app/auth/actions.ts`. To activate:

1. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Add the credentials in Supabase Dashboard → Authentication → Providers → Google
3. Uncomment the Google sign-in button in `sign-in.tsx` and `create-account.tsx`
4. Redeploy

See the [Wiki](https://github.com/nivara-ai/nivara.dev/wiki) for detailed instructions.

## Contributing

This is a private project by the Nivara team. All changes go through the `main` branch with CI checks.

## License

Proprietary — © Nivara AI. All rights reserved.
