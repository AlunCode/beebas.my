# Beebas — Next Steps

## Status Legend
- ✅ Done
- ⏳ Waiting / In progress
- ⬜ Not started

---

## Phase 0 — Critical Missing Features (Blocking)

> **These features are documented in BLUEPRINT.md but NOT implemented in the codebase. Must be completed before Phase 6 (Planner features).**

### Database Schema Gaps
| # | Task | Status | Notes |
|---|---|---|---|
| 0.1 | Add `pro_lifetime`, `planner_monthly`, `planner_annual` to `subscription_status` enum | ✅ | |
| 0.2 | Add `role` column to users table | ✅ | |
| 0.3 | Create `clients` table | ✅ | |
| 0.4 | Add `client_id` to debts, milestones, payments tables | ✅ | |
| 0.5 | Update TypeScript types in `types/database.ts` | ✅ | |

### Business Logic Gaps
| # | Task | Status | Notes |
|---|---|---|---|
| 0.6 | Implement `isLifetime()` helper function | ✅ | Check `subscription_status === 'pro_lifetime'` |
| 0.7 | Implement `isPlanner()` helper function | ✅ | Check `role === 'planner'` or subscription status |
| 0.8 | Enforce lifetime plan limit (100 users) | ✅ | Counter in checkout route + pricing page hides lifetime when ≥100 |
| 0.9 | Update `isPro()` to include `pro_lifetime` | ✅ | Now checks `['pro', 'pro_lifetime', 'planner_monthly', 'planner_annual']` |
| 0.10 | Update Stripe webhook to handle `pro_lifetime` status | ✅ | `checkout.session.completed` sets `pro_lifetime` on one-time payment |
| 0.11 | Update Stripe webhook to handle planner subscriptions | ✅ | Sets `role = 'planner'` + correct status from `metadata.plan_type` |

### Missing Pro Features
| # | Task | Status | Notes |
|---|---|---|---|
| 0.12 | Implement Excel/CSV export | ✅ | Client-side CSV with 3 export options: Debt Summary, Payoff Schedule, Full Payoff Plan. Dropdown in payoff calculator. UTF-8 BOM for Excel compat. |
| 0.13 | Add mobile-responsive testing | ✅ | Fixed: comparison table overflow, footer wrap, debt list touch targets (44px min), export page responsive grid, dashboard header stacking. Auth & pricing pages already responsive. |

---

## Phase 1 — Before Going Live

### Business
| # | Task | Status | Notes |
|---|---|---|---|
| 1 | Daftar SSM sole proprietor | ✅ | Approved |
| 2 | Beli domain `beebas.my` | ✅ | Cloudflare |
| 3 | Setup email (`admin@beebas.my`) | ✅ | Gmail (adminbeebas@gmail.com) + Send As via Cloudflare DNS |
| 4 | Daftar akaun bank | ✅ | Hong Leong Bank Islamic (sole proprietor) |
| 5 | Connect bank ke Stripe | ⬜ | Boleh proceed sekarang — add Hong Leong acc details in Stripe dashboard |

### Email & Cron
| # | Task | Status | Notes |
|---|---|---|---|
| 6 | Sign up Resend | ✅ | |
| 7 | Verify `beebas.my` domain on Resend | ✅ | Done after Cloudflare propagated |
| 8 | Add `RESEND_API_KEY` to `.env.local` | ✅ | |
| 9 | Generate + add `CRON_SECRET` to `.env.local` | ✅ | |

### Database
| # | Task | Status | Notes |
|---|---|---|---|
| 10 | Run all 5 SQL migrations in Supabase | ✅ | |

### Code
| # | Task | Status | Notes |
|---|---|---|---|
| 11 | Push code to GitHub | ✅ | |
| 12 | Commit contact form Resend changes | ✅ | Committed in last batch |

---

## Phase 2 — Deploy

> ✅ Live at **https://beebas-my.vercel.app** — doing manual QA here first before pointing `beebas.my`

| # | Task | Status | Notes |
|---|---|---|---|
| 13 | Import GitHub repo to Vercel | ✅ | |
| 14 | Add all env vars to Vercel | ✅ | Currently pointing to `beebas-my.vercel.app` |
| 15 | Point `beebas.my` DNS to Vercel | ⬜ | Add A/CNAME in Cloudflare — after QA |
| 16 | Verify domain on Vercel | ⬜ | After QA |

