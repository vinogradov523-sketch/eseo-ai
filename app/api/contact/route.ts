import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Все поля обязательны' }, { status: 400 });
    }

    // TODO: Send email via Resend / save to DB
    // await resend.emails.send({
    //   from: 'noreply@eseo-ai.ru',
    //   to: 'hello@eseo-ai.ru',
    //   subject: `Новое сообщение от ${name}`,
    //   text: `От: ${name} (${email})\n\n${message}`,
    // });

    console.log('Contact form:', { name, email, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
