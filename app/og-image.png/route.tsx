import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#1C1C1C',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Yellow accent bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: '#FFD000' }} />

        {/* Logo */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#FFD000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            marginBottom: '28px',
          }}
        >
          🐝
        </div>

        {/* Brand */}
        <div style={{ color: '#FFD000', fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '16px' }}>
          BEEBAS
        </div>

        {/* Headline */}
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '56px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            textAlign: 'center',
            maxWidth: '800px',
            marginBottom: '20px',
          }}
        >
          See your debt-free date.
        </div>

        {/* Sub */}
        <div
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '26px',
            textAlign: 'center',
            maxWidth: '680px',
            lineHeight: 1.4,
            marginBottom: '44px',
          }}
        >
          Malaysia's debt snowball & avalanche tracker.
          <br />
          Free to start. No spreadsheets needed.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '48px' }}>
          {[
            { v: 'RM 847', l: 'avg interest saved/mo' },
            { v: '14 mo', l: 'faster debt-free' },
            { v: '100%', l: 'free to start' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ color: '#FFD000', fontSize: '36px', fontWeight: 800 }}>{s.v}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px', marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', background: '#FFD000' }} />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
