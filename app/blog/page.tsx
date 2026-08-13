import type { Metadata } from 'next'
import Link from 'next/link'
import { LinkButton } from '@/components/ui/link-button'
import { PublicAdBanner } from '@/app/_components/public-ad-banner'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Blog — Debt Tips for Malaysians',
  description: 'Practical guides on paying off debt faster in Malaysia. Snowball, avalanche, balance transfers, PTPTN payoff, credit card traps, and bank negotiation — in plain English.',
  openGraph: {
    title: 'Beebas Blog — Debt Tips for Malaysians',
    description: 'Practical guides to help you pay off debt faster — credit cards, car loans, PTPTN, and more.',
  },
}

const POSTS = [
  {
    slug: 'how-to-clear-debt-faster-in-malaysia',
    title: '7 Proven Techniques to Clear Your Debt Faster in Malaysia',
    excerpt: 'From snowball and avalanche to 0% balance transfers and rate renegotiation — every strategy Malaysians can use right now to pay less interest and get free sooner.',
    date: '24 April 2026',
    readTime: '6 min read',
    tag: 'Strategy',
  },
  {
    slug: 'ptptn-payoff-strategies-malaysia',
    title: 'How to Pay Off PTPTN Faster — Strategies Every Malaysian Graduate Should Know',
    excerpt: 'Over 1.2 million Malaysians are blacklisted by PTPTN. Most didn\'t intend to default — they just didn\'t have a plan. Here\'s everything you need to clear PTPTN faster and stay off the list.',
    date: '20 April 2026',
    readTime: '7 min read',
    tag: 'PTPTN',
  },
  {
    slug: 'credit-card-minimum-payment-trap-malaysia',
    title: 'The Minimum Payment Trap: Why Your Credit Card Debt Never Seems to Go Down',
    excerpt: 'Paying the minimum every month feels responsible. It isn\'t. Here\'s the brutal math of what minimum payments actually cost Malaysians — and exactly what to do instead.',
    date: '15 April 2026',
    readTime: '5 min read',
    tag: 'Credit Cards',
  },
  {
    slug: 'how-to-negotiate-with-your-bank-in-malaysia',
    title: 'How to Negotiate With Your Bank in Malaysia (Scripts Included)',
    excerpt: 'Most Malaysians never think to call their bank and ask for better terms. Many who do, get them. Here\'s exactly what to say — rate reductions, fee waivers, hardship plans, and more.',
    date: '10 April 2026',
    readTime: '6 min read',
    tag: 'Banking',
  },
  {
    slug: 'cara-bayar-hutang-cepat',
    title: 'Cara Bayar Hutang Lebih Cepat — 7 Strategi Yang Berkesan',
    excerpt: 'Dari snowball dan avalanche hingga pemindahan baki 0% dan rundingan kadar — setiap strategi yang boleh digunakan rakyat Malaysia untuk bayar hutang lebih cepat dan jimat ribuan ringgit.',
    date: '8 Ogos 2026',
    readTime: '7 min baca',
    tag: 'Strategi',
  },
  {
    slug: 'kalkulator-hutang-malaysia',
    title: 'Kalkulator Hutang Malaysia — Cara Kira & Kurangkan Hutang Anda',
    excerpt: 'Gunakan kalkulator hutang percuma untuk kira baki, faedah, dan tarikh bebas hutang anda. Bandingkan strategi snowball vs avalanche dan lihat berapa banyak anda boleh jimat.',
    date: '8 Ogos 2026',
    readTime: '6 min baca',
    tag: 'Kalkulator',
  },
  {
    slug: 'ptptn-berapa-lama-nak-habis',
    title: 'PTPTN Berapa Lama Nak Habis? Ini Cara Kira & Strategi Bayar',
    excerpt: 'Lebih 1.2 juta rakyat Malaysia disenarai hitam oleh PTPTN. Kebanyakan tak bermaksud gagal bayar — mereka tak ada pelan. Ini cara kira bila PTPTN anda akan habis.',
    date: '8 Ogos 2026',
    readTime: '8 min baca',
    tag: 'PTPTN',
  },
  {
    slug: 'cara-kira-interest-personal-loan',
    title: 'Cara Kira Interest Personal Loan Malaysia — Panduan Lengkap',
    excerpt: 'Panduan lengkap cara kira faedah pinjaman peribadi di Malaysia. Fahami flat rate vs reducing balance, kira ansuran bulanan, dan bandingkan pinjaman sebelum mohon.',
    date: '8 Ogos 2026',
    readTime: '7 min baca',
    tag: 'Pinjaman',
  },
  {
    slug: 'akpk-debt-management-programme',
    title: 'AKPK Debt Management Programme — Cara Mohon & Apa Yang Perlu Tahu',
    excerpt: 'Panduan lengkap Program Pengurusan Kredit AKPK — siapa yang layak, cara mohon, kesan pada CCRIS, dan apa yang berlaku selepas anda sertai. Percuma, disokong kerajaan.',
    date: '8 Ogos 2026',
    readTime: '8 min baca',
    tag: 'AKPK',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#1C1C1C] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-base">🐝</div>
          <span className="text-[#FFD000] font-bold text-lg tracking-tight">Beebas</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">About</Link>
          <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Pricing</Link>
          <Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Contact</Link>
          <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">Log in</Link>
          <LinkButton href="/signup" size="sm" className="rounded-lg bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 text-xs">
              Get started free
            </LinkButton>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <p className="text-[#FFD000] font-bold text-sm uppercase tracking-widest mb-3">Beebas Blog</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1C1C1C] mb-3">
            Debt tips for Malaysians
          </h1>
          <p className="text-muted-foreground text-lg mb-4">
            Practical guides to help you pay off debt faster — credit cards, car loans, PTPTN, and more.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Whether you're tackling <strong className="text-[#1C1C1C]">credit card debt</strong>, paying off <strong className="text-[#1C1C1C]">PTPTN</strong>, or figuring out the best <strong className="text-[#1C1C1C]">debt snowball</strong> vs <strong className="text-[#1C1C1C]">avalanche</strong> strategy — these articles break it all down in plain language. No jargon, no fluff. Just the <strong className="text-[#1C1C1C]">cara bayar hutang cepat</strong> techniques that actually work.
          </p>
        </div>

        <div className="space-y-4">
          {POSTS.map((post, i) => (
            <Fragment key={post.slug}>
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-2xl bg-white border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold bg-[#FFF8DC] text-[#8B6000] px-2.5 py-1 rounded-full">
                    {post.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date} · {post.readTime}</span>
                </div>
                <h2 className="text-lg font-extrabold text-[#1C1C1C] mb-2 group-hover:text-[#8B6000] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                <p className="text-sm font-bold text-[#1C1C1C] mt-4 group-hover:underline">
                  Read article →
                </p>
              </Link>
              {i === 0 && <PublicAdBanner />} 
            </Fragment>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] px-6 py-8 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#FFD000] flex items-center justify-center text-xs">🐝</div>
            <span className="text-[#FFD000] font-bold text-sm">Beebas</span>
          </div>
          <div className="flex items-center gap-5 text-xs text-white/40">
            <Link href="/about" className="hover:text-white/70 transition-colors">About</Link>
            <Link href="/blog" className="hover:text-white/70 transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/pricing" className="hover:text-white/70 transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
