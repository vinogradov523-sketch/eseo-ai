import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { generateImageFlux } from '@/lib/ai/images/flux';
import { withRateLimit } from '@/lib/api-helpers';

export const maxDuration = 60;

export const POST = withRateLimit(
  async (req: NextRequest) => {
    const user = await requireAuth();

    if (user.plan === 'starter') {
      return NextResponse.json(
        { error: 'Генерация изображений доступна на Pro+' },
        { status: 403 }
      );
    }

    const { prompt, width, height } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Промпт обязателен' }, { status: 400 });
    }

    const images = await generateImageFlux({
      prompt: `Product photography, e-commerce style, white background, professional lighting. ${prompt}`,
      width: width || 1024,
      height: height || 1024,
    });

    return NextResponse.json({ images });
  },
  { windowMs: 60_000, maxRequests: 5 }
);
