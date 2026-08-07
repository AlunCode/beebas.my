import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicAdBanner } from '@/app/_components/public-ad-banner'

export const metadata: Metadata = {
  title: 'Kalkulator Hutang Malaysia — Cara Kira & Kurangkan Hutang Anda',
  description: 'Gunakan kalkulator hutang percuma untuk kira baki, faedah, dan tarikh bebas hutang anda. Bandingkan strategi snowball vs avalanche dan lihat berapa banyak anda boleh jimat.',
  openGraph: {
    type: 'article',
    title: 'Kalkulator Hutang Malaysia — Cara Kira & Kurangkan Hutang Anda',
    description: 'Kalkulator hutang percuma untuk kira baki, faedah, dan tarikh bebas hutang anda.',
  },
}

function Callout({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#FFF8DC] border border-[#FFD000]/30 px-6 py-5 my-6">
      <p className="font-bold text-[#1C1C1C] mb-2">{icon} {title}</p>
      <div className="text-sm text-[#8B6000] leading-relaxed">{children}</div>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4 my-4 text-sm text-emerald-800 leading-relaxed">
      <span className="font-bold">Pro tip: </span>{children}
    </div>
  )
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Kalkulator Hutang Malaysia — Cara Kira & Kurangkan Hutang Anda',
  description: 'Gunakan kalkulator hutang percuma untuk kira baki, faedah, dan tarikh bebas hutang anda.',
  datePublished: '2026-08-08',
  dateModified: '2026-08-08',
  author: { '@type': 'Organization', name: 'Beebas', url: 'https://beebas.my' },
  publisher: {
    '@type': 'Organization',
    name: 'Beebas',
    url: 'https://beebas.my',
    logo: { '@type': 'ImageObject', url: 'https://beebas.my/icon' },
  },
  url: 'https://beebas.my/blog/kalkulator-hutang-malaysia',
  mainEntityOfPage: 'https://beebas.my/blog/kalkulator-hutang-malaysia',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://beebas.my' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://beebas.my/blog' },
    { '@type': 'ListItem', position: 3, name: 'Kalkulator Hutang Malaysia' },
  ],
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {/* Navbar */}
      <nav className="bg-[#1C1C1C] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-base">🐝</div>
          <span className="text-[#FFD000] font-bold text-lg tracking-tight">Beebas</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">About</Link>
          <Link href="/pricing" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Pricing</Link>
          <Link href="/blog" className="text-sm text-white/60 hover:text-white transition-colors hidden sm:block">Blog</Link>
          <Link href="/login" className="text-sm text-white/60 hover:text-white transition-colors">Log in</Link>
          <Link href="/signup">
            <Button size="sm" className="rounded-lg bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 text-xs">
              Get started free
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/blog" className="hover:text-[#1C1C1C] transition-colors">Blog</Link>
          <span>›</span>
          <span>Kalkulator</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold bg-[#FFF8DC] text-[#8B6000] px-2.5 py-1 rounded-full">Kalkulator</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1C] mt-4 mb-4 leading-tight">
            Kalkulator Hutang Malaysia — Cara Kira & Kurangkan Hutang Anda
          </h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>8 Ogos 2026</span>
            <span>·</span>
            <span>6 min baca</span>
            <span>·</span>
            <span>Oleh Beebas</span>
          </div>
        </div>

        {/* Intro */}
        <div className="text-muted-foreground leading-relaxed space-y-4 mb-10">
          <p className="text-lg text-[#1C1C1C] font-medium leading-relaxed">
            Berapa sebenarnya anda perlu bayar untuk langsaikan semua hutang anda? Kebanyakan rakyat Malaysia tak tahu jawapannya. Mereka cuma bayar minimum setiap bulan dan berharap yang terbaik.
          </p>
          <p>
            Panduan ini menunjukkan cara kira hutang anda dengan tepat, memahami berapa banyak faedah yang anda sebenarnya bayar, dan gunakan kalkulator untuk cari jalan keluar yang paling pantas.
          </p>
        </div>

        <hr className="border-gray-100 mb-10" />

        {/* Article body */}
        <div className="space-y-12 text-[#1C1C1C]">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">1. Kenapa Anda Perlukan Kalkulator Hutang?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tanpa kalkulator, anda hanya meneka. Dan meneka dengan wang sebenar adalah recipe untuk terus berhutang selamanya.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kalkulator hutang memberitahu anda:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Baki sebenar</strong> — jumlah semua hutang anda termasuk faedah terkumpul</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Kadar faedah gabungan</strong> — berapa rata-rata anda bayar untuk setiap ringgit hutang</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Tempoh pelunasan</strong> — bila anda akan bebas hutang jika terus bayar seperti sekarang</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Kesan bayaran lebih</strong> — berapa banyak masa dan wang yang anda jimat dengan membayar lebih</span>
              </li>
            </ul>
            <Callout icon="📊" title="Fakta mengejutkan">
              Pada kad kredit RM 10,000 pada 18% faedah, jika anda hanya bayar RM 200 sebulan, anda akan ambil <strong>7 tahun</strong> untuk langsaikan — dan bayar RM 5,800 dalam faedah sahaja. Itu lebih dari separuh jumlah asal!
            </Callout>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">2. Cara Kira Faedah Hutang Secara Manual</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sebelum guna kalkulator, fahami asas kiraan faedah. Ini membantu anda tahu sama ada kalkulator beri angka yang betul.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-[#1C1C1C]">Formula asas:</strong>
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-4 my-4 text-sm font-mono text-[#1C1C1C]">
              Faedah bulanan = Baki × (Kadar / 12)
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-[#1C1C1C]">Contoh:</strong> Kad kredit RM 10,000 pada 18% setahun:
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-4 my-4 text-sm text-[#1C1C1C]">
              RM 10,000 × (18% ÷ 12) = RM 10,000 × 1.5% = <strong>RM 150 sebulan dalam faedah sahaja</strong>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Itu bermakna daripada RM 200 yang anda bayar, hanya RM 50 pergi ke pokok. RM 150 lain habis untuk faedah. Pada kadar ini, anda tak akan ke mana-mana.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">3. Cara Kira Keseluruhan Hutang Anda</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Langkah pertama: senarai <strong className="text-[#1C1C1C]">semua</strong> hutang anda. Setiap satu. Termasuk yang kecil.
            </p>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm text-sm my-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Hutang</th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Baki</th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Kadar</th>
                    <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Bayaran/bulan</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Kad kredit Maybank', balance: 'RM 12,500', rate: '18%', payment: 'RM 375' },
                    { name: 'Pinjaman peribadi CIMB', balance: 'RM 25,000', rate: '8%', payment: 'RM 620' },
                    { name: 'Pinjaman kereta', balance: 'RM 48,000', rate: '3.5%', payment: 'RM 780' },
                    { name: 'PTPTN', balance: 'RM 22,000', rate: '4%', payment: 'RM 250' },
                  ].map((row, i) => (
                    <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-semibold text-[#1C1C1C]">{row.name}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{row.balance}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{row.rate}</td>
                      <td className="px-4 py-3 text-right text-muted-foreground">{row.payment}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 border-t border-gray-100 font-bold">
                    <td className="px-4 py-3 text-[#1C1C1C]">JUMLAH</td>
                    <td className="px-4 py-3 text-right text-[#1C1C1C]">RM 107,500</td>
                    <td className="px-4 py-3 text-right text-[#8B6000]">~8.5% purata</td>
                    <td className="px-4 py-3 text-right text-[#1C1C1C]">RM 2,025</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Tip>
              Jangan lupa masukkan semua hutang — termasuk hutang keluarga, PTPTN, pinjaman peribadi, dan kad kredit kedua. Ramai orang lupa satu atau dua hutang kecil dan kiraan mereka tak tepat.
            </Tip>
          </section>

          {/* Ad — mid article */}
          <PublicAdBanner slot="in-article" />

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">4. Gunakan Kalkulator Beebas (Percuma)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Daripada kira manual, gunakan kalkulator hutang Beebas yang direka khusus untuk rakyat Malaysia.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-[#1C1C1C]">Apa yang kalkulator Beebas buat:</strong>
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Masukkan semua hutang anda sekali gus — kad kredit, pinjaman peribadi, kereta, PTPTN, gadai janji</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Bandingkan strategi <strong className="text-[#1C1C1C]">snowball vs avalanche</strong> secara berdampingan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Tunjukkan tarikh bebas hutang anda yang tepat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Kira berapa banyak faedah yang anda jimat dengan bayaran lebih</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Eksport pelan pelunasan sebagai PDF atau CSV</span>
              </li>
            </ul>
            <div className="rounded-2xl bg-[#1C1C1C] p-6 text-center my-6">
              <p className="text-white font-bold mb-3">Cuba kalkulator hutang Beebas secara percuma</p>
              <Link href="/signup">
                <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0">
                  Mulakan sekarang →
                </Button>
              </Link>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">5. Memahami Kesan Faedah Berperingkat (Compound Interest)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Faedah berperingkat adalah musuh terbesar anda — atau sahabat terbaik anda, bergantung pada sisi mana anda berada.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Apabila anda berhutang, faedah ditambah pada baki anda. Bulan depan, anda bayar faedah atas faedah. Inilah sebab mengapa hutang kad kredit boleh berkembang dengan pantas walaupun anda bayar minimum.
            </p>
            <Callout icon="⚠️" title="Contoh reality check">
              RM 5,000 pada kad kredit 18% dengan bayaran minimum RM 100/bulan:<br />
              • Masa untuk langsaikan: <strong>9 tahun 4 bulan</strong><br />
              • Jumlah faedah yang dibayar: <strong>RM 6,132</strong><br />
              • Jumlah yang dibayar keseluruhan: <strong>RM 11,132</strong><br />
              Anda membayar lebih dari <strong>double</strong> jumlah asal!
            </Callout>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">6. Strategi Mana Yang Paling Jimat?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Dua strategi utama untuk langsaikan hutang:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Snowball</strong> — selesaikan baki terkecil dulu. Cepat dapat kemenangan, kekal bermotivasi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Avalanche</strong> — selesaikan kadar faedah tertinggi dulu. Jimat lebih banyak wang secara matematik.</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Kalkulator Beebas menunjukkan perbezaan sebenar antara kedua-dua strategi untuk hutang <em>anda</em> — bukan contoh umum.
            </p>
            <Tip>
              Kebanyakan orang fikir perbezaannya kecil. Sebenarnya, pada hutang besar (RM 50,000+), perbezaan antara snowball dan avalanche boleh mencecah ribuan ringgit dalam faedah. Kalkulator menunjukkan angka sebenar.
            </Tip>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">7. Cara Kurangkan Hutang Dengan Kesan Bayaran Lebih</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Perkara paling mudah yang anda boleh buat untuk langsaikan hutang lebih cepat: bayar lebih dari minimum.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Gunakan kalkulator untuk main dengan nombor:
            </p>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm text-sm my-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Bayaran/bulan</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Masa langsaikan</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Jumlah faedah</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { payment: 'RM 100 (minimum)', time: '9 tahun 4 bulan', interest: 'RM 6,132' },
                    { payment: 'RM 200', time: '2 tahun 8 bulan', interest: 'RM 1,487' },
                    { payment: 'RM 300', time: '1 tahun 7 bulan', interest: 'RM 924' },
                    { payment: 'RM 500', time: '11 bulan', interest: 'RM 440' },
                  ].map((row, i) => (
                    <tr key={row.payment} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-semibold text-[#1C1C1C]">{row.payment}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.time}</td>
                      <td className="px-4 py-3 text-center font-semibold text-emerald-600">{row.interest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Dari RM 100 ke RM 300 sebulan — anda menjimatkan <strong className="text-[#1C1C1C]">RM 5,208 dalam faedah</strong> dan langsaikan hutang 8 tahun lebih awal. Itulah kuasa kalkulator.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Final thought */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">Langkah Seterusnya</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Jangan teka lagi. Masukkan nombor anda ke dalam kalkulator, lihat realiti, dan buat pelan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beebas membantu anda berbuat semua ini secara percuma — tanpa daftar akaun, tanpa kad kredit. Masukkan hutang anda, pilih strategi, dan lihat tarikh bebas hutang anda.
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-[#1C1C1C] px-6 py-8 text-center">
          <div className="text-3xl mb-3">🐝</div>
          <h3 className="text-white font-extrabold text-xl mb-2">Kira hutang anda sekarang — percuma</h3>
          <p className="text-white/50 text-sm mb-5">
            Masukkan hutang anda, lihat tarikh bebas, dan bandingkan strategi. Tanpa daftar akaun.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none px-8 h-11">
                Mulakan sekarang →
              </Button>
            </Link>
            <Link href="/#calculator">
              <Button variant="outline" className="rounded-xl border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent font-bold h-11 px-8">
                Cuba kalkulator percuma
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-14">
          <h3 className="text-lg font-extrabold text-[#1C1C1C] mb-4">Artikel Berkaitan</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog/cara-bayar-hutang-cepat" className="rounded-xl border border-gray-100 bg-gray-50 p-5 hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-[#8B6000]">Strategi</span>
              <p className="font-bold text-sm text-[#1C1C1C] mt-1 leading-snug">Cara Bayar Hutang Lebih Cepat — 7 Strategi Yang Berkesan</p>
            </Link>
            <Link href="/blog/cara-kira-interest-personal-loan" className="rounded-xl border border-gray-100 bg-gray-50 p-5 hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-[#8B6000]">Pinjaman</span>
              <p className="font-bold text-sm text-[#1C1C1C] mt-1 leading-snug">Cara Kira Interest Personal Loan Malaysia — Panduan Lengkap</p>
            </Link>
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-10 text-center">
          <Link href="/blog" className="text-sm font-semibold text-muted-foreground hover:text-[#1C1C1C] transition-colors">
            ← Kembali ke semua artikel
          </Link>
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