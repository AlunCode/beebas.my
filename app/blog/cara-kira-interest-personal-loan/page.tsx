import type { Metadata } from 'next'
import Link from 'next/link'
import { LinkButton } from '@/components/ui/link-button'
import { PublicAdBanner } from '@/app/_components/public-ad-banner'

export const metadata: Metadata = {
  title: 'Cara Kira Interest Personal Loan Malaysia — Panduan Lengkap',
  description: 'Panduan lengkap cara kira faedah pinjaman peribadi di Malaysia. Fahami flat rate vs reducing balance, kira ansuran bulanan, dan bandingkan pinjaman sebelum mohon.',
  openGraph: {
    type: 'article',
    title: 'Cara Kira Interest Personal Loan Malaysia — Panduan Lengkap',
    description: 'Panduan lengkap cara kira faedah pinjaman peribadi di Malaysia.',
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
  headline: 'Cara Kira Interest Personal Loan Malaysia — Panduan Lengkap',
  description: 'Panduan lengkap cara kira faedah pinjaman peribadi di Malaysia.',
  datePublished: '2026-08-08',
  dateModified: '2026-08-08',
  author: { '@type': 'Organization', name: 'Beebas', url: 'https://beebas.my' },
  publisher: {
    '@type': 'Organization',
    name: 'Beebas',
    url: 'https://beebas.my',
    logo: { '@type': 'ImageObject', url: 'https://beebas.my/icon' },
  },
  url: 'https://beebas.my/blog/cara-kira-interest-personal-loan',
  mainEntityOfPage: 'https://beebas.my/blog/cara-kira-interest-personal-loan',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://beebas.my' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://beebas.my/blog' },
    { '@type': 'ListItem', position: 3, name: 'Cara Kira Interest Personal Loan' },
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
          <LinkButton href="/signup" size="sm" className="rounded-lg bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 text-xs">
              Get started free
            </LinkButton>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
          <Link href="/blog" className="hover:text-[#1C1C1C] transition-colors">Blog</Link>
          <span>›</span>
          <span>Pinjaman</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold bg-[#FFF8DC] text-[#8B6000] px-2.5 py-1 rounded-full">Pinjaman</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1C] mt-4 mb-4 leading-tight">
            Cara Kira Interest Personal Loan Malaysia — Panduan Lengkap
          </h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>8 Ogos 2026</span>
            <span>·</span>
            <span>7 min baca</span>
            <span>·</span>
            <span>Oleh Beebas</span>
          </div>
        </div>

        {/* Intro */}
        <div className="text-muted-foreground leading-relaxed space-y-4 mb-10">
          <p className="text-lg text-[#1C1C1C] font-medium leading-relaxed">
            Bila anda mohon pinjaman peribadi di Malaysia, bank memberitahu anda kadar faedah — tapi berapa sebenarnya yang anda akan bayar? Jawapannya bergantung pada jenis kiraan faedah yang digunakan.
          </p>
          <p>
            Panduan ini menjelaskan perbezaan antara flat rate dan reducing balance, cara kira ansuran bulanan, dan bagaimana nak bandingkan pinjaman dengan tepat.
          </p>
        </div>

        <hr className="border-gray-100 mb-10" />

        {/* Article body */}
        <div className="space-y-12 text-[#1C1C1C]">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">1. Dua Jenis Kiraan Faedah Di Malaysia</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Di Malaysia, pinjaman peribadi menggunakan salah satu daripada dua jenis kiraan faedah. Memahami perbezaan ini adalah <strong className="text-[#1C1C1C]">sangat penting</strong> kerana ia mempengaruhi berapa banyak anda bayar secara keseluruhan.
            </p>

            <div className="space-y-6 my-6">
              <div className="rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-[#1C1C1C] mb-2">📌 Flat Rate (Kadar Tetap)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Faedah dikira berdasarkan <strong className="text-[#1C1C1C]">jumlah pinjaman asal</strong> untuk sepanjang tempoh pinjaman. Jumlah faedah tetap sama setiap bulan.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-[#1C1C1C]">Digunakan oleh:</strong> Kebanyakan bank Malaysia untuk pinjaman peribadi — Maybank, CIMB, RHB, Bank Rakyat
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-[#1C1C1C] mb-2">📌 Reducing Balance (Baki Berkurangan)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Faedah dikira berdasarkan <strong className="text-[#1C1C1C]">baki tertunggak</strong> yang semakin berkurang setiap bulan. Anda bayar lebih sedikit faedah dari bulan ke bulan.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-[#1C1C1C]">Digunakan oleh:</strong> Gadai janji, pinjaman kenderaan, sesetengah pinjaman peribadi
                </p>
              </div>
            </div>

            <Callout icon="⚠️" title="Kesilapan biasa">
              Kebanyakan orang fikir kadar faedah 5% bermakna mereka bayar 5% setahun. Tidak benar. Dengan flat rate 5% selama 5 tahun, anda sebenarnya membayar kadar efektif hampir 9% setahun kerana faedah dikira pada jumlah asal, bukan baki yang berkurangan.
            </Callout>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">2. Cara Kira Flat Rate</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-[#1C1C1C]">Formula:</strong>
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-4 my-4 text-sm font-mono text-[#1C1C1C]">
              Faedah bulanan = (Jumlah Pinjaman × Kadar × Tempoh) ÷ (Tempoh × 12)
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Atau lebih mudah:
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-4 my-4 text-sm font-mono text-[#1C1C1C]">
              Faedah bulanan = Jumlah Pinjaman × Kadar ÷ 12
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-[#1C1C1C]">Contoh:</strong> Pinjaman RM 50,000 pada 5% flat rate selama 5 tahun:
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-4 my-4 text-sm text-[#1C1C1C] space-y-2">
              <p>Jumlah faedah keseluruhan = RM 50,000 × 5% × 5 tahun = RM 12,500</p>
              <p>Jumlah yang perlu dibayar = RM 50,000 + RM 12,500 = <strong>RM 62,500</strong></p>
              <p>Bayaran bulanan = RM 62,500 ÷ 60 bulan = <strong>RM 1,041.67/bulan</strong></p>
            </div>
            <Tip>
              Kadar flat 5% kedengaran rendah. Tapi dengan reducing balance, kadar efektif sebenar hampir 9.1%. Sentiasa tanya bank sama ada mereka guna flat rate atau reducing balance.
            </Tip>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">3. Cara Kira Reducing Balance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-[#1C1C1C]">Formula:</strong>
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-4 my-4 text-sm font-mono text-[#1C1C1C]">
              Faedah bulanan = Baki tertunggak × (Kadar ÷ 12)
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-[#1C1C1C]">Contoh:</strong> Pinjaman RM 50,000 pada 5% reducing balance selama 5 tahun:
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-4 my-4 text-sm text-[#1C1C1C] space-y-2">
              <p>Bulan 1: Faedah = RM 50,000 × 5% ÷ 12 = RM 208.33</p>
              <p>Bulan 1: Pokok = RM 833.33 – RM 208.33 = RM 625.00</p>
              <p>Bulan 2: Baki = RM 50,000 – RM 625 = RM 49,375</p>
              <p>Bulan 2: Faedah = RM 49,375 × 5% ÷ 12 = RM 205.73</p>
              <p className="mt-2"><strong>Jumlah faedah keseluruhan: ~RM 6,583</strong> (berbanding RM 12,500 dengan flat rate!)</p>
            </div>
          </section>

          {/* Ad — mid article */}
          <PublicAdBanner slot="in-article" />

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">4. Perbandingan: Flat Rate vs Reducing Balance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Mari kita bandingkan pinjaman RM 50,000 pada kadar nominal 5% selama 5 tahun:
            </p>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm text-sm my-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground"></th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Flat Rate</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Reducing Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Kadar nominal', flat: '5%', reducing: '5%' },
                    { label: 'Jumlah faedah', flat: 'RM 12,500', reducing: 'RM 6,583' },
                    { label: 'Bayaran bulanan', flat: 'RM 1,042', reducing: 'RM 943' },
                    { label: 'Jumlah dibayar', flat: 'RM 62,500', reducing: 'RM 56,583' },
                    { label: 'Kadar efektif', flat: '~9.1%', reducing: '5%' },
                    { label: 'Perbezaan', flat: '', reducing: 'Jimat RM 5,917' },
                  ].map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-semibold text-[#1C1C1C]">{row.label}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.flat}</td>
                      <td className="px-4 py-3 text-center font-semibold text-emerald-600">{row.reducing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout icon="💡" title="Kesimpulan">
              Pada kadar nominal yang sama, reducing balance menjimatkan anda <strong>hampir RM 6,000</strong> untuk pinjaman RM 50,000 selama 5 tahun. Sentiasa tanya bank jenis kiraan yang mereka guna.
            </Callout>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">5. Cara Tukar Flat Rate Ke Reducing Balance</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Jika bank memberitahu anda kadar flat rate, anda boleh menukarkannya kepada kadar efektif (reducing balance) untuk perbandingan sebenar.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-[#1C1C1C]">Anggaran kasar:</strong>
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-4 my-4 text-sm text-[#1C1C1C]">
              Kadar efektif ≈ Kadar flat × 1.8 (untuk pinjaman 5 tahun)<br />
              Kadar efektif ≈ Kadar flat × 1.7 (untuk pinjaman 3 tahun)<br />
              Kadar efektif ≈ Kadar flat × 1.9 (untuk pinjaman 7 tahun)
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Jadi flat rate 4% selama 5 tahun ≈ 7.2% efektif. Flat rate 6% ≈ 10.8% efektif.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">6. Senarai Semak Sebelum Mohon Pinjaman Peribadi</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sebelum mohon pinjaman peribadi, pastikan anda tahu:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Jenis kiraan</strong> — flat rate atau reducing balance?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Kadar efektif sebenar</strong> — bukan hanya kadar yang diiklankan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Yuran pemprosesan</strong> — biasanya 1-2% dari jumlah pinjaman</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Denda penyelesaian awal</strong> — ada bank kenakan denda jika anda langsaikan sebelum tempoh tamat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Jumlah bayaran keseluruhan</strong> — berapa banyak anda akan bayar dari mula hingga akhir</span>
              </li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">7. Kadar Faedah Pinjaman Peribadi Di Malaysia (2026)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Berikut adalah kadar tipikal untuk pinjaman peribadi di Malaysia:
            </p>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm text-sm my-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Bank</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Kadar (Flat)</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center hidden sm:table-cell">Kadar Efektif</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { bank: 'Maybank', flat: '4.3 - 8.3%', effective: '~7.7 - 14.9%' },
                    { bank: 'CIMB', flat: '4.5 - 8.5%', effective: '~8.1 - 15.3%' },
                    { bank: 'RHB', flat: '4.0 - 8.0%', effective: '~7.2 - 14.4%' },
                    { bank: 'Bank Rakyat', flat: '3.5 - 7.5%', effective: '~6.3 - 13.5%' },
                    { bank: 'Public Bank', flat: '4.5 - 8.5%', effective: '~8.1 - 15.3%' },
                  ].map((row, i) => (
                    <tr key={row.bank} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-semibold text-[#1C1C1C]">{row.bank}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.flat}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground hidden sm:table-cell">{row.effective}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Tip>
              Kadar yang anda dapat bergantung pada gaji, sejarah kredit, dan jumlah pinjaman. Guna kalkulator Beebas untuk masukkan kadar sebenar anda dan kira ansuran bulanan yang tepat.
            </Tip>
          </section>

          <hr className="border-gray-100" />

          {/* Final thought */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">Langkah Seterusnya</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Jangan terima kadar pertama yang ditawarkan. Bandingkan beberapa bank, tanya tentang jenis kiraan, dan kira jumlah bayaran keseluruhan sebelum mohon.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beebas membantu anda kira semuanya — masukkan pinjaman peribadi anda ke dalam kalkulator dan lihat tepat berapa anda akan bayar dan bila anda akan bebas dari hutang.
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-[#1C1C1C] px-6 py-8 text-center">
          <div className="text-3xl mb-3">🐝</div>
          <h3 className="text-white font-extrabold text-xl mb-2">Kira pinjaman peribadi anda sekarang</h3>
          <p className="text-white/50 text-sm mb-5">
            Masukkan semua hutang anda — termasuk pinjaman peribadi — dan lihat tarikh bebas hutang anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <LinkButton href="/signup" className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none px-8 h-11">
                Mulakan sekarang →
              </LinkButton>
            <LinkButton href="/#calculator" variant="outline" className="rounded-xl border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent font-bold h-11 px-8">
                Cuba kalkulator percuma
              </LinkButton>
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
            <Link href="/blog/kalkulator-hutang-malaysia" className="rounded-xl border border-gray-100 bg-gray-50 p-5 hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-[#8B6000]">Kalkulator</span>
              <p className="font-bold text-sm text-[#1C1C1C] mt-1 leading-snug">Kalkulator Hutang Malaysia — Cara Kira & Kurangkan Hutang Anda</p>
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