### ⚠️ When switching to `beebas.my` — update ALL of these:
```
Vercel env vars:
  NEXT_PUBLIC_APP_URL=https://beebas.my
  NEXT_PUBLIC_SITE_URL=https://beebas.my

Supabase → Auth → URL Configuration:
  Site URL → https://beebas.my
  Redirect URLs → add https://beebas.my/auth/confirm

Google Cloud Console → OAuth client → Authorized redirect URIs:
  (Supabase callback URL stays the same — no change needed)

Stripe → Webhooks:
  Update endpoint URL → https://beebas.my/api/stripe/webhook
  Copy new STRIPE_WEBHOOK_SECRET → update in Vercel
```

---

## Phase 3 — Internal Testing (before public launch)

Site is live at `beebas.my` but not publicized. Test everything yourself first.

### Wiring
| # | Task | Status | Notes |
|---|---|---|---|
| 17 | Add `beebas-my.vercel.app` to Supabase Auth redirect URLs | ✅ | |
| 18 | Update Supabase email confirmation template | ✅ | |
| 19 | Add Google OAuth credentials to Supabase | ✅ | |
| 20 | Add Stripe test webhook `https://beebas-my.vercel.app/api/stripe/webhook` | ✅ | |
| 21 | Copy `STRIPE_WEBHOOK_SECRET` → update in Vercel | ✅ | |

### Manual QA Test Script

URL: `https://beebas-my.vercel.app`

#### Auth
| # | Test | Steps | Expected | Status |
|---|---|---|---|---|
| T01 | Email signup | Go to `/signup` → enter email + password → submit | Confirmation email arrives at inbox | ✅ |
| T02 | Email confirmation | Click link in email | Redirected to `/dashboard` | ✅ |
| T03 | Email login | Go to `/login` → enter same credentials | Redirected to `/dashboard` | ✅ |
| T04 | Google login | Click "Continue with Google" | Google OAuth → redirected to `/dashboard` | ✅ |
| T05 | Wrong password | Login with wrong password | Error message shown, not logged in | ✅ |
| T06 | Logo click | Click Beebas logo on login/signup page | Redirected to `/` (landing page) | ✅ |

#### Free Plan — Debt Management
| # | Test | Steps | Expected | Status |
|---|---|---|---|---|
| T07 | Add first debt | Dashboard → fill debt form → submit | Debt appears in list, onboarding advances | ✅ |
| T08 | Add 2nd and 3rd debt | Add 2 more debts | All 3 show in list | ✅ |
| T09 | Free plan limit | Try to add 4th debt | Blocked with upgrade prompt | ✅ |
| T10 | Edit debt | Click edit icon → change balance → save | Updated value shows in list | ✅ |
| T11 | Delete debt (confirm) | Click delete → confirm dialog shows → confirm | Debt removed, toast shown | ✅ |
| T12 | Delete debt (cancel) | Click delete → cancel | Debt stays, nothing changed | ✅ |
| T13 | Mark as paid | Click paid → confirm → confirm | Debt removed, milestone toast fires | ✅ |

#### Payoff Calculator
| # | Test | Steps | Expected | Status |
|---|---|---|---|---|
| T14 | Snowball vs Avalanche | Add 3 debts with different balances/rates → toggle strategy | Order changes, payoff date updates | ✅ |
| T15 | Extra payment slider | Drag slider up | Debt-free date moves closer, savings shown | ✅ |
| T16 | Large debt | Add RM500,000 home loan at 3.5% | Calculator handles it, no crash | ✅ |
| T17 | Zero interest debt | Add debt with 0% interest | No divide-by-zero error | ✅ |

#### Stripe / Subscription
| # | Test | Steps | Expected | Status |
|---|---|---|---|---|
| T18 | Upgrade to Pro | Click upgrade → Stripe checkout | Use test card `4242 4242 4242 4242`, any future date, any CVC |  ✅ |
| T19 | Pro badge appears | After upgrade | "Pro" badge visible in dashboard | ✅ |
| T20 | Add 4th+ debt as Pro | Add debt after upgrade | No limit, debt added successfully | ✅ |
| T21 | Custom label | Edit debt → add custom label | Badge shows custom label | ✅ |
| T22 | Cancel subscription | Billing portal → cancel | Reverts to free after period ends | ⬜ |
| T23 | Declined card | Use card `4000 0000 0000 9995` | Stripe shows decline error |  ✅ |

