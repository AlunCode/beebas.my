import type { Metadata } from 'next'
import Link from 'next/link'
import { LinkButton } from '@/components/ui/link-button'
import { PublicAdBanner } from '@/app/_components/public-ad-banner'

export const metadata: Metadata = {
  title: 'AKPK Debt Management Programme — Cara Mohon & Apa Yang Perlu Tahu',
  description: 'Panduan lengkap Program Pengurusan Kredit AKPK — siapa yang layak, cara mohon, kesan pada CCRIS, dan apa yang berlaku selepas anda sertai. Percuma, disokong kerajaan.',
  openGraph: {
    type: 'article',
    title: 'AKPK Debt Management Programme — Cara Mohon & Apa Yang Perlu Tahu',
    description: 'Panduan lengkap Program Pengurusan Kredit AKPK — siapa yang layak, cara mohon.',
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
  headline: 'AKPK Debt Management Programme — Cara Mohon & Apa Yang Perlu Tahu',
  description: 'Panduan lengkap Program Pengurusan Kredit AKPK — siapa yang layak, cara mohon, kesan pada CCRIS.',
  datePublished: '2026-08-08',
  dateModified: '2026-08-08',
  author: { '@type': 'Organization', name: 'Beebas', url: 'https://beebas.my' },
  publisher: {
    '@type': 'Organization',
    name: 'Beebas',
    url: 'https://beebas.my',
    logo: { '@type': 'ImageObject', url: 'https://beebas.my/icon' },
  },
  url: 'https://beebas.my/blog/akpk-debt-management-programme',
  mainEntityOfPage: 'https://beebas.my/blog/akpk-debt-management-programme',
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://beebas.my' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://beebas.my/blog' },
    { '@type': 'ListItem', position: 3, name: 'AKPK Debt Management Programme' },
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
          <span>AKPK</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold bg-[#FFF8DC] text-[#8B6000] px-2.5 py-1 rounded-full">AKPK</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1C1C] mt-4 mb-4 leading-tight">
            AKPK Debt Management Programme — Cara Mohon & Apa Yang Perlu Tahu
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
            Jika anda bergelut dengan hutang dan rasa tiada jalan keluar, AKPK (Agensi Kaunseling dan Pengurusan Kredit) mungkin jawapan yang anda cari. Program ini percuma, disokong kerajaan, dan telah membantu beratus-ribu rakyat Malaysia menyusun semula hutang mereka.
          </p>
          <p>
            Panduan ini merangkumi segalanya — dari siapa yang layak hingga apa yang berlaku selepas anda sertai program ini.
          </p>
        </div>

        <hr className="border-gray-100 mb-10" />

        {/* Article body */}
        <div className="space-y-12 text-[#1C1C1C]">

          {/* 1 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">1. Apa Itu AKPK?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              AKPK ditubuhkan oleh Bank Negara Malaysia pada tahun 2006 untuk membantu rakyat Malaysia menguruskan masalah kewangan. Ia menyediakan tiga perkhidmatan utama:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Kaunseling percuma</strong> — sesi satu-lawan-satu dengan kaunselor bertauliah</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Program Pengurusan Kredit (DMP)</strong> — penyusunan semula hutang dengan bank</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Program Kewangan Pintar</strong> — pendidikan kewangan untuk kumpulan</span>
              </li>
            </ul>
            <Callout icon="📊" title="Fakta AKPK">
              Sejak penubuhannya, AKPK telah membantu lebih <strong>300,000 individu</strong> melalui Program Pengurusan Kredit. Jumlah hutang yang telah disusun semula melebihi <strong>RM 20 bilion</strong>.
            </Callout>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">2. Siapa Yang Layak Untuk DMP?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Untuk menyertai Program Pengurusan Kredit AKPK, anda perlu memenuhi syarat berikut:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Warganegara Malaysia</strong> berumur 18 tahun ke atas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Mempunyai <strong className="text-[#1C1C1C]">hutang dengan bank berlesen</strong> di Malaysia (kad kredit, pinjaman peribadi, pinjaman kenderaan, dll.)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Tidak mampu</strong> membuat pembayaran hutang seperti yang dijadualkan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span>Mempunyai <strong className="text-[#1C1C1C]">pendapatan tetap</strong> — walaupun kecil</span>
              </li>
            </ul>
            <div className="rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-sm text-red-800">
              <strong>Penting:</strong> DMP tidak tersedia untuk hutang koperasi, pinjaman ah long, atau hutang bukan bank. Ia hanya untuk hutang dengan bank berlesen di Malaysia.
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">3. Cara Mohon Program DMP AKPK</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Proses permohonan adalah mudah dan percuma:
            </p>
            <div className="space-y-4 my-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-sm font-bold text-[#1C1C1C] shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-1">Hubungi AKPK</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Call <strong>1-800-88-2525</strong> (nombor percuma) atau walk-in ke mana-mana cawangan AKPK. Anda juga boleh mohon secara online di <strong>akpk.org.my</strong>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-sm font-bold text-[#1C1C1C] shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-1">Sesi Kaunseling</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Anda akan bertemu kaunselor yang akan semak situasi kewangan anda — pendapatan, hutang, perbelanjaan. Sesi ini percuma dan sulit.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-sm font-bold text-[#1C1C1C] shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-1">Penyusunan Pelan</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AKPK akan berunding dengan bank anda untuk dapatkan kadar faedah yang lebih rendah, potongan yuran, dan jadual pembayaran baru yang sesuai dengan kemampuan anda.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-sm font-bold text-[#1C1C1C] shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-1">Pelulusan Bank</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Bank perlu menyetujui pelan tersebut. Kebanyakan bank bersetuju kerana mereka lebih suka terima pembayaran berbanding hutang tak berbayar.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#FFD000] flex items-center justify-center text-sm font-bold text-[#1C1C1C] shrink-0">5</div>
                <div>
                  <h3 className="font-bold text-[#1C1C1C] mb-1">Mula Membayar</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Anda mula membuat pembayaran mengikut jadual baru. AKPK akan memantau kemajuan anda sepanjang program.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Ad — mid article */}
          <PublicAdBanner slot="in-article" />

          {/* 4 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">4. Apa Yang Bank Boleh Tawarkan Melalui DMP?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Apabila anda sertai DMP, AKPK berunding dengan bank anda untuk:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Pengurangan kadar faedah</strong> — kad kredit 18% mungkin diturunkan ke 6-10%</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Penangguhan faedah</strong> — sesetengah bank menangguhkan faedah untuk tempoh tertentu</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Potongan yuran lewat</strong> — yuran keterlaluan dan denda boleh dikurangkan atau digugurkan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Jadual pembayaran baru</strong> — ansuran bulanan yang lebih rendah dan munasabah</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Penyatuan hutang</strong> — beberapa hutang digabungkan menjadi satu pembayaran bulanan</span>
              </li>
            </ul>
            <Callout icon="💰" title="Contoh sebenar">
              Seorang pelanggan AKPK mempunyai kad kredit RM 35,000 pada 18% faedah. Selepas DMP, kadar diturunkan ke 8%, ansuran bulanan dikurangkan dari RM 1,050 ke RM 650, dan dia menjimatkan lebih RM 12,000 dalam faedah sepanjang tempoh pinjaman.
            </Callout>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">5. Kesan DMP Pada CCRIS Dan Rekod Kredit</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ini soalan yang paling kerap ditanya. Jawapan penuh:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Ya, DMP akan direkodkan dalam CCRIS</strong> — bank akan menandakan bahawa anda dalam program pengurusan kredit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Anda mungkin tak boleh apply pinjaman baru</strong> semasa dalam DMP — ini untuk melindungi anda dari menambah hutang</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Selepas tamat DMP</strong>, rekod akan dikemas kini dan anda boleh mula membina semula sejarah kredit anda</span>
              </li>
            </ul>
            <Tip>
              Jangan biarkan takut pada CCRIS menghalang anda dari menyertai DMP. Jika anda sudah terlepas bayar, CCRIS sudah pun menunjukkan rekod negatif. DMP membantu anda memperbaikinya dari masa ke masa.
            </Tip>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">6. DMP vs Konsolidasi Hutang Sendiri</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Adakah anda patut guna AKPK atau urus sendiri? Berikut perbandingannya:
            </p>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm text-sm my-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Aspek</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">DMP (AKPK)</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Sendiri</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { aspect: 'Kos', akpk: 'Percuma', self: 'Yuran pemprosesan bank' },
                    { aspect: 'Rundingan', akpk: 'AKPK urus', self: 'Anda urus sendiri' },
                    { aspect: 'Kadar faedah', akpk: 'Biasanya lebih rendah', self: 'Bergantung pada bank' },
                    { aspect: 'CCRIS', akpk: 'Direkodkan', self: 'Tiada rekod tambahan' },
                    { aspect: 'Flexibiliti', akpk: 'Tetap mengikut pelan', self: 'Anda kawal sepenuhnya' },
                    { aspect: 'Sesuai untuk', akpk: 'Hutang besar, tak mampu bayar', self: 'Hutang kecil, displin tinggi' },
                  ].map((row, i) => (
                    <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-semibold text-[#1C1C1C]">{row.aspect}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.akpk}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{row.self}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">7. Tips Untuk Berjaya Dalam DMP</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Jika anda memutuskan untuk menyertai DMP, ini tips untuk berjaya:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Jangan skip pembayaran</strong> — satu pembayaran terlepas boleh membatalkan seluruh pelan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Potong kad kredit</strong> — semasa dalam DMP, anda tak boleh guna kad kredit yang disenaraikan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Buat bajet ketat</strong> — gunakan Beebas untuk track perbelanjaan dan pastikan anda ada cukup untuk bayaran bulanan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Hubungi AKPK jika ada masalah</strong> — jika anda tak mampu bayar bulan itu, hubungi sebelum terlepas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFD000] font-bold shrink-0 mt-0.5">→</span>
                <span><strong className="text-[#1C1C1C]">Tetapkan matlamat</strong> — tahu bila DMP anda akan tamat dan apa yang anda mahu capai selepas itu</span>
              </li>
            </ul>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">8. Hubungi AKPK Sekarang</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Jika anda bergelut dengan hutang, jangan tunggu lagi. Hubungi AKPK:
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-100 px-6 py-4 my-4 text-sm text-[#1C1C1C] space-y-2">
              <p><strong>Telefon:</strong> 1-800-88-2525 (percuma)</p>
              <p><strong>Laman web:</strong> www.akpk.org.my</p>
              <p><strong>Email:</strong> aduan@akpk.org.my</p>
              <p><strong>Waktu operasi:</strong> Isnin - Jumaat, 9:00 pagi - 5:00 petang</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              AKPK mempunyai cawangan di Kuala Lumpur, Johor Bahru, Penang, Kota Kinabalu, dan Kuching. Anda boleh walk-in tanpa appointment.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Final thought */}
          <section>
            <h2 className="text-2xl font-extrabold mb-4">Langkah Seterusnya</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Sertai DMP bukan tanda kegagalan — ia langkah bijak untuk mengawal semula kewangan anda. Beratus-ribu rakyat Malaysia telah berjaya melalui program ini.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sementara menunggu permohonan DMP diproses, gunakan Beebas untuk kira hutang anda dan fahami gambaran penuh. Dengan atau tanpa DMP, mempunyai pelan yang jelas adalah langkah pertama ke arah kebebasan kewangan.
            </p>
          </section>

        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-[#1C1C1C] px-6 py-8 text-center">
          <div className="text-3xl mb-3">🐝</div>
          <h3 className="text-white font-extrabold text-xl mb-2">Fahami hutang anda sebelum hubungi AKPK</h3>
          <p className="text-white/50 text-sm mb-5">
            Masukkan semua hutang anda ke dalam kalkulator Beebas untuk tahu gambaran penuh sebelum sesi kaunselan.
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
            <Link href="/blog/ptptn-berapa-lama-nak-habis" className="rounded-xl border border-gray-100 bg-gray-50 p-5 hover:shadow-md transition-shadow">
              <span className="text-xs font-bold text-[#8B6000]">PTPTN</span>
              <p className="font-bold text-sm text-[#1C1C1C] mt-1 leading-snug">PTPTN Berapa Lama Nak Habis? Ini Cara Kira & Strategi Bayar</p>
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