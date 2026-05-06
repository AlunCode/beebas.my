# Beebas — Project Blueprint

**Malaysia's debt snowball & avalanche tracker.** Enter your debts, pick a strategy, see your exact debt-free date.

---

## The Idea

Malaysia household debt stands at RM1.65 trillion (84.3% of GDP). There are zero dedicated local tools — everything is in USD, ignores PTPTN/AEON Credit, and doesn't speak to Malaysian borrowers. Beebas fills that gap: RM-denominated, Malaysian debt types, built by someone in debt himself.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16.2.4 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui (Base UI — not Radix) |
| Database + Auth | Supabase (PostgreSQL + SSR auth) |
| Payments | Stripe (checkout, billing portal, webhooks) |
| Email | Resend |
| Charts | Recharts |
| Deployment | Vercel (+ cron jobs) |
| Error monitoring | Sentry (planned) |

### Key Next.js 16 gotchas
- `middleware.ts` is deprecated — use `proxy.ts` with an export named `proxy`
- `searchParams` in page props is a `Promise<...>` — must be awaited
- shadcn uses `@base-ui/react` — no `asChild`, use `render={<Component />}` instead
- `Select.onValueChange` passes `string | null` — guard with `if (v !== null)`

---

## Pricing

| Plan | Price | Limits |
|---|---|---|
| Free | RM 0/month | Up to 3 debts |
| Pro Monthly | RM 19/month | Unlimited debts + all features |
| Pro Annual | RM 149/year | Same as Pro (35% savings) |

3-debt limit is enforced at two layers: UI disables the button + Postgres trigger rejects the insert.

---

## Features

### Free
- Add up to 3 debts (name, balance, interest rate, min payment, type)
- Snowball strategy (sort by smallest balance)
- Avalanche strategy (sort by highest interest)
- Payoff timeline chart (stacked area, Recharts)
- Extra payment simulator (slider)
- Debt-free date countdown
- Interest cost comparison (snowball vs avalanche)
- Free interest calculator widget on landing page (no login required)

### Pro only
- Unlimited debts
- PDF payoff plan export (browser print-to-PDF, no dependencies)
- Couple / family mode (invite partner, shared debt view)
- Monthly email digest (Vercel cron, 1st of every month, 8am UTC)
- Milestone badges (First Victory, Halfway There, Debt Free!, Hot Streak, On a Roll, Unstoppable)
- Custom debt categories (override badge label with any text)
- Priority support

---

## Database Schema

### Tables

**`users`**
- `id` uuid (matches Supabase Auth uid)
- `email` text
- `stripe_customer_id` text | null
- `subscription_status` enum: `free | pro | cancelled`
- `partner_id` uuid | null (couple mode)
- `couple_invite_code` text | null
- `digest_opted_out` boolean
- `digest_last_sent` text | null

**`debts`**
- `id` uuid
- `user_id` uuid → users
- `name` text
- `balance` numeric
- `original_balance` numeric | null (set on insert, used for halfway_point milestone)
- `interest_rate` numeric
- `minimum_payment` numeric
- `debt_type` enum: `credit_card | personal_loan | ptptn | car_loan | home_loan | bnpl | aeon_credit | other`
- `custom_category` varchar(50) | null (Pro: overrides debt_type badge label)

**`milestones`**
- `id` uuid
- `user_id` uuid → users
- `type` enum: `first_debt_paid | halfway_point | streak_3_months | streak_6_months | streak_12_months | all_debts_paid`
- `achieved_at` timestamptz
- `debt_id` uuid | null

**`payments`**
- `id` uuid
- `debt_id` uuid → debts
- `user_id` uuid → users
- `amount` numeric
- `payment_date` date
- `notes` text | null

### Migrations (run in order)
1. `supabase/migrations/001_initial_schema.sql` — base schema, RLS, triggers
2. `supabase/migrations/20260425_couple_mode.sql` — partner_id, couple_invite_code, updated RLS
3. `supabase/migrations/20260425_digest.sql` — digest_opted_out, digest_last_sent
4. `supabase/migrations/20260425_milestones.sql` — milestones table + milestone_type enum
5. `supabase/migrations/20260425_custom_categories.sql` — custom_category on debts

---

## File Structure

