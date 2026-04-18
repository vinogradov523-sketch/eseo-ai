export const dynamic = "force-dynamic";
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET env variable');
  }

  // Получаем заголовки
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  // Получаем тело запроса
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Верифицируем вебхук
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }

  // Обрабатываем события
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    const email = email_addresses[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(' ') || null;

    const { error } = await supabaseAdmin.from('users').insert({
      clerk_id: id,
      email: email,
      name: name,
      avatar_url: image_url,
      plan: 'free',
      cards_used: 0,
      cards_limit: 3,
    });

    if (error) {
      console.error('Error creating user in Supabase:', error);
      return NextResponse.json({ error: 'DB error' }, { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    const email = email_addresses[0]?.email_address;
    const name = [first_name, last_name].filter(Boolean).join(' ') || null;

    await supabaseAdmin
      .from('users')
      .update({ email, name, avatar_url: image_url })
      .eq('clerk_id', id);
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;

    await supabaseAdmin
      .from('users')
      .delete()
      .eq('clerk_id', id);
  }

  return NextResponse.json({ success: true });
}
