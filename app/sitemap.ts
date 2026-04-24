import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://beebas.my'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date('2026-04-25'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE}/pricing`,
      lastModified: new Date('2026-04-25'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE}/blog`,
      lastModified: new Date('2026-04-24'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/how-to-clear-debt-faster-in-malaysia`,
      lastModified: new Date('2026-04-24'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/ptptn-payoff-strategies-malaysia`,
      lastModified: new Date('2026-04-20'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/credit-card-minimum-payment-trap-malaysia`,
      lastModified: new Date('2026-04-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/blog/how-to-negotiate-with-your-bank-in-malaysia`,
      lastModified: new Date('2026-04-10'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/about`,
      lastModified: new Date('2026-04-25'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date('2026-04-25'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date('2026-04-24'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE}/terms`,
      lastModified: new Date('2026-04-25'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]
}
