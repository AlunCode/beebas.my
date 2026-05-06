# Beebas — Next Steps

## Status Legend
- ✅ Done
- ⏳ Waiting / In progress
- ⬜ Not started

---

## Phase 1 — Before Going Live

### Business
| # | Task | Status | Notes |
|---|---|---|---|
| 1 | Daftar SSM sole proprietor | ✅ | Approved |
| 2 | Beli domain `beebas.my` | ✅ | Cloudflare |
| 3 | Setup email (`admin@beebas.my`) | ✅ | Gmail (adminbeebas@gmail.com) + Send As via Cloudflare DNS |
| 4 | Daftar akaun bank | ⏳ | Tunggu invitation dari AEON Bank Biz |
| 5 | Connect bank ke Stripe | ⬜ | Buat selepas ada akaun bank |

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
| 11 | Push code to GitHub | ⬜ | Fix SSH key or switch to HTTPS |
| 12 | Commit contact form Resend changes | ⬜ | Ready to commit |

---

## Phase 2 — Deploy

| # | Task | Status | Notes |
|---|---|---|---|
| 13 | Import GitHub repo to Vercel | ⬜ | After push |
| 14 | Add all env vars to Vercel | ⬜ | See list below |
| 15 | Point `beebas.my` DNS to Vercel | ⬜ | Add A/CNAME in Cloudflare |
| 16 | Verify domain on Vercel | ⬜ | |

### Env vars to add in Vercel
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET          ← use test key first, swap after live
STRIPE_PRO_MONTHLY_PRICE_ID
STRIPE_PRO_ANNUAL_PRICE_ID
RESEND_API_KEY
CRON_SECRET
NEXT_PUBLIC_APP_URL=https://beebas.my
NEXT_PUBLIC_SITE_URL=https://beebas.my
```

---

## Phase 3 — Internal Testing (before public launch)

Site is live at `beebas.my` but not publicized. Test everything yourself first.

### Wiring
| # | Task | Status | Notes |
|---|---|---|---|
| 17 | Add `beebas.my` to Supabase Auth allowed redirect URLs | ⬜ | Dashboard → Auth → URL Configuration |
| 18 | Update Supabase email confirmation template | ⬜ | See template below |
| 19 | Add production Stripe webhook `https://beebas.my/api/stripe/webhook` | ⬜ | |
| 20 | Copy new `STRIPE_WEBHOOK_SECRET` → update in Vercel | ⬜ | |

### Functional Testing
| # | Test | Status |
|---|---|---|
| 21 | Signup → receive confirmation email → confirm → reach dashboard | ⬜ |
| 22 | Add 3 debts (free plan) → 4th debt blocked | ⬜ |
| 23 | Upgrade via Stripe (card: `4242 4242 4242 4242`) → Pro badge appears | ⬜ |
| 24 | Add debt as Pro → no limit | ⬜ |
| 25 | Custom category label → shows in badge | ⬜ |
| 26 | Mark debt as paid → milestone toast fires | ⬜ |
| 27 | PDF export → opens print dialog with correct data | ⬜ |
| 28 | Generate couple invite link → partner accepts → both see shared debts | ⬜ |
| 29 | Leave couple mode → debts split back | ⬜ |
| 30 | Contact form submit → email arrives in Gmail (`adminbeebas@gmail.com`) | ⬜ |
| 31 | Digest opt-out toggle → saves state | ⬜ |
| 32 | Unsubscribe link (from digest email) → opts out | ⬜ |
| 33 | Cancel Stripe subscription → reverts to free plan | ⬜ |

### Non-Functional Testing
| # | Test | Status |
|---|---|---|
| 34 | Mobile QA — iPhone Safari | ⬜ |
| 35 | Mobile QA — Android Chrome | ⬜ |
| 36 | Slow 3G simulation (Chrome DevTools) — no broken layouts | ⬜ |
| 37 | All pages load without console errors | ⬜ |
| 38 | Payoff calculator runs correctly on large debts (e.g. RM500k home loan) | ⬜ |

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

## Phase 5 — Growth (after first 10 users)

| Task | Notes |
|---|---|
| TikTok/Reels demos | Show debt-free date calculator live |
| SEO blog posts in BM | `cara bayar hutang PTPTN`, `kalkulator faedah kad kredit` |
| Reach out to AKPK for partnership | |
| Micro-influencers (RM300–800/post) | After 5 testimonials |

---

## Supabase Auth Email Template

In Supabase dashboard → Authentication → Email Templates → Confirm signup:

```
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=signup&next=/dashboard
```

Required for PKCE flow to work when user opens confirmation email in a different browser tab.
