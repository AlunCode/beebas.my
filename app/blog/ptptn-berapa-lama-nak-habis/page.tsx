import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicAdBanner } from '@/app/_components/public-ad-banner'

export const metadata: Metadata = {
  title: 'PTPTN Berapa Lama Nak Habis? Ini Cara Kira & Strategi Bayar',
  description: 'Lebih 1.2 juta rakyat Malaysia disenarai hitam oleh PTPTN. Kebanyakan tak bermaksud gagal bayar — mereka tak ada pelan. Ini cara kira bila PTPTN anda akan habis dan strategi untuk langsaikan lebih cepat.',
  openGraph: {
    type: 'article',
    title: 'PTPTN Berapa Lama Nak Habis? Ini Cara Kira & Strategi Bayar',
    description: 'Cara kira bila PTPTN anda akan habis dan strategi untuk langsaikan lebih cepat.',
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
  headline: 'PTPTN Berapa Lama Nak Habis? Ini Cara Kira & Strategi Bayar',
  description: 'Lebih 1.2 juta rakyat Malaysia disenarai hitam oleh PTPTN. Ini cara kira bila PTPTN anda akan habis.',
  datePublished: '2026-08-08',
  dateModified: '2026-08-08',
  author: { '@type': 'Organization', name: 'Beebas', url: 'https://beebas.my' },
  publisher: {
    '@type': 'Organization',
    name: 'Beebas',
    url: 'https://beebas.my',
    logo: { '@type': 'ImageObject', url: 'https://beebas.my/icon' },
  },
  url: 'https://beebas.my/blog/ptptn-berapa-lama-nak-habis',
  mainEntityOfPage: 'https://beebas.my/blog/ptptn-berapa-lama-nak-habis',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://beebas.my' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://beebas.my/blog' },
    { '@type': 'ListItem', position: 3, name: 'PTPTN Berapa Lama Nak Habis' },
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
          <span>PTPTN</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold bg-[#FFF8DC] text-[#8B6000] px-2.5 py-1 rounded-full">PTPTN</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1C] mt-4 mb-4 leading-tight">
            PTPTN Berapa Lama Nak Habis? Ini Cara Kira & Strategi Bayar
          </h1>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>8 Ogos 2026</span>
            <span>·</span>
            <span>8 min baca</span>
            <span>·</span>
            <span>Oleh Beebas</span>
          </div>
        </div>

        {/* Intro */}
        <div className="text-muted-foreground leading-relaxed space-y-4 mb-10">
          <p className="text-lg text-[#1C1C1C] font-medium leading-relaxed">
            Lebih 1.2 juta rakyat Malaysia disenarai hitam oleh PTPTN kerana gagal membayar pinjaman pendidikan mereka. Kebanyakan tak bermaksud gagal bayar — mereka cuma tak tahu berapa lama lagi yang tinggal atau cara melangsaikan lebih cepat.
          </p>
          <p>
            Panduan ini menunjukkan cara kira bila PTPTN anda akan habis, strategi untuk langsaikan lebih cepat, dan cara kekal di luar senarai hitam.
          </p>
        </div>

        <hr className="border-gray-100 mb-10" />

        {/* Article body */}
        <div className="space-y-12 text-[#1C1C1C]">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">1. Berapa Lama PTPTN Ambil Masa Untuk Habis?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tempoh asal pinjaman PTPTN biasanya <strong className="text-[#1C1C1C]">10 tahun</strong> dari tarikh anda mula bekerja. Tapi ramai graduate mengambil masa jauh lebih lama kerana mereka hanya bayar minimum — atau tak bayar langsung.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Berikut adalah anggaran berdasarkan jumlah pinjaman biasa:
            </p>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm text-sm my-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Jumlah Pinjaman</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Bayaran minimum</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Masa habis</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center hidden sm:table-cell">Jumlah faedah</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { amount: 'RM 15,000', min: 'RM 95', time: '20+ tahun', interest: 'RM 8,200+' },
                    { amount: 'RM 25,000', min: 'RM 155', time: '19+ tahun', interest: 'RM 12,000+' },
                    { amount: 'RM 50,000', min: 'RM 310', time: '18+ tahun', interest: 'RM 21,000+' },
                    { amount: 'RM 80,000', min: 'RM 495', time: '17+ tahun', interest: 'RM 32,000+' },
                  ].map((row, i) => (
                    <tr key={row.amount} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-semibold text-[#1C1C1C]">{row.amount}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.min}</td>
                      <td className="px-4 py-3 text-center text-red-600 font-semibold">{row.time}</td>
                      <td className="px-4 py-3 text-center text-red-600 hidden sm:table-cell">{row.interest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout icon="⚠️" title="Perhatikan">
              Kadar faedah PTPTN adalah <strong>1% setahun</strong> (diperkenalkan mulai 2024, dikurangkan dari 4%). Ini bermakna walaupun kadar rendah, jumlah faedah terkumpul masih ketara kerana tempoh pinjaman yang panjang.
            </Callout>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">2. Cara Kira PTPTN Anda Secara Manual</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Untuk kira berapa lama PTPTN anda akan habis, anda perlu tahu tiga perkara:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Jumlah baki pinjaman</strong> — semak di portal PTPTN atau myPTPTN app</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Kadar faedah semasa</strong> — 1% setahun (2024 dan seterusnya)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Bayaran bulanan anda</strong> — berapa yang anda mampu bayar setiap bulan</span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-[#1C1C1C]">Contoh kiraan:</strong> Baki RM 30,000 pada 1% faedah, bayar RM 300/bulan:
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-4 my-4 text-sm text-[#1C1C1C] space-y-2">
              <p>Faedah bulanan: RM 30,000 × (1% ÷ 12) = RM 25/bulan</p>
              <p>Pokok yang dibayar: RM 300 – RM 25 = RM 275/bulan</p>
              <p>Masa langsaikan: ~109 bulan = <strong>~9 tahun</strong></p>
              <p>Jumlah faedah: ~RM 2,750</p>
            </div>
            <Tip>
              Gunakan kalkulator Beebas untuk kira tepat — masukkan baki PTPTN anda dan lihat bila ia akan habis berdasarkan bayaran semasa anda.
            </Tip>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">3. Senarai Hitam PTPTN — Apa Yang Perlu Anda Tahu</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PTPTN boleh menyenaraikan anda dalam CCRIS (Central Credit Reference Information System) jika anda gagal bayar. Akibatnya:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Tak boleh apply pinjaman</strong> — bank akan reject permohonan kad kredit, pinjaman peribadi, atau gadai janji</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Potongan gaji</strong> — majikan boleh dituntut untuk potong gaji secara langsung</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Tak boleh keluar negara</strong> — PTPTN boleh menahan pasport anda</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Skim Potongan Gaji</strong> — jika gaji anda melebihi RM 2,000, PTPTN akan memotong 8-15% secara langsung</span>
              </li>
            </ul>
            <div className="rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-sm text-red-800">
              <strong>Penting:</strong> Jika anda telah disenarai hitam, hubungi PTPTN segera untuk rancang semula pembayaran. Mereka biasanya bersedia bekerjasama — terutamanya jika anda boleh tunjukkan usaha untuk membayar.
            </div>
          </section>

          {/* Ad — mid article */}
          <PublicAdBanner slot="in-article" />

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">4. 5 Strategi Untuk Langsaikan PTPTN Lebih Cepat</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Strategi 1: Bayar lebih dari minimum</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Jika bayaran minimum anda RM 150, cuba bayar RM 300 atau RM 500. Pada kadar 1%, lebih banyak wang pergi terus ke pokok. Tambahan RM 200/bulan boleh memendekkan tempoh 3-4 tahun.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Strategi 2: Gunakan diskaun PTPTN</h3>
                <p className="text-muted-foreground leading-relaxed">
                  PTPTN kerap menawarkan diskaun pelunasan penuh — biasanya 10-20% diskaun pada jumlah baki. Jika anda ada simpanan yang mencukupi, ini cara paling menjimatkan untuk langsaikan sekaligus.
                </p>
                <Callout icon="💰" title="Diskaun PTPTN">
                  PTPTN biasanya mengumumkan diskaun pelunasan penuh menjelang hari raya atau tarikh akhir tahun. Pantau laman web PTPTN dan media sosial mereka untuk tawaran terkini.
                </Callout>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Strategi 3: Tarik EPF untuk bayar PTPTN</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Anda boleh menarik Simpanan 2 (Akaun 2) EPF untuk membayar PTPTN. Ini membantu jika anda ada baki EPF yang tidak digunakan. Tetapi pertimbangkan kesan jangka panjang pada pencen anda.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Strategi 4: Bayar setiap bulan, jangan skip</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Disiplin adalah kunci. Setup potongan gaji automatik supaya anda tak perlu ingat untuk bayar. Konsistensi lebih penting daripada jumlah — walaupun RM 100 sebulan lebih baik daripada bayar sekali-sekala.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">Strategi 5: Masukkan dalam pelan hutang keseluruhan</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Jangan layan PTPTN secara berasingan. Masukkan ia ke dalam kalkulator hutang anda bersama semua hutang lain. Gunakan strategi snowball atau avalanche untuk tentukan bila dan berapa banyak untuk bayar pada PTPTN berbanding hutang lain.
                </p>
                <Tip>
                  Jika kad kredit anda pada 18% dan PTPTN pada 1%, bayar minimum pada PTPTN dan selesaikan kad kredit dulu. Kemudian masukkan semula wang itu ke PTPTN selepas kad kredit habis.
                </Tip>
              </div>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">5. PTPTN vs Hutang Lain — Mana Yang Patut Dibayar Dulu?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Peraturan mudah: <strong className="text-[#1C1C1C]">selesaikan kadar faedah tertinggi dulu</strong> (strategi avalanche). Dengan PTPTN pada 1%, ia sepatutnya menjadi yang terakhir dalam senarai anda — kecuali jika anda berisiko disenarai hitam.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-[#1C1C1C]">Keutamaan pembayaran:</strong>
            </p>
            <ol className="space-y-2 text-muted-foreground mb-4 list-decimal list-inside">
              <li><strong className="text-[#1C1C1C]">Kad kredit</strong> (15-18% setahun) — selesaikan dahulu</li>
              <li><strong className="text-[#1C1C1C]">Pinjaman peribadi</strong> (6-12% setahun)</li>
              <li><strong className="text-[#1C1C1C]">Pinjaman kereta</strong> (3-4.5% setahun)</li>
              <li><strong className="text-[#1C1C1C]">PTPTN</strong> (1% setahun) — bayar minimum sambil selesaikan yang lain</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed">
              Kecuali — jika PTPTN anda menghampiri tempoh 10 tahun atau anda berisiko disenarai hitam. Dalam kes itu, pastikan anda sentiasa bayar minimum PTPTN untuk kekal selamat.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">6. Cara Semak Baki PTPTN Anda</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tiga cara untuk semak baki pinjaman PTPTN anda:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">myPTPTN app</strong> — muat turun dari App Store atau Google Play, log masuk dengan IC anda</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Portal PTPTN</strong> — layari ptptn.com.my dan log masuk ke akaun anda</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">WhatsApp PTPTN</strong> — hantar mesej ke 012-400 0077 dengan format: STATUS [nombor IC]</span>
              </li>
            </ul>
          </section>

          <hr className="border-gray-100" />

          {/* Final thought */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">Langkah Seterusnya</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Langkah pertama: semak baki PTPTN anda sekarang. Kemudian masukkan ke dalam kalkulator hutang Beebas bersama semua hutang lain untuk lihat gambaran penuh.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Dengan pelan yang jelas, anda boleh nampak tarikh bebas hutang anda — termasuk PTPTN — dan kerja ke arahnya setiap bulan.
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-[#1C1C1C] px-6 py-8 text-center">
          <div className="text-3xl mb-3">🐝</div>
          <h3 className="text-white font-extrabold text-xl mb-2">Masukkan PTPTN anda ke dalam pelan pelunasan</h3>
          <p className="text-white/50 text-sm mb-5">
            Masukkan semua hutang anda — termasuk PTPTN — dan lihat tarikh bebas hutang anda yang tepat.
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
            <Link href="/blog/akpk-debt-management-programme" className="rounded-xl border border-gray-100 bg-gray-50 p-5 hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-[#8B6000]">AKPK</span>
              <p className="font-bold text-sm text-[#1C1C1C] mt-1 leading-snug">AKPK Debt Management Programme — Cara Mohon & Apa Yang Perlu Tahu</p>
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