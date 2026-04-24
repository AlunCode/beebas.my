import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: '40px',
          background: '#1C1C1C',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            background: '#FFD000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 72,
            fontWeight: 800,
            color: '#1C1C1C',
            fontFamily: 'sans-serif',
          }}
        >
          B
        </div>
      </div>
    ),
    { ...size }
  )
}