#### Other Features
| # | Test | Steps | Expected | Status |
|---|---|---|---|---|
| T24 | Contact form | Go to `/contact` → fill form → submit | Success state shown, email in `adminbeebas@gmail.com` | ✅ |
| T25 | PDF export | Dashboard → export/print button | Print dialog opens with correct debt data | ✅ |
| T26 | Couple invite (new user) | Pro user generates link → open in incognito → sign up new account → accept invite | New user auto-upgraded to Pro, both see shared debts | ⬜ |
| T27 | Couple invite (existing free user) | Pro user generates link → open in incognito → login with free account → accept invite | Free user upgraded to Pro, both see shared debts | ⬜ |
| T28 | Invite link preserved through signup | From incognito: click invite → click "Sign up free" → create account → should redirect back to invite | Invite code preserved, not lost | ✅ |
| T29 | Invite link preserved through login | From incognito: click invite → click "Log in" → login → should redirect back to invite | Invite code preserved, not lost | ✅ |
| T30 | Partner cannot generate invites | After accepting invite, check couple mode card | No "Generate invite link" button shown | ⬜ |
| T31 | Leave couple mode (partner) | Partner clicks "Leave couple mode" → confirm | Partner reverts to Free tier, only sees own debts | ⬜ |
| T32 | Leave couple mode (inviter) | Inviter clicks "Leave couple mode" → confirm | Both unlinked, inviter can generate new invite | ⬜ |
| T33 | Link hidden after acceptance | Pro user accepts own invite (should fail) or partner accepts | Invite link disappears from UI, shows "Linked" status | ⬜ |

#### Non-Functional
| # | Test | Status |
|---|---|---|
| T28 | Mobile — iPhone Safari (or BrowserStack) | ⬜ |
| T29 | Mobile — Android Chrome | ⬜ |
| T30 | Slow 3G in Chrome DevTools (Network tab) — no broken layouts | ⬜ |
| T31 | Open all pages — zero console errors (F12 → Console) | ⬜ |
| T32 | Landing page `/` loads and all CTAs work | ⬜ |
| T33 | Pricing page `/pricing` — all plan cards show correctly | ⬜ |

---

## Phase 4 — Public Launch

| # | Task | Status | Notes |
|---|---|---|---|
| 39 | Apply for Google AdSense | ⬜ | Submit early — takes 2–4 weeks |
| 40 | Setup Sentry error monitoring | ⬜ | Optional but good to have |
| 41 | Announce on Reddit r/MalaysiaPF | ⬜ | Personal story angle |
| 42 | Announce in Facebook Malaysia finance groups | ⬜ | |
| 43 | Submit to ProductHunt | ⬜ | |

---

## Phase 5 — Pre-launch Improvements (before or after public launch)

### 🔴 High Impact
| # | Feature | Status | Notes |
|---|---|---|---|
| A | **14-day free trial for Pro** | ✅ | `trial_period_days: 14` in Stripe checkout; webhook treats `trialing` as pro |
| B | **Onboarding flow** | ✅ | 3-step wizard replaces empty dashboard state |
| C | **Social proof on landing page** | ✅ | "200+ users" stat, hero social proof line, pricing teaser updated |

### 🟡 Medium Impact
| # | Feature | Status | Notes |
|---|---|---|---|
| D | **Payoff chart empty state** | ✅ | Illustrated empty state with CTA; PayoffChart guards against empty months |
| E | **Google Analytics / Plausible** | ⬜ | Plausible.io ~RM19/month, or Google Analytics (free) |
| F | **Excel/CSV export** | ✅ | Client-side CSV with 3 export types: Debt Summary, Payoff Schedule, Full Payoff Plan. Dropdown menu in payoff calculator (Pro only). |
| G | **Mobile-responsive testing** | ✅ | Fixed responsive issues: comparison table scroll, footer wrap, touch targets, export grid, dashboard header. Tested build compiles clean. |

---

## Phase 5b — SEO Improvements (Done)

> ✅ All code changes implemented on 7 Aug 2026. Build compiles clean.

### Implemented
| # | Task | Status | Notes |
|---|---|---|---|
| S1 | Add BreadcrumbList JSON-LD to all 4 blog posts | ✅ | Google shows breadcrumb trails in search results |
| S2 | Add "Related Articles" section to all 4 blog posts | ✅ | Internal linking for link equity + user engagement |
| S3 | Add PricingPage JSON-LD to `/pricing` | ✅ | Product/Offer schema — pricing in search results |
| S4 | Add FAQPage JSON-LD to `/pricing` | ✅ | Rich snippet FAQ dropdowns in Google |
| S5 | Update `dateModified` in Article JSON-LD | ✅ | All 4 posts now have 2026-08-07 |
| S6 | Add OpenGraph metadata to blog index | ✅ | Better social sharing preview |
| S7 | Add keyword-rich intro text to blog index | ✅ | Bold terms: credit card debt, PTPTN, snowball, avalanche, cara bayar hutang cepat |

