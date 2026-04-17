import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { input, mode, marketplace } = body;

    if (!input) {
      return NextResponse.json({ error: 'Введите данные товара' }, { status: 400 });
    }

    // TODO: Integrate with Vercel AI SDK + OpenAI / YandexGPT
    // const { text } = await generateText({
    //   model: openai('gpt-4o'),
    //   prompt: `Generate a product card for ${marketplace}...`,
    // });

    // Placeholder response
    const result = {
      title: `Сгенерированный заголовок для ${marketplace === 'wb' ? 'Wildberries' : 'Ozon'}`,
      description: 'Описание товара, созданное AI на основе анализа конкурентов...',
      bullets: [
        '✅ Преимущество 1',
        '✅ Преимущество 2',
        '✅ Преимущество 3',
      ],
      keywords: ['ключ1', 'ключ2', 'ключ3'],
      seoScore: 85,
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: 'Ошибка генерации' }, { status: 500 });
  }
}
