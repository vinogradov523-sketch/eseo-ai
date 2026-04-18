import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

interface GenerateCardInput {
  input: string;
  marketplace: 'wb' | 'ozon';
  mode: 'url' | 'text' | 'photo';
}

interface GeneratedCard {
  title: string;
  description: string;
  bullets: string[];
  keywords: string[];
  seoScore: number;
}

const SYSTEM_PROMPT = `Ты — эксперт по созданию карточек товаров для маркетплейсов Wildberries и Ozon.
Твоя задача — создать максимально продающую карточку товара.

Правила:
1. Заголовок: до 60 символов, содержит главное ключевое слово, УТП и бренд
2. Описание: 500-1000 символов, структурированное, с ключевыми словами (плотность 3-5%)
3. Bullet-points: 5-7 пунктов, каждый начинается с emoji ✅, фокус на выгодах
4. Keywords: 8-12 релевантных ключевых слов для поисковой выдачи
5. Язык: живой, продающий, без воды
6. SEO Score: оценка от 0 до 100 на основе качества оптимизации

Ответ СТРОГО в формате JSON:
{
  "title": "...",
  "description": "...",
  "bullets": ["...", "..."],
  "keywords": ["...", "..."],
  "seoScore": 85
}`;

export async function generateCard(input: GenerateCardInput): Promise<GeneratedCard> {
  const mpName = input.marketplace === 'wb' ? 'Wildberries' : 'Ozon';

  const userPrompt = `Создай карточку товара для ${mpName}.

Входные данные (${input.mode === 'url' ? 'ссылка' : input.mode === 'text' ? 'описание' : 'описание фото'}):
${input.input}

Учти специфику ${mpName}:
${input.marketplace === 'wb'
    ? '- Wildberries ценит длинные описания с ключевыми словами\n- Важны характеристики в bullet-points\n- Заголовок должен быть информативным'
    : '- Ozon ценит структурированный rich-контент\n- Важны отдельные блоки с характеристиками\n- Заголовок должен содержать категорию'
}

Верни результат в формате JSON.`;

  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: SYSTEM_PROMPT,
    prompt: userPrompt,
    temperature: 0.7,
    maxTokens: 2000,
  });

  // Parse JSON response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse AI response');

  const result = JSON.parse(jsonMatch[0]) as GeneratedCard;

  // Validate
  if (!result.title || !result.description || !result.bullets || !result.keywords) {
    throw new Error('Incomplete AI response');
  }

  return result;
}
