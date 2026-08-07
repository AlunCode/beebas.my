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

| Task | Notes |
|---|---|
| TikTok/Reels demos | Show debt-free date calculator live |
| **4 more blog articles in BM** | BM articles rank better for local search — `cara bayar hutang PTPTN`, `kalkulator faedah kad kredit` |
| **Debt-free date shareable card** | "I'll be debt free by Dec 2027! 🎉" with Beebas branding — powerful viral loop |
| Reach out to AKPK for partnership | |
| Micro-influencers (RM300–800/post) | After 5 testimonials |

---

## Supabase Auth Email Template

In Supabase dashboard → Authentication → Email Templates → Confirm signup:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/dashboard
```

Required for PKCE flow to work when user opens confirmation email in a different browser tab.


