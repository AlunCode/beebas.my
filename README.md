# Beebas 🐝

Malaysia's debt snowball & avalanche tracker. Enter your debts, pick a strategy, and see your exact debt-free date.

**Stack:** Next.js 16 · Supabase · Stripe · Resend · Tailwind CSS v4 · shadcn/ui (Base UI)

---

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account (test mode is fine)
- A [Resend](https://resend.com) account with verified domain
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

# Email (Resend)
RESEND_API_KEY=re_...

# Cron job auth
CRON_SECRET=<random-string>

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Google AdSense (optional)
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-...
NEXT_PUBLIC_ADSENSE_SLOT_MID=
NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM=
```

**Where to find these:**

| Variable | Location |
|---|---|
| Supabase URL & anon key | Supabase dashboard → Project Settings → API |
| Service role key | Supabase dashboard → Project Settings → API → `service_role` |
| Stripe keys | Stripe dashboard → Developers → API keys |
| Stripe webhook secret | See step 5 |
| Price IDs | Stripe dashboard → Product catalogue → your Pro products |
| Resend API key | Resend dashboard → API Keys |
| Cron secret | Generate any random string: `openssl rand -hex 32` |

---

## 3. Database setup

Run all migrations in order against your Supabase project via the SQL editor:

| File | What it creates |
|---|---|
| `supabase/migrations/001_initial_schema.sql` | Base schema, RLS policies, triggers |
| `supabase/migrations/20260425_couple_mode.sql` | `partner_id`, `couple_invite_code`, updated RLS |
| `supabase/migrations/20260425_digest.sql` | `digest_opted_out`, `digest_last_sent` on users |
| `supabase/migrations/20260425_milestones.sql` | `milestones` table + `milestone_type` enum |
| `supabase/migrations/20260425_custom_categories.sql` | `custom_category` column on debts |

The base schema creates:
- `users` table — linked to Supabase Auth, stores subscription status, couple mode, digest settings
- `debts` table — debts with balance, interest rate, min payment, type, custom category
- `payments` table — payment history log
- `milestones` table — badges earned by Pro users
- RLS policies — users can only read/write their own rows (couple mode adds partner read access)
- `handle_new_user` trigger — auto-inserts a row in `users` on Auth signup
- `check_debt_limit` trigger — enforces 3-debt limit for free-tier users at DB level

---

## 4. Supabase Auth — email confirmation template

In the Supabase dashboard go to **Authentication → Email Templates → Confirm signup** and set the redirect URL to:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/dashboard
```

> **Why:** Next.js Server Actions generate the PKCE verifier server-side. When the user clicks the email link in a different browser tab the verifier is gone. Using `token_hash` + `verifyOtp` avoids this entirely.

During local development you can disable email confirmation under **Authentication → Providers → Email → Confirm email**.

---

## 5. Stripe — create products & webhook

**Products**

Create two products in the Stripe dashboard:

| Product | Price | Billing |
|---|---|---|
| Beebas Pro | RM 19.00 | Monthly recurring |
| Beebas Pro Annual | RM 149.00 | Yearly recurring |

Copy each price's ID into `.env.local`.

**Local webhook forwarding**

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the `whsec_...` secret into `.env.local` as `STRIPE_WEBHOOK_SECRET`.

The webhook handler at `app/api/stripe/webhook/route.ts` listens for:
- `customer.subscription.created` / `customer.subscription.updated` — sets `subscription_status = 'pro'` or `'free'`
- `customer.subscription.deleted` — sets `subscription_status = 'cancelled'` (data is kept, just restricted)

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
debtfree/
├── app/
│   ├── page.tsx                        # Landing page + FAQ + free calculator widget
│   ├── layout.tsx                      # Root layout + SEO metadata
│   ├── not-found.tsx                   # Custom 404
│   ├── robots.ts / sitemap.ts          # SEO
│   ├── icon.tsx / apple-icon.tsx       # Favicon (generated)
│   ├── og-image.png/route.tsx          # Dynamic OG image (Edge runtime)
│   ├── _components/
│   │   ├── interest-calculator.tsx     # Free calculator widget (no login required)
│   │   └── public-ad-banner.tsx        # AdSense for public pages
│   ├── actions/
│   │   ├── debts.ts                    # addDebt, updateDebt, deleteDebt, markDebtPaid
│   │   ├── couple.ts                   # generateInviteCode, acceptInvite, leaveCouple
│   │   ├── digest.ts                   # setDigestOptOut, unsubscribeByUid
│   │   └── contact.ts                  # sendContactMessage (via Resend)
│   ├── api/
│   │   ├── stripe/checkout/route.ts    # Create Stripe Checkout session
│   │   ├── stripe/portal/route.ts      # Create Stripe Billing Portal session
│   │   ├── stripe/webhook/route.ts     # Handle subscription lifecycle events
│   │   └── cron/monthly-digest/route.ts # Monthly email digest (Bearer auth)
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── auth/confirm/route.ts           # Email confirmation (token_hash + PKCE)
│   ├── dashboard/
│   │   ├── page.tsx                    # Server Component — fetches debts + milestones
│   │   ├── export/page.tsx             # Print-optimised PDF export (Pro only)
│   │   └── _components/
│   │       ├── debt-form.tsx           # Add debt dialog (Pro: custom category field)
│   │       ├── debt-list.tsx           # Debt cards + mark paid + edit + delete
│   │       ├── edit-debt-dialog.tsx    # Edit debt dialog
│   │       ├── payoff-calculator.tsx   # Strategy toggle, slider, stats, export link
│   │       ├── payoff-chart.tsx        # Recharts stacked area chart
│   │       ├── couple-mode.tsx         # Couple mode card (generate/accept/leave)
│   │       ├── milestone-badges.tsx    # Badge grid (Pro only)
│   │       ├── digest-settings.tsx     # Monthly digest opt-out toggle
│   │       ├── ad-banner.tsx           # AdSense for dashboard (free users)
│   │       └── toast-provider.tsx      # Toast context + useToast() hook
│   ├── invite/[code]/
│   │   ├── page.tsx                    # Couple invite acceptance page
│   │   └── _components/accept-button.tsx
│   ├── blog/
│   │   ├── page.tsx                    # Blog index
│   │   └── <slug>/page.tsx             # 4 articles with Article JSON-LD
│   ├── pricing/page.tsx                # Pricing tiers + FAQ
│   ├── about/page.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── _components/contact-form.tsx # Client form → Resend server action
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── unsubscribe/page.tsx            # Email digest unsubscribe
├── lib/
│   ├── calculator/
│   │   ├── engine.ts                   # Snowball/avalanche simulation (600-month cap)
│   │   ├── types.ts                    # CalculatorInput, PayoffResult types
│   │   └── __tests__/engine.test.ts
│   ├── supabase/
│   │   ├── client.ts                   # Browser client
│   │   ├── server.ts                   # Server Component / Server Action client
│   │   ├── admin.ts                    # Service-role client (cron + webhooks)
│   │   └── middleware.ts               # Session refresh helper
│   ├── auth/
│   │   ├── actions.ts                  # login, signup, logout Server Actions
│   │   └── get-user.ts                 # getAuthUser(), isPro() helpers
│   ├── email.ts                        # getResend() lazy singleton + buildDigestHtml()
│   └── stripe.ts                       # Stripe client singleton
├── types/
│   └── database.ts                     # Supabase schema types
├── components/ui/                      # shadcn/ui components (Base UI)
├── supabase/migrations/                # 5 migration files
├── vercel.json                         # Cron: 0 8 1 * * → /api/cron/monthly-digest
└── proxy.ts                            # Next.js 16 middleware (replaces middleware.ts)
```

---

## Key technical notes

### Next.js 16 — breaking changes

- `middleware.ts` is deprecated — use `proxy.ts` with an export named `proxy`
- `searchParams` in page props is a `Promise<...>` — must be awaited
- `next/font/google` may fail at build time without internet — use CSS `@import` in `globals.css` instead

### shadcn/ui — Base UI (not Radix)

This version of shadcn uses `@base-ui/react` instead of Radix UI:

- No `asChild` prop — use `render={<Button />}` instead
- `Select.onValueChange` passes `string | null` — guard with `if (v !== null)`
- `Slider.onValueChange` passes `number | readonly number[]` — guard with `Array.isArray(v) ? v[0] : v`

### Supabase type generation

`types/database.ts` must include `Relationships: []` on every table and `CompositeTypes: Record<string, never>` in the schema — without these the supabase-js v2 `Update` types resolve to `never`.

### Resend — lazy singleton

`lib/email.ts` exports `getResend()` instead of a top-level instance to avoid "Missing API key" build errors when `RESEND_API_KEY` is not set at build time.

### Brand colours

| Token | Value | Usage |
|---|---|---|
| Yellow | `#FFD000` | Primary CTA, accents, logo |
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
| 3-step onboarding wizard | ✓ | ✓ |
| PDF payoff plan export | — | ✓ |
| Couple / family mode | — | ✓ |
| Monthly email digest | — | ✓ |
| Milestone badges | — | ✓ |
| Custom debt categories | — | ✓ |
| Priority support | — | ✓ |

**Free trial:** Pro comes with a 14-day free trial. Stripe passes `trial_period_days: 14`; webhook treats `trialing` status as Pro.

**Cancellation behaviour:** when a Pro user cancels, `subscription_status` is set to `'cancelled'`. All debt data is kept. Only the first 3 debts are shown; the rest are hidden behind a locked card until they re-subscribe.

---

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add all `.env.local` variables as Vercel Environment Variables
4. Set `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_SITE_URL` to `https://beebas.my`
5. Point `beebas.my` DNS to Vercel (A/CNAME record in Cloudflare)
6. In Stripe dashboard, add production webhook `https://beebas.my/api/stripe/webhook` and update `STRIPE_WEBHOOK_SECRET`
7. In Supabase Auth settings, add `https://beebas.my` to allowed redirect URLs