### Manual Tasks (Not Code — Do These Yourself)
| # | Task | Status | Notes |
|---|---|---|---|
| S8 | Submit sitemap to Google Search Console | ⬜ | Go to search.google.com/search-console → add `beebas.my` → submit `https://beebas.my/sitemap.xml` |
| S9 | Verify site on Google Search Console | ⬜ | Use HTML file upload or DNS TXT record via Cloudflare |
| S10 | Check Google Search Console for indexing errors | ⬜ | After submit, check Coverage report for any pages with errors |
| S11 | Submit XML sitemap to Bing Webmaster Tools | ⬜ | bing.com/webmasters — same sitemap URL |
| S12 | Add Google Analytics (Plausible or GA4) | ⬜ | Track organic traffic to see SEO progress |

### Future SEO Content (Phase 7+)
| # | Task | Status | Notes |
|---|---|---|---|
| S13 | Write BM article: `cara bayar hutang cepat` | ✅ | `app/blog/cara-bayar-hutang-cepat/page.tsx` — 7 strategies, full SEO, Malay |
| S14 | Write BM article: `kalkulator hutang Malaysia` | ✅ | `app/blog/kalkulator-hutang-malaysia/page.tsx` — calculator-focused, CTA to Beebas |
| S15 | Write BM article: `PTPTN berapa lama nak habis` | ✅ | `app/blog/ptptn-berapa-lama-nak-habis/page.tsx` — PTPTN payoff guide, strategies |
| S16 | Write BM article: `cara kira interest personal loan` | ✅ | `app/blog/cara-kira-interest-personal-loan/page.tsx` — flat rate vs reducing balance |
| S17 | Write BM article: `AKPK debt management programme` | ✅ | `app/blog/akpk-debt-management-programme/page.tsx` — DMP guide, eligibility, process |
| S18 | Make interest calculator a standalone `/calculator` page | ⬜ | Better keyword targeting for `kalkulator faedah` |
| S19 | Add `hreflang` tags when BM blog content is live | ⬜ | Tell Google which language version to show |

---

## Phase 7b — Autopilot Blog Pipeline

> Fully automated blog generation via GitHub Actions. Runs every 2 weeks. No manual input needed.

### Setup Tasks
| # | Task | Status | Notes |
|---|---|---|---|
| AB1 | Create `scripts/generate-blog/autopilot.ts` | ⬜ | Main script — topic selection, AI content generation, proofreading |
| AB2 | Create `scripts/generate-blog/template.ts` | ⬜ | Page.tsx template builder (navbar, footer, JSON-LD, Callout/Tip components) |
| AB3 | Create `scripts/generate-blog/topics.json` | ⬜ | Master topic bank (~50+ debt/finance topics for Malaysia) |
| AB4 | Create `scripts/generate-blog/proofread.ts` | ⬜ | AI proofreading pass — grammar, facts, tone, SEO validation |
| AB5 | Create `.github/workflows/autopilot-blog.yml` | ⬜ | Cron workflow — every 2 weeks, generates blog, creates PR |
| AB6 | Add `OPENAI_API_KEY` to GitHub Secrets | ⬜ | Required for AI content generation |
| AB7 | Add `github-token` permissions for PR creation | ⬜ | Workflow needs `contents: write`, `pull-requests: write` |

### How It Works
1. GitHub Actions cron fires every 2 weeks
2. AI picks a NEW topic from `topics.json` (avoids duplicates)
3. AI generates English blog post (1500-2500 words)
4. AI generates Malay version (adapted, not just translated)
5. AI proofreads both versions
6. Script creates `page.tsx` files + updates blog index
7. Auto-creates PR → User reviews & approves
8. Merge → Vercel auto-deploys

### Model
Uses **GPT-4o-mini** (not GPT-4o) — 10x cheaper, excellent Malay language support, same API. Just `model: 'gpt-4o-mini'` in the script.

### Cost
- ~$0.05-0.10 per blog post pair (EN + MS) — using GPT-4o-mini
- 2 posts per month = ~$0.10-0.20/month

---

## Phase 6 — Financial Planner Features

> **⚠️ PREREQUISITE:** Interview 10-20 financial planners before starting Phase 6. Ask: "Would you pay RM 49/month for this?" If < 50% say yes, skip planner features entirely and focus on individual user growth.

### Phase 6a — Database Schema & Migrations
| # | Task | Status | Notes |
|---|---|---|---|
| A1 | Create migration: add `role` column to users table | ⬜ | Enum: `individual | planner`, default `individual` |
| A2 | Create migration: create `clients` table | ⬜ | planner_id, name, email, notes, timestamps |
| A3 | Create migration: add `client_id` to debts, milestones, payments | ⬜ | Nullable UUID, FK to clients |
| A4 | Create migration: update `subscription_status` enum | ⬜ | Add `pro_lifetime`, `planner_monthly`, `planner_annual` |
| A5 | Update TypeScript types in `types/database.ts` | ⬜ | Auto-generated from new schema |
| A6 | Add RLS policies for planner access | ⬜ | Planner can read/write their own clients' data |
| A7 | Run migrations in Supabase | ⬜ | Test locally first |

