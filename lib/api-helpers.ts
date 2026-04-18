import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from './rate-limit';

export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  config?: { windowMs?: number; maxRequests?: number }
) {
  return async (req: NextRequest) => {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const path = new URL(req.url).pathname;
    const key = `${ip}:${path}`;

    const result = rateLimit(key, {
      windowMs: config?.windowMs || 60_000,
      maxRequests: config?.maxRequests || 30,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Слишком много запросов. Попробуйте позже.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(result.resetIn / 1000)),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const response = await handler(req);
    response.headers.set('X-RateLimit-Remaining', String(result.remaining));
    return response;
  };
}
