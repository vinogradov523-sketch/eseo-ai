// Run: npx tsx scripts/setup-telegram-webhook.ts
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/telegram`;
const SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

async function setup() {
  const res = await fetch(
    `https://api.telegram.org/bot${TOKEN}/setWebhook`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: URL,
        secret_token: SECRET,
        allowed_updates: ['message', 'callback_query'],
      }),
    }
  );
  const data = await res.json();
  console.log('Webhook setup result:', data);
}

setup();