### Phase 6b — Server Actions & Auth
| # | Task | Status | Notes |
|---|---|---|---|
| A8 | Create `app/actions/planner.ts` | ⬜ | registerAsPlanner, createClient, updateClient, deleteClient |
| A9 | Update `lib/auth/get-user.ts` | ⬜ | Add `isPlanner()` helper function |
| A10 | Update `debts.ts` actions to accept `client_id` | ⬜ | Pass client_id through add/update/delete |
| A11 | Update milestone calculation to support client_id` | ⬜ | Milestones tied to client or planner |
| A12 | Add planner upgrade flow in Stripe checkout | ⬜ | New price IDs for planner plans |
| A13 | Update Stripe webhook to handle planner subscriptions | ⬜ | Set role = 'planner' on subscription |
| A14 | **Increase client limit to 50** | ⬜ | Update planner plan limits from 20 to 50 clients |

### Phase 6c — Planner Dashboard UI
| # | Task | Status | Notes |
|---|---|---|---|
| A15 | Create `/dashboard/planner` page | ⬜ | Client list view (separate from individual dashboard) |
| A16 | Create planner client list component | ⬜ | Table with name, email, debt count, total debt, progress |
| A17 | Create client form dialog with notes field | ⬜ | Add/edit client with name, email, notes (notes UI implementation) |
| A18 | Create `/dashboard/planner/clients/[id]` page | ⬜ | Client detail view (debts filtered by client) |
| A19 | Update debt form to include client selector | ⬜ | Dropdown: "My personal debts" or client name |
| A20 | Update debt list to show client badge | ⬜ | Visual indicator which client owns each debt |
| A21 | Add planner stats cards | ⬜ | Total clients, total debt across clients, average payoff time |
| A22 | Add "Switch to Individual Dashboard" button | ⬜ | Planner can still manage personal debts |

### Phase 6d — Reports & Export
| # | Task | Status | Notes |
|---|---|---|---|
| A23 | Update export page to support client reports | ⬜ | Select client from dropdown, generate client-specific PDF |
| A24 | Add client branding to PDF export | ⬜ | Show "Report for [Client Name]" header |
| A25 | Add bulk report generation (optional) | ⬜ | Select multiple clients, generate all reports |

### Phase 6e — Pricing & Marketing
| # | Task | Status | Notes |
|---|---|---|---|
| A25 | Add Stripe products for Planner plans | ⬜ | RM 49/month and RM 468/year |
| A26 | Update pricing page with Planner section | ⬜ | Separate section for financial planners |
| A27 | Add "Financial Planner" signup option | ⬜ | Radio button during signup: Individual / Planner |
| A28 | Create planner onboarding flow | ⬜ | "Add your first client" wizard |
| A29 | Update landing page with planner CTA | ⬜ | "For Financial Planners" section |

### Phase 6f — Testing & QA
| # | Task | Status | Notes |
|---|---|---|---|
| A30 | Test planner signup and upgrade flow | ⬜ | End-to-end test |
| A31 | Test client CRUD operations | ⬜ | Create, edit, delete clients |
| A32 | Test debt management per client | ⬜ | Add debts with/without client_id |
| A33 | Test RLS policies | ⬜ | Planner cannot access other planners' clients |
| A34 | Test report generation per client | ⬜ | PDF includes correct client data |
| A35 | Test cancellation/reversion | ⬜ | Planner cancels → clients' data preserved |

---

## Phase 7 — Growth (after first 10 users)

| # | Task | Status | Notes |
|---|---|---|---|
| 1 | TikTok/Reels demos | ⬜ | Show debt-free date calculator live — screen recordings in BM/English |
| 2 | 4 more blog articles in BM | ⬜ | BM articles rank better: `cara bayar hutang PTPTN`, `kalkulator faedah kad kredit` |
| 3 | Debt-free date shareable card | ⬜ | "I'll be debt free by Dec 2027! 🎉" with Beebas branding — viral loop |
| 4 | Reach out to AKPK for partnership | ⬜ | Position as self-service companion to their counselling |
| 5 | Micro-influencers (RM300–800/post) | ⬜ | After 5 testimonials — finance TikTokers 10k–100k followers |
| 6 | Submit to ProductHunt | ⬜ | Launch on Tuesday/Wednesday for max visibility |
| 7 | Announce on Reddit r/MalaysiaPF | ⬜ | Personal story angle — "I built this to get out of debt" |
| 8 | Facebook Malaysia finance groups | ⬜ | Join groups, share genuine advice + tool |

### SEO Keywords to Target (Zero Competition)
- `debt snowball calculator Malaysia`
- `cara bayar hutang lebih cepat`
- `PTPTN payoff calculator`
- `credit card interest calculator Malaysia`
- `debt avalanche Malaysia`
- `cara urus hutang peribadi`

---

## Phase 8 — Cash Flow & Net Worth Tracking

> **Prerequisites:** Phase 6 (Planner features) complete. 50+ active users. 5+ testimonials collected.
>
> **Pricing trigger:** Ship Phase 8 → increase Pro to RM 29/month, Planner to RM 99/month (grandfather existing users for 12 months).

### Phase 8a — Database Schema
| # | Task | Status | Notes |
|---|---|---|---|
| B1 | Create migration: `income_sources` table | ⬜ | user_id, client_id (nullable), name, amount, frequency (monthly/weekly/yearly), is_active |
| B2 | Create migration: `expenses` table | ⬜ | user_id, client_id (nullable), category, amount, frequency, is_fixed (rent vs discretionary) |
| B3 | Create migration: `assets` table | ⬜ | user_id, client_id (nullable), name, value, asset_type (EPF, savings, property, investment, other) |
| B4 | Create migration: `financial_snapshots` table | ⬜ | user_id, client_id, snapshot_date, net_worth, total_income, total_expenses, total_debt, dti_ratio, health_score |
| B5 | Update TypeScript types | ⬜ | Auto-generated from new schema |
| B6 | Add RLS policies | ⬜ | Users/planners can only access their own data |

### Phase 8b — Server Actions
| # | Task | Status | Notes |
|---|---|---|---|
| B7 | Create `app/actions/income.ts` | ⬜ | addIncome, updateIncome, deleteIncome, getIncome |
| B8 | Create `app/actions/expenses.ts` | ⬜ | addExpense, updateExpense, deleteExpense, getExpenses |
| B9 | Create `app/actions/assets.ts` | ⬜ | addAsset, updateAsset, deleteAsset, getAssets |
| B10 | Create `lib/calculator/net-worth.ts` | ⬜ | calculateNetWorth, calculateDTI, calculateHealthScore |
| B11 | Create `lib/calculator/sankey.ts` | ⬜ | Generate Sankey data: Income → Expenses → Savings → Debt payoff |
| B12 | Auto-snapshot on data change | ⬜ | Trigger financial snapshot when income/expense/debt changes |

### Phase 8c — UI Components
| # | Task | Status | Notes |
|---|---|---|---|
| B13 | Create `dashboard/_components/income-form.tsx` | ⬜ | Add/edit income sources with frequency selector |
| B14 | Create `dashboard/_components/expense-form.tsx` | ⬜ | Add/edit expenses with category picker |
| B15 | Create `dashboard/_components/asset-form.tsx` | ⬜ | Add/edit assets (EPF, savings, property, investments) |
| B16 | Create `dashboard/_components/sankey-chart.tsx` | ⬜ | Recharts Sankey: Income → Expenses → Savings → Debt |
| B17 | Create `dashboard/_components/net-worth-tracker.tsx` | ⬜ | Line chart of net worth over time |
| B18 | Create `dashboard/_components/dti-dashboard.tsx` | ⬜ | DTI ratio gauge + trend + benchmark (recommended < 40%) |
| B19 | Create `dashboard/_components/health-score.tsx` | ⬜ | Single number 0-100 with breakdown |
| B20 | Update dashboard layout | ⬜ | Add tabs: Debts | Cash Flow | Net Worth |

### Phase 8d — Planner Integration
| # | Task | Status | Notes |
|---|---|---|---|
| B21 | Extend client detail page | ⬜ | Add income/expense/asset entry per client |
| B22 | Client Sankey diagram | ⬜ | Per-client cash flow visualization |
| B23 | Client net worth tracking | ⬜ | Per-client asset vs liability over time |
| B24 | Planner portfolio overview | ⬜ | Aggregate stats across all clients |

### Phase 8e — Pricing Update
| # | Task | Status | Notes |
|---|---|---|---|
| B25 | Create new Stripe prices | ⬜ | Pro RM 29/month, Pro Annual RM 229/year |
| B26 | Create new Planner Stripe prices | ⬜ | Planner RM 99/month, Planner Annual RM 899/year |
| B27 | Update checkout route | ⬜ | Use new price IDs for new subscribers |
| B28 | Update webhook | ⬜ | Handle new subscription tiers |
| B29 | Update pricing page | ⬜ | New prices + feature list with cash flow/net worth |
| B30 | Grandfather existing users | ⬜ | Existing subscribers keep old price for 12 months |
| B31 | Add Enterprise tier placeholder | ⬜ | RM 249/month — "Coming Soon" on pricing page |

### Phase 8f — Testing & QA
| # | Task | Status | Notes |
|---|---|---|---|
| B32 | Test income/expense CRUD | ⬜ | Add, edit, delete — verify RLS |
| B33 | Test Sankey diagram | ⬜ | Verify flow: income → expenses → savings → debt |
| B34 | Test net worth calculation | ⬜ | Assets - liabilities = net worth, chart updates |
| B35 | Test DTI ratio | ⬜ | DTI = total monthly debt payments / total monthly income |
| B36 | Test health score | ⬜ | Score recalculates when data changes |
| B37 | Test pricing transition | ⬜ | New users see new prices, old users keep old price |
| B38 | Test planner client cash flow | ⬜ | Planner can enter income/expenses per client |

---

## Phase 9 — Scenario Builder & Goal Planning

> **Prerequisites:** Phase 8 complete. Planner pricing validated (50%+ say "yes" in interviews).
>
> **Pricing trigger:** Already handled in Phase 8. This phase adds value without price increase.

### Phase 9a — What-If Scenario Builder ("Play Zone")
| # | Task | Status | Notes |
|---|---|---|---|
| C1 | Create `lib/calculator/scenario.ts` | ⬜ | Run payoff simulation with variable inputs |
| C2 | Create `dashboard/_components/scenario-builder.tsx` | ⬜ | Sliders: income change, expense change, extra payment, new debt |
| C3 | Real-time plan comparison | ⬜ | Side-by-side: "Current Plan" vs "What-If" with date/interest delta |
| C4 | Save scenarios | ⬜ | Pro feature: save up to 5 scenarios per client |
| C5 | Scenario sharing | ⬜ | Generate shareable link for client review |

### Phase 9b — Goal-Based Planning
| # | Task | Status | Notes |
|---|---|---|---|
| C6 | Create migration: `goals` table | ⬜ | user_id, client_id, name, target_amount, target_date, priority, monthly_contribution |
| C7 | Create `app/actions/goals.ts` | ⬜ | CRUD for goals |
| C8 | Create `dashboard/_components/goal-planner.tsx` | ⬜ | Add goals, see funding progress, prioritize |
| C9 | Goal vs debt allocation | ⬜ | Show surplus split: X% to debt, Y% to goals |

### Phase 9c — EPF Projection Calculator
| # | Task | Status | Notes |
|---|---|---|---|
| C10 | Create `lib/calculator/epf.ts` | ⬜ | Project EPF balance: current + monthly contribution + dividend rate (5-6%) |
| C11 | Create `dashboard/_components/epf-projection.tsx` | ⬜ | Line chart: EPF balance at retirement age |
| C12 | EPF retirement income estimator | ⬜ | Monthly withdrawal estimate from EPF at 55 |

### Phase 9d — AI Recommendations
| # | Task | Status | Notes |
|---|---|---|---|
| C13 | Create `lib/ai/debt-advisor.ts` | ⬜ | Rule-based + simple heuristics (no LLM needed for v1) |
| C14 | Smart recommendations | ⬜ | "Consider moving RM X from savings to debt" or "You have RM Y surplus — allocate here" |
| C15 | Weekly insight email | ⬜ | Enhance digest with personalized recommendations |

### Phase 9e — Testing & QA
| # | Task | Status | Notes |
|---|---|---|---|
| C16 | Test scenario builder | ⬜ | Sliders update plan in real-time, no crashes |
| C17 | Test goal planning | ⬜ | CRUD works, surplus allocation correct |
| C18 | Test EPF projection | ⬜ | Numbers match manual calculation |
| C19 | Test AI recommendations | ⬜ | Recommendations make financial sense |

---

## Phase 10 — Client Portal & Enterprise

> **Prerequisites:** Phase 9 complete. 10+ paying planner customers.
>
> **Pricing trigger:** Ship Enterprise tier at RM 249/month.

### Phase 10a — Client Portal (Read-Only)
| # | Task | Status | Notes |
|---|---|---|---|
| D1 | Create `/portal/[clientId]` route | ⬜ | Public route — client accesses via unique link |
| D2 | Create portal authentication | ⬜ | Email-based magic link or PIN (no full account needed) |
| D3 | Create `portal/_components/portal-dashboard.tsx` | ⬜ | Read-only view: debts, payoff chart, progress, next milestone |
| D4 | Create `portal/_components/portal-sankey.tsx` | ⬜ | Read-only cash flow visualization |
| D5 | Create `portal/_components/portal-goals.tsx` | ⬜ | Read-only goal progress |
| D6 | Portal notification settings | ⬜ | Planner can toggle what client sees |
| D7 | Portal analytics | ⬜ | Track when client views portal (engagement metric) |

### Phase 10b — Branded PDF Reports
| # | Task | Status | Notes |
|---|---|---|---|
| D8 | Create `lib/reports/pdf-generator.ts` | ⬜ | Server-side PDF generation (Puppeteer or @react-pdf/renderer) |
| D9 | Add planner branding settings | ⬜ | Logo, firm name, contact info, colors |
| D10 | Create report templates | ⬜ | Debt Analysis, Cash Flow Summary, Full Financial Plan |
| D11 | Report preview before download | ⬜ | Show preview, then export |
| D12 | Bulk report generation | ⬜ | Select multiple clients → generate all reports |

### Phase 10c — Enterprise Tier
| # | Task | Status | Notes |
|---|---|---|---|
| D13 | Create migration: `organizations` table | ⬜ | firm_name, logo_url, settings (JSONB) |
| D14 | Create migration: `team_members` table | ⬜ | org_id, user_id, role (admin/member/viewer) |
| D15 | Multi-planner team management | ⬜ | Admin invites planners, manages billing |
| D16 | White-label settings | ⬜ | Custom domain, logo, colors, email templates |
| D17 | API access (read-only) | ⬜ | REST API for external integrations |
| D18 | Create Enterprise Stripe prices | ⬜ | RM 249/month, RM 2,499/year |
| D19 | Update pricing page | ⬜ | Add Enterprise tier section |

### Phase 10d — Testing & QA
| # | Task | Status | Notes |
|---|---|---|---|
| D20 | Test client portal access | ⬜ | Client can view via magic link, sees correct data |
| D21 | Test portal security | ⬜ | Client cannot access other clients' data |
| D22 | Test branded PDF generation | ⬜ | PDF includes planner branding, correct data |
| D23 | Test bulk report generation | ⬜ | 10+ reports generate without timeout |
| D24 | Test enterprise team management | ⬜ | Admin invites, role assignment, billing |
| D25 | Test white-label settings | ⬜ | Custom domain, logo, colors applied |

---

## Planner Interview Checklist (Before Each Phase)

> **CRITICAL:** Interview 10-20 financial planners before starting each phase. If < 50% say "yes, I'd pay for this," skip that phase and focus on growth.

### Before Phase 6 (Planner Features)
- [ ] Find 10-20 Malaysian financial planners (LinkedIn, Facebook groups, AKPK network)
- [ ] Ask: "Would you pay RM 49/month for a debt analysis tool for your clients?"
- [ ] Ask: "What's your biggest pain point with debt analysis?"
- [ ] Ask: "How do you currently present debt payoff plans to clients?"
- [ ] Ask: "How many clients do you manage at once?"
- [ ] **Go/No-Go:** If < 50% say yes → skip Phase 6, focus on individual user growth

### Before Phase 8 (Cash Flow & Net Worth)
- [ ] Interview planners who completed Phase 6
- [ ] Ask: "Would cash flow visualization (Sankey) help in client meetings?"
- [ ] Ask: "Do clients share their income/expense data with you?"
- [ ] Ask: "Would you pay RM 99/month for cash flow + net worth + debt tools?"
- [ ] Ask: "What's missing from the current tool?"
- [ ] **Go/No-Go:** If < 50% say yes → delay Phase 8, focus on Phase 7 growth

### Before Phase 9 (Scenario Builder & Goals)
- [ ] Interview planners using Phase 8 features
- [ ] Ask: "Would a what-if scenario builder help during client meetings?"
- [ ] Ask: "Do you set financial goals for clients beyond debt payoff?"
- [ ] Ask: "Would EPF projections add value for your clients?"
- [ ] **Go/No-Go:** If < 50% say yes → focus on improving Phase 8 features

### Before Phase 10 (Client Portal & Enterprise)
- [ ] Interview planners with 10+ active clients
- [ ] Ask: "Would clients use a read-only portal to check their progress?"
- [ ] Ask: "Do you need branded reports for compliance?"
- [ ] Ask: "Would your firm pay RM 249/month for multi-planner access?"
- [ ] **Go/No-Go:** If < 50% say yes → skip Enterprise, focus on individual growth

---

## Supabase Auth Email Template

In Supabase dashboard → Authentication → Email Templates → Confirm signup:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/dashboard
```

Required for PKCE flow to work when user opens confirmation email in a different browser tab.