```
debtfree/
├── app/
│   ├── page.tsx                          # Landing page + FAQ + free calculator
│   ├── layout.tsx                        # Root layout, OG meta, fonts
│   ├── not-found.tsx                     # Custom 404
│   ├── robots.ts / sitemap.ts            # SEO
│   ├── icon.tsx / apple-icon.tsx         # Favicon (generated)
│   ├── og-image.png/route.tsx            # Dynamic OG image (Edge)
│   ├── _components/
│   │   ├── interest-calculator.tsx       # Free widget (no login)
│   │   └── public-ad-banner.tsx          # AdSense (public pages)
│   ├── actions/
│   │   ├── debts.ts                      # addDebt, updateDebt, deleteDebt, markDebtPaid
│   │   ├── couple.ts                     # generateInviteCode, acceptInvite, leaveCouple
│   │   ├── digest.ts                     # setDigestOptOut, unsubscribeByUid
│   │   └── contact.ts                    # sendContactMessage (via Resend)
│   ├── api/
│   │   ├── stripe/checkout/route.ts      # Create Stripe Checkout session
│   │   ├── stripe/portal/route.ts        # Create Stripe Billing Portal session
│   │   ├── stripe/webhook/route.ts       # Handle subscription events
│   │   └── cron/monthly-digest/route.ts  # Monthly email cron (Bearer auth)
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── auth/confirm/route.ts             # PKCE email confirmation
│   ├── dashboard/
│   │   ├── page.tsx                      # Server Component, fetches debts + milestones
│   │   ├── export/page.tsx               # Print-optimized PDF export (Pro)
│   │   └── _components/
│   │       ├── debt-form.tsx             # Add debt dialog
│   │       ├── debt-list.tsx             # Debt cards + mark paid + edit + delete
│   │       ├── edit-debt-dialog.tsx      # Edit debt dialog (Pro: custom category)
│   │       ├── payoff-calculator.tsx     # Strategy toggle, slider, stats, export link
│   │       ├── payoff-chart.tsx          # Recharts stacked area chart
│   │       ├── couple-mode.tsx           # Couple mode card (invite/unlink)
│   │       ├── milestone-badges.tsx      # Badge grid
│   │       ├── digest-settings.tsx       # Email digest toggle
│   │       ├── ad-banner.tsx             # AdSense (dashboard, free users)
│   │       └── toast-provider.tsx        # Toast context + useToast()
│   ├── invite/[code]/
│   │   ├── page.tsx                      # Couple invite page
│   │   └── _components/accept-button.tsx
│   ├── blog/
│   │   ├── page.tsx                      # Blog index
│   │   ├── how-to-clear-debt-faster-in-malaysia/page.tsx
│   │   ├── credit-card-minimum-payment-trap-malaysia/page.tsx
│   │   ├── how-to-negotiate-with-your-bank-in-malaysia/page.tsx
│   │   └── ptptn-payoff-strategies-malaysia/page.tsx
│   ├── pricing/page.tsx                  # Pricing + FAQ
│   ├── about/page.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── _components/contact-form.tsx  # Sends via Resend
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── unsubscribe/page.tsx              # Email digest unsubscribe
├── lib/
│   ├── calculator/
│   │   ├── engine.ts                     # Snowball/avalanche simulation (600-month cap)
│   │   ├── types.ts
│   │   └── __tests__/engine.test.ts      # 18 unit tests (Vitest)
│   ├── supabase/
│   │   ├── client.ts                     # Browser client
│   │   ├── server.ts                     # Server Component/Action client
│   │   ├── admin.ts                      # Service-role client (cron/webhooks)
│   │   └── middleware.ts
│   ├── auth/
│   │   ├── actions.ts                    # login, signup, logout server actions
│   │   └── get-user.ts                   # getAuthUser(), isPro()
│   ├── email.ts                          # getResend() lazy singleton + buildDigestHtml()
│   └── stripe.ts                         # Stripe singleton
├── types/database.ts                     # Supabase schema types
├── components/ui/                        # shadcn components
├── supabase/migrations/
├── vercel.json                           # Cron: 0 8 1 * * → /api/cron/monthly-digest
└── proxy.ts                              # Next.js 16 middleware (session refresh)
```

---

## Payoff Engine

`lib/calculator/engine.ts`

1. Sort debts by strategy: snowball (smallest balance) or avalanche (highest interest)
2. Each month:
   - Accrue interest on all debts (`balance × rate / 12`)
   - Apply minimum payment to all debts
   - Apply extra payment to debt[0] (priority debt)
