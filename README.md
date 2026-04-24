# Beebas 🐝

Malaysia's debt snowball & avalanche tracker. Enter your debts, pick a strategy, and see your exact debt-free date.

**Stack:** Next.js 16 · Supabase · Stripe · Tailwind CSS v4 · shadcn/ui (Base UI)

---

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account (test mode is fine)
- Stripe CLI (for local webhook forwarding)

---

## 1. Clone & install

```bash
git clone <your-repo-url>
cd beebas
npm install
```

---

## 2. Environment variables

Create `.env.local` in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRO_MONTHLY_PRICE_ID=price_...
STRIPE_PRO_ANNUAL_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Where to find these:**

| Variable | Location |
|---|---|
| Supabase URL & anon key | Supabase dashboard → Project Settings → API |
| Service role key | Supabase dashboard → Project Settings → API → `service_role` |
| Stripe keys | Stripe dashboard → Developers → API keys |
| Stripe webhook secret | See step 5 |
| Price IDs | Stripe dashboard → Product catalogue → your Pro products |

---

## 3. Database setup

Run the migration against your Supabase project. You can do this two ways:

**Option A — Supabase SQL editor**

Copy the contents of `supabase/migrations/001_initial_schema.sql` and run it in the Supabase dashboard SQL editor.

**Option B — psql direct connection**

```bash
psql "<your-direct-connection-string>" -f supabase/migrations/001_initial_schema.sql
```

The migration creates:

- `users` table — linked to Supabase Auth, stores `stripe_customer_id` and `subscription_status`
- `debts` table — each user's individual debts (name, balance, interest rate, min payment, type)
- `payments` table — payment history log
- `milestones` table — badges earned
- 3 enums: `debt_type`, `milestone_type`, `subscription_status`
- Row-Level Security (RLS) policies — users can only read/write their own rows
- `handle_new_user` trigger — auto-inserts a row in `users` on Auth signup
- `check_debt_limit` trigger — enforces 3-debt limit for free-tier users at DB level

---

## 4. Supabase Auth — email confirmation template

In the Supabase dashboard go to **Authentication → Email Templates → Confirm signup** and set the redirect URL to use `token_hash` (required for the SSR PKCE flow):

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/dashboard
```

> **Why:** Next.js Server Actions generate the PKCE verifier server-side. When the user clicks the email link in a different browser tab the verifier is gone. Using `token_hash` + `verifyOtp` avoids this entirely.

During local development you can disable email confirmation entirely under **Authentication → Providers → Email → Confirm email** to skip this step.

---

## 5. Stripe — create products & webhook

**Products**

Create two products in the Stripe dashboard (or test mode):

| Product | Price | Billing |
|---|---|---|
| Beebas Pro | RM 19.00 | Monthly recurring |
| Beebas Pro Annual | RM 149.00 | Yearly recurring |

Copy each price's ID into `.env.local` as `STRIPE_PRO_MONTHLY_PRICE_ID` and `STRIPE_PRO_ANNUAL_PRICE_ID`.

**Local webhook forwarding**

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the `whsec_...` secret printed by the CLI into `.env.local` as `STRIPE_WEBHOOK_SECRET`.

The webhook handler at `app/api/stripe/webhook/route.ts` listens for:
- `checkout.session.completed` — sets `subscription_status = 'pro'`
- `customer.subscription.deleted` — reverts to `subscription_status = 'free'`

**Test card:** `4242 4242 4242 4242` · any future expiry · any CVV

---

## 6. Run locally

```bash
# Terminal 1 — dev server
npm run dev

