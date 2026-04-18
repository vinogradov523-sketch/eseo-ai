import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'ESEO — AI для маркетплейсов';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '30%',
            width: '40%',
            height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.15), transparent)',
            filter: 'blur(80px)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            fontSize: 40,
            fontWeight: 900,
            color: 'white',
          }}
        >
          E
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: 'white',
            textAlign: 'center',
            maxWidth: '80%',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: '#71717a',
            marginTop: 16,
            textAlign: 'center',
          }}
        >
          AI-платформа для селлеров WB и Ozon
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 16,
            color: '#3f3f46',
          }}
        >
          eseo-ai.ru
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