3. When debt[0] reaches 0: remove it, roll its minimum into the extra pool
4. Repeat until all debts are 0, up to 600 months
5. Compare total interest against a minimum-only baseline to compute `interestSavedVsMinimum`

---

## Auth Flow

- Email + password via Supabase Auth
- Email confirmation uses `token_hash` + `verifyOtp` (PKCE-safe across browser tabs)
- `getAuthUser()` in Server Components: fetches auth session + users row, redirects to /login if missing
- RLS policies: users can only read/write their own rows (couple mode adds partner read access)

---

## Cancellation Policy

When a Pro user cancels their subscription:

- `subscription_status` is set to `cancelled` (via Stripe webhook `customer.subscription.deleted`)
- `isPro()` returns `false` — Pro features are immediately gated
- **All debt records are kept** — data is never deleted on cancellation
- User can still view, edit, and delete existing debts regardless of count
- User cannot add new debts if they already have 3 or more
- If they had 5 debts as Pro and cancel, they see all 5 with a banner: *"Your existing debts are safe — upgrade to add more"*
- Re-subscribing restores full Pro access instantly (webhook fires again)

This is intentional: punishing users by deleting their data on cancellation is bad UX and a retention killer. Keeping data intact is also a re-subscription hook — they see their plan and are motivated to come back.

---

## Stripe Flow

1. User clicks Upgrade → POST `/api/stripe/checkout` → Stripe Checkout session → redirect
2. Successful payment → Stripe fires `customer.subscription.created` webhook
3. Webhook handler updates `users.subscription_status = 'pro'`
4. Cancellation → `customer.subscription.deleted` → status set to `cancelled`
5. Billing portal: POST `/api/stripe/portal` → Stripe Customer Portal session

---

## Email Digest Flow

- Vercel cron fires 1st of every month at 8am UTC → `GET /api/cron/monthly-digest`
- Authenticated with `Authorization: Bearer <CRON_SECRET>`
- Fetches all Pro users where `digest_opted_out = false`
- Skips users where `digest_last_sent` is already this month (idempotent)
- Runs avalanche calculation, sends branded HTML email via Resend
- Updates `digest_last_sent` to current month

---

## Couple Mode Flow

1. Pro user generates invite code (8-char random, stored in `couple_invite_code`)
2. Share link: `https://beebas.my/invite/<code>`
3. Partner visits link → accepts → both users linked via `partner_id`
4. Dashboard query: `.in('user_id', [userId, partnerId])` — both see all debts
5. Either user can leave couple mode (unlinks both via Promise.all)

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRO_MONTHLY_PRICE_ID=
STRIPE_PRO_ANNUAL_PRICE_ID=

# App
NEXT_PUBLIC_APP_URL=https://beebas.my
NEXT_PUBLIC_SITE_URL=https://beebas.my

# Email
RESEND_API_KEY=

# Cron
CRON_SECRET=

# AdSense (optional)
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=
NEXT_PUBLIC_ADSENSE_SLOT_MID=
NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM=
```

---

## SEO

- `layout.tsx`: base metadata, OG tags, canonical URL
- `sitemap.ts`: all public routes
- `robots.ts`: allow all, sitemap pointer
- Blog posts: Article JSON-LD schema
- Landing page + pricing: FAQPage JSON-LD schema
- Target keywords: `debt snowball calculator Malaysia`, `PTPTN payoff calculator`, `cara bayar hutang lebih cepat`, `credit card interest calculator Malaysia`

---

## Revenue Targets

| Users | Monthly Net (after Stripe 3.4% + RM1.50) |
|---|---|
| 100 Pro | ~RM 1,685/month |
| 500 Pro | ~RM 8,425/month |
| 700 Pro | ~RM 11,548/month |

Register Sdn Bhd at ~RM8k+/month MRR for 17% SME tax rate vs 24% personal.

---

## Business Setup

- SSM Sole Proprietor registered (approved)
- Domain: `beebas.my` (Cloudflare)
- Email: `admin@beebas.my` — Gmail (adminbeebas@gmail.com) with Send As via Cloudflare DNS
- Bank account: pending AEON Bank Biz invitation
- Legal: "This tool is for planning purposes only and does not constitute financial advice."
