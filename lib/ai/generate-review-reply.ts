/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

interface GenerateReplyInput {
  productName: string;
  reviewText: string;
  rating: number;
  brandTone?: string;
}

export async function generateReviewReply(input: GenerateReplyInput): Promise<string> {
  const { text } = await generateText({
    model: openai('gpt-4o-mini'),
    system: `Ты — менеджер по работе с клиентами бренда на маркетплейсе.
Твоя задача — написать вежливый, профессиональный ответ на отзыв.

Правила:
- Обращайся к покупателю по имени, если известно, иначе используй "Добрый день!"
- Если отзыв положительный (4-5 звёзд): поблагодари, подчеркни ценность отзыва
- Если отзыв средний (3 звезды): поблагодари, предложи помощь
- Если отзыв негативный (1-2 звезды): извинись, предложи решение проблемы
- Длина: 2-4 предложения
- Тон: ${input.brandTone || 'дружелюбный и профессиональный'}
- Добавь 1 уместный emoji
- НЕ используй шаблонные фразы типа "Мы всегда рады"`,
    prompt: `Товар: ${input.productName}
Рейтинг: ${input.rating}/5
Отзыв: "${input.reviewText}"

Напиши ответ:`,
    temperature: 0.8,
    maxTokens: 300,
  });

  return text.trim();
}
