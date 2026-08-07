import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PublicAdBanner } from '@/app/_components/public-ad-banner'

export const metadata: Metadata = {
  title: 'Cara Bayar Hutang Lebih Cepat — 7 Strategi Yang Berkesan',
  description: 'Dari snowball dan avalanche hingga pemindahan baki 0% dan rundingan kadar — setiap strategi yang boleh digunakan rakyat Malaysia untuk bayar hutang lebih cepat dan jimat ribuan ringgit.',
  openGraph: {
    type: 'article',
    title: 'Cara Bayar Hutang Lebih Cepat — 7 Strategi Yang Berkesan',
    description: 'Setiap strategi yang boleh digunakan rakyat Malaysia untuk bayar hutang lebih cepat dan jimat ribuan ringgit.',
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
  headline: 'Cara Bayar Hutang Lebih Cepat — 7 Strategi Yang Berkesan',
  description: 'Dari snowball dan avalanche hingga pemindahan baki 0% dan rundingan kadar — setiap strategi yang boleh digunakan rakyat Malaysia untuk bayar hutang lebih cepat.',
  datePublished: '2026-08-08',
  dateModified: '2026-08-08',
  author: { '@type': 'Organization', name: 'Beebas', url: 'https://beebas.my' },
  publisher: {
    '@type': 'Organization',
    name: 'Beebas',
    url: 'https://beebas.my',
    logo: { '@type': 'ImageObject', url: 'https://beebas.my/icon' },
  },
  url: 'https://beebas.my/blog/cara-bayar-hutang-cepat',
  mainEntityOfPage: 'https://beebas.my/blog/cara-bayar-hutang-cepat',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://beebas.my' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://beebas.my/blog' },
    { '@type': 'ListItem', position: 3, name: 'Cara Bayar Hutang Lebih Cepat' },
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
          <span>Strategi Hutang</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold bg-[#FFF8DC] text-[#8B6000] px-2.5 py-1 rounded-full">Strategi</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1C] mt-4 mb-4 leading-tight">
            Cara Bayar Hutang Lebih Cepat — 7 Strategi Yang Berkesan
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
            Kebanyakan rakyat Malaysia tahu mereka patut bayar hutang lebih cepat. Tapi sangat sedikit yang tahu teknik spesifik yang boleh memendekkan tempoh bertahun-tahun dan menjimatkan ribuan ringgit dalam faedah.
          </p>
          <p>
            Panduan ini merangkumi setiap strategi praktikal — dari yang terkenal hingga yang bank anda pasti tak akan beritahu. Tiada jargon, tiada kosong. Hanya teknik yang berkesan.
          </p>
        </div>

        <hr className="border-gray-100 mb-10" />

        {/* Article body */}
        <div className="space-y-12 text-[#1C1C1C]">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">1. Debt Snowball</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bayar minimum untuk semua hutang anda setiap bulan. Kemudian ambil setiap ringgit lebih yang anda ada dan lepaskan pada <strong className="text-[#1C1C1C]">baki terkecil</strong> terlebih dahulu — tak kira kadar faedah. Apabila hutang itu habis, masukkan bayarannya ke hutang seterusnya.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Logiknya bukan matematik — ia psikologi. Setiap hutang yang anda langsaikan memberi anda kemenangan, dan kemenangan membina momentum. Dave Ramsey mempopularkan kaedah ini di Amerika Syarikat; ia berfungsi sama baik di sini.
            </p>
            <Callout icon="📌" title="Contoh">
              Anda ada tiga hutang: RM 1,500 pinjaman peribadi, RM 4,200 kad kredit, RM 18,000 kereta. Selesaikan RM 1,500 dulu. Bila habis dalam 3 bulan, ambil bayaran itu dan tambah pada serangan kad kredit. Kemudian gaul kedua-duanya ke pinjaman kereta.
            </Callout>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-[#1C1C1C]">Cocok untuk:</strong> Orang yang perlukan kemenangan cepat untuk kekal bermotivasi.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">2. Debt Avalanche</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Mekanik yang sama seperti snowball — bayar minimum untuk semua, hantar tunai lebih pada satu sasaran — tapi anda selesaikan <strong className="text-[#1C1C1C]">kadar faedah tertinggi</strong> terlebih dahulu.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Secara matematik, avalanche menjimatkan lebih banyak wang. Kad kredit pada 18% setahun membelanjakan anda jauh lebih banyak berbanding pinjaman kereta pada 3.5% setahun. Melangsaikan hutang 18% dulu menghentikan pendarahan itu.
            </p>
            <Tip>
              Gunakan Beebas untuk membandingkan snowball vs avalanche secara berdampingan. Masukkan hutang anda sekali dan lihat berapa banyak faedah yang setiap strategi jimatkan — dan mana yang melangsaikan anda lebih awal.
            </Tip>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-[#1C1C1C]">Cocok untuk:</strong> Orang yang displin dan boleh kekal fokus tanpa kemenangan cepat.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">3. Gabungan Hutang (Debt Consolidation)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Gabungkan pelbagai hutang menjadi satu pinjaman pada <strong className="text-[#1C1C1C]">kadar faedah lebih rendah</strong>. Di Malaysia, ini biasanya bermakna:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Pinjaman peribadi konsolidasi</strong> — bank seperti CIMB, Maybank, dan RHB menawarkan pinjaman peribadi pada 6–12% setahun. Jika kad kredit anda pada 18%, menggabungkan ke pinjaman peribadi serta-merta mengurangkan kadar faedah separuh.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Program Pengurusan Kredit AKPK</strong> — Jika anda serius bermasalah, AKPK (Agensi Kaunseling dan Pengurusan Kredit) membantu rakyat Malaysia menyusun semula hutang terus dengan bank pada kadar yang dikurangkan. Ia percuma, disokong kerajaan, dan tak perlukan peguam.</span>
              </li>
            </ul>
            <div className="rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-sm text-red-800">
              <strong>Amaran:</strong> Konsolidasi hanya berfungsi jika anda berhenti menggunakan kad kredit yang baru dilangsaikan. Ramai orang menggabungkan, kemudian mengisi semula kad dan berakhir dengan lebih banyak hutang dari sebelumnya.
            </div>
          </section>

          {/* Ad — mid article */}
          <PublicAdBanner slot="in-article" />

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">4. Pemindahan Baki 0%</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Pindahkan baki kad kredit anda ke kad baru yang menawarkan <strong className="text-[#1C1C1C]">0% faedah untuk tempoh promosi</strong> — biasanya 6 hingga 24 bulan. Bank Malaysia (Maybank, CIMB, Hong Leong, HSBC) kerap menawarkan tawaran ini.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Semasa tempoh 0%, setiap ringgit yang anda bayar terus mengurangkan pokok — bukan untuk faedah. Ini boleh mempercepatkan pelunasan dengan ketara.
            </p>
            <Callout icon="⚠️" title="Perhatikan">
              <ul className="space-y-1">
                <li>• <strong>Yuran pemindahan</strong> — biasanya 1–5% daripada baki yang dipindahkan</li>
                <li>• <strong>Taraf kadar</strong> — faedah melonjak (selalunya 18%+) sebaik sahaja tempoh promosi berakhir</li>
                <li>• <strong>Pembayaran minimum</strong> — terlepas satu pun boleh membatalkan kadar 0%</li>
              </ul>
            </Callout>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-[#1C1C1C]">Peraturannya:</strong> Hanya buat pemindahan baki jika anda yakin boleh melangsaikan kebanyakan atau semua baki sebelum tempoh promosi berakhir.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">5. Debt Snowflaking</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ini tabiat, bukan strategi — tapi ia menggabungkan dengan kuat. Ideanya: bila-bila anda terima wang tak dijangka, letakkan terus pada hutang anda <em>segera</em>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bonus dari kerja? Jual sesuatu di Carousell? Dapat duit raya? Dapat refund cukai? Daripada membelanjakannya, lepaskan pada hutang sasaran anda pada hari yang sama sebelum anda biasa memilikinya.
            </p>
            <Tip>
              Walaupun RM 50 lebih terhadap hutang kad kredit 18% menjimatkan anda dengan ketara dalam jangka masa panjang. Semakin awal anda bayar, semakin banyak faedah yang anda elakkan.
            </Tip>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">6. Pembayaran Dua Mingguan (Biweekly)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Daripada membayar ansuran bulanan sekali sebulan, bayar <strong className="text-[#1C1C1C]">separuh jumlah setiap dua minggu</strong>.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Matematiknya: ada 52 minggu setahun, jadi pembayaran dua mingguan memberi anda 26 separuh pembayaran — yang bersamaan 13 pembayaran penuh sebulan berbanding 12. Anda membuat satu pembayaran penuh tambahan setahun tanpa perasan.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Pada pinjaman kereta RM 50,000 pada 4.5% selama 7 tahun, trik mudah ini sahaja boleh menjimatkan 6–8 bulan dan ribuan ringgit dalam faedah. Berfungsi terutamanya untuk pinjaman peribadi dan gadai janji.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">7. Rundingan Kadar — Yang Rakyat Malaysia Tak Pernah Cuba</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ini teknik yang paling kurang digunakan di Malaysia. Hubungi bank anda dan minta kadar faedah lebih rendah pada kad kredit anda.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ia kedengaran terlalu mudah. Ia berfungsi kerana:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Bank lebih suka pelanggan setia pada kadar yang dikurangkan berbanding pelanggan yang gagal bayar atau berpindah</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Jika anda telah jadi pelanggan selama 2+ tahun dengan sejarah pembayaran bersih, anda ada kuasa tawar-menawar</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Yang paling teruk mereka boleh katakan ialah tidak — tiada perubahan</span>
              </li>
            </ul>
            <Callout icon="📞" title="Skrip untuk digunakan">
              "Saya telah jadi pelanggan selama [X] tahun dan sentiasa membayar tepat pada masanya. Saya sedang berusaha melangsaikan baki saya lebih cepat. Adakah ada apa-apa yang anda boleh lakukan untuk buat sementara mengurangkan kadar faedah saya bagi membantu saya berbuat demikian?"
            </Callout>
            <p className="text-muted-foreground leading-relaxed">
              Walaupun pengurangan dari 18% ke 15% setahun pada baki RM 10,000 menjimatkan anda RM 300 setahun dalam faedah.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Summary table */}
          <section>
            <h2 className="text-2xl font-extrabold mb-6">Rujukan Pantas</h2>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm text-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Teknik</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Usaha</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Kesan</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden sm:table-cell">Cocok untuk</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Snowball', effort: 'Rendah', impact: 'Tinggi', best: 'Motivasi' },
                    { name: 'Avalanche', effort: 'Rendah', impact: 'Tertinggi', best: 'Jimat maksimum' },
                    { name: 'Konsolidasi', effort: 'Sederhana', impact: 'Tinggi', best: 'Pelbagai hutang' },
                    { name: 'Pemindahan baki 0%', effort: 'Sederhana', impact: 'Tinggi', best: 'Hutang kad kredit' },
                    { name: 'Snowflaking', effort: 'Rendah', impact: 'Sederhana', best: 'Wang tak dijangka' },
                    { name: 'Pembayaran biweekly', effort: 'Rendah', impact: 'Sederhana', best: 'Pinjaman' },
                    { name: 'Rundingan kadar', effort: 'Rendah', impact: 'Sederhana', best: 'Kad kredit' },
                  ].map((row, i) => (
                    <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-semibold text-[#1C1C1C]">{row.name}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.effort}</td>
                      <td className="px-4 py-3 text-center font-semibold text-emerald-600">{row.impact}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Final thought */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">Perkara Paling Penting</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tiada teknik ini berfungsi kecuali anda tahu tepat di mana anda berdiri. Kebanyakan rakyat Malaysia yang berhutang tak tahu jumlah baki mereka, kadar faedah gabungan, atau berapa lama masa yang diambil untuk bebas jika mereka hanya bayar minimum.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Itulah tempat Beebas masuk. Masukkan semua hutang anda, pilih strategi, dan lihat tarikh bebas hutang anda yang tepat — secara percuma.
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-[#1C1C1C] px-6 py-8 text-center">
          <div className="text-3xl mb-3">🐝</div>
          <h3 className="text-white font-extrabold text-xl mb-2">Lihat strategi mana yang terbaik untuk hutang anda</h3>
          <p className="text-white/50 text-sm mb-5">
            Masukkan hutang anda sekali. Beebas membandingkan snowball vs avalanche dan menunjukkan tarikh bebas hutang anda yang tepat.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup">
              <Button className="rounded-xl bg-[#FFD000] hover:bg-[#f0c400] text-[#1C1C1C] font-bold border-0 shadow-none px-8 h-11">
                Dapatkan pelan langsaikan percuma →
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
            <Link href="/blog/ptptn-berapa-lama-nak-habis" className="rounded-xl border border-gray-100 bg-gray-50 p-5 hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-[#8B6000]">PTPTN</span>
              <p className="font-bold text-sm text-[#1C1C1C] mt-1 leading-snug">PTPTN Berapa Lama Nak Habis? Ini Cara Kira & Strategi Bayar</p>
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