export const dynamic = "force-dynamic";
import { NextRequest } from 'next/server';
import { handleWebhook } from '@/lib/telegram/bot';

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-telegram-bot-api-secret-token');
  if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  return handleWebhook(req);
}
