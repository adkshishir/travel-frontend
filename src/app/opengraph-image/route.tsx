import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Traveltreks';
  const subtitle = searchParams.get('subtitle') || 'Nepal Trekking & Adventure Tours';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundColor: '#1a0a00',
          backgroundImage: 'linear-gradient(135deg, #1a0a00 0%, #3d1f00 50%, #1a0a00 100%)',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Mountain silhouette decoration */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,108,10,0.15) 100%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            padding: '60px',
            zIndex: 1,
          }}
        >
          {/* Brand mark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '8px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#ff6c0a',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
              }}
            >
              ⛰
            </div>
            <span
              style={{ fontSize: '28px', fontWeight: 700, color: '#ff6c0a' }}
            >
              Traveltreks
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: title.length > 40 ? '44px' : '56px',
              fontWeight: 800,
              color: '#ffffff',
              textAlign: 'center',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '26px',
              color: '#ffb380',
              textAlign: 'center',
              maxWidth: '700px',
            }}
          >
            {subtitle}
          </div>

          {/* CTA badge */}
          <div
            style={{
              marginTop: '16px',
              padding: '12px 32px',
              backgroundColor: '#ff6c0a',
              borderRadius: '50px',
              fontSize: '20px',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            Book Your Adventure →
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