# Terminal 2 — Stripe webhook forwarding
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Open [http://localhost:3000](http://localhost:3000).

---

## 7. Run tests

```bash
npm test                 # run all tests
npm run test:watch       # watch mode
npm run test:coverage    # coverage report
```

Tests live in `lib/calculator/__tests__/engine.test.ts` — 18 unit tests covering the snowball/avalanche payoff engine.

---

## Project structure

```
beebas/
├── app/
│   ├── page.tsx                        # Landing page (public)
│   ├── layout.tsx                      # Root layout + SEO metadata
│   ├── globals.css                     # Tailwind theme, brand colours, font import
│   ├── _components/
│   │   └── interest-calculator.tsx     # Free calculator widget (no login)
│   ├── og-image.png/
│   │   └── route.tsx                   # Dynamic OG image (Edge runtime)
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── auth/
│   │   └── confirm/route.ts            # Email confirmation (token_hash + PKCE)
│   ├── dashboard/
│   │   ├── page.tsx                    # Server Component — fetches debts
│   │   └── _components/
│   │       ├── debt-form.tsx           # Add/edit debt dialog
│   │       ├── debt-list.tsx           # Debt cards with delete
│   │       ├── payoff-calculator.tsx   # Strategy toggle, slider, stats
│   │       └── payoff-chart.tsx        # Recharts stacked area chart
│   ├── pricing/
│   │   ├── page.tsx                    # 3-plan pricing (Free / Pro Monthly / Annual)
│   │   └── _components/
│   │       ├── upgrade-button.tsx      # → /api/stripe/checkout
│   │       └── billing-portal-button.tsx # → /api/stripe/portal
│   └── api/stripe/
│       ├── checkout/route.ts           # Creates Stripe Checkout session
│       ├── portal/route.ts             # Creates Stripe Billing Portal session
│       └── webhook/route.ts            # Handles Stripe events
├── lib/
│   ├── calculator/
│   │   ├── engine.ts                   # Snowball/avalanche simulation engine
│   │   ├── types.ts                    # CalculatorInput, PayoffResult types
│   │   └── __tests__/engine.test.ts
│   ├── supabase/
│   │   ├── client.ts                   # Browser client
│   │   ├── server.ts                   # Server Component / Server Action client
│   │   └── middleware.ts               # Session refresh helper
│   ├── auth/
│   │   ├── actions.ts                  # login, signup, logout Server Actions
│   │   └── get-user.ts                 # getAuthUser(), isPro() helpers
│   └── stripe.ts                       # Stripe client singleton
├── types/
│   └── database.ts                     # Supabase-generated DB types
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
└── proxy.ts                            # Next.js 16 middleware (replaces middleware.ts)
```

---

## Key technical notes

### Next.js 16 — breaking changes

This project uses Next.js **16.2.4** which has breaking changes vs earlier versions:

- `middleware.ts` is deprecated — use `proxy.ts` with an export named `proxy`
- `next/font/google` may fail at build time on machines without internet access — use CSS `@import` in `globals.css` instead

### shadcn/ui — Base UI (not Radix)

This version of shadcn uses `@base-ui/react` instead of Radix UI. Key differences:

- No `asChild` prop — use `render={<Button />}` instead
- `Select.onValueChange` passes `string | null` — guard with `if (v !== null)`
- `Slider.onValueChange` passes `number | readonly number[]` — guard with `Array.isArray(v) ? v[0] : v`

### Supabase type generation

`types/database.ts` must include `Relationships: []` on every table and `CompositeTypes: Record<string, never>` in the schema — without these the supabase-js v2 `Update` types resolve to `never`.

### Brand colours

| Token | Value | Usage |
|---|---|---|
| Yellow | `#FFD000` | Primary CTA, accents, logo bg |
| Charcoal | `#1C1C1C` | Navbar, dark sections, text |
| Font | Plus Jakarta Sans | Loaded via CSS `@import` |

---

## Subscription tiers

| Feature | Free | Pro |
|---|---|---|
| Debts | Up to 3 | Unlimited |
| Snowball & avalanche | ✓ | ✓ |
| Payoff chart | ✓ | ✓ |
| Extra payment simulator | ✓ | ✓ |
| PDF payoff plan export | — | ✓ |
| Couple / family mode | — | ✓ |
| Monthly email digest | — | ✓ |
| Milestone badges | — | ✓ |
| Custom debt categories | — | ✓ |
| Priority support | — | ✓ |

The 3-debt limit is enforced at two layers: the UI disables the "Add debt" button, and a Postgres trigger (`check_debt_limit`) rejects the insert at DB level.

---

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add all `.env.local` variables as Vercel Environment Variables
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g. `https://beebas.my`)
5. In Stripe dashboard, add a production webhook endpoint pointing to `https://beebas.my/api/stripe/webhook` and update `STRIPE_WEBHOOK_SECRET`
6. In Supabase Auth settings, add your production domain to the allowed redirect URLs
