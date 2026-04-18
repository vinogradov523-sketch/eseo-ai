import { generateText, generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

/* ───── Agent Types ───── */

interface AgentContext {
  input: string;
  marketplace: 'wb' | 'ozon';
  mode: 'url' | 'text' | 'photo';
}

interface ResearchResult {
  niche: string;
  topKeywords: string[];
  avgPrice: number;
  competitorStrengths: string[];
  competitorWeaknesses: string[];
  opportunities: string[];
}

interface SeoStrategy {
  primaryKeyword: string;
  secondaryKeywords: string[];
  titleStrategy: string;
  contentAngle: string;
  uniqueSellingPoints: string[];
}

interface CardContent {
  title: string;
  description: string;
  bullets: string[];
  richContentBlocks: { type: string; content: string }[];
}

interface VisualDirective {
  mainImagePrompt: string;
  infographicTexts: string[];
  colorScheme: string;
  mood: string;
}

interface QaResult {
  seoScore: number;
  issues: string[];
  improvements: string[];
  approved: boolean;
}

/* ───── Agent 1: Researcher ───── */

async function researchAgent(ctx: AgentContext): Promise<ResearchResult> {
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      niche: z.string(),
      topKeywords: z.array(z.string()).min(5).max(15),
      avgPrice: z.number(),
      competitorStrengths: z.array(z.string()),
      competitorWeaknesses: z.array(z.string()),
      opportunities: z.array(z.string()),
    }),
    prompt: `Ты — аналитик маркетплейсов. Проанализируй нишу товара для ${
      ctx.marketplace === 'wb' ? 'Wildberries' : 'Ozon'
    }.

Входные данные: ${ctx.input}

Определи:
1. Название ниши
2. Топ-15 поисковых запросов покупателей
3. Среднюю цену в нише
4. Сильные стороны конкурентов (что они делают хорошо)
5. Слабые стороны конкурентов (где есть пробелы)
6. Возможности для нашего товара`,
    temperature: 0.5,
  });

  return object;
}

/* ───── Agent 2: SEO Strategist ───── */

async function seoStrategyAgent(
  ctx: AgentContext,
  research: ResearchResult
): Promise<SeoStrategy> {
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      primaryKeyword: z.string(),
      secondaryKeywords: z.array(z.string()),
      titleStrategy: z.string(),
      contentAngle: z.string(),
      uniqueSellingPoints: z.array(z.string()).min(3).max(5),
    }),
    prompt: `Ты — SEO-стратег для ${ctx.marketplace === 'wb' ? 'Wildberries' : 'Ozon'}.

Данные исследования:
- Ниша: ${research.niche}
- Ключевые слова: ${research.topKeywords.join(', ')}
- Средняя цена: ${research.avgPrice}₽
- Сильные стороны конкурентов: ${research.competitorStrengths.join('; ')}
- Слабые стороны: ${research.competitorWeaknesses.join('; ')}
- Возможности: ${research.opportunities.join('; ')}

Определи SEO-стратегию:
1. Главное ключевое слово (1 фраза)
2. Вторичные ключевые слова (5-8 фраз)
3. Стратегия заголовка (как его строить)
4. Контентный угол (чем отличаемся)
5. 3-5 уникальных торговых предложений`,
    temperature: 0.4,
  });

  return object;
}

/* ───── Agent 3: Copywriter ───── */

async function copywriterAgent(
  ctx: AgentContext,
  research: ResearchResult,
  strategy: SeoStrategy
): Promise<CardContent> {
  const mpRules = ctx.marketplace === 'wb'
    ? `Wildberries правила:
- Заголовок до 60 символов
- Описание 500-1000 символов
- 5-7 bullet-points
- Ключевые слова естественно в тексте (плотность 3-5%)`
    : `Ozon правила:
- Заголовок до 100 символов, включая категорию
- Rich-контент обязателен
- Описание структурированное, с подзаголовками
- Характеристики отдельными блоками`;

  const { object } = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      bullets: z.array(z.string()).min(5).max(7),
      richContentBlocks: z.array(
        z.object({
          type: z.enum(['benefit', 'spec', 'comparison', 'guarantee', 'cta']),
          content: z.string(),
        })
      ),
    }),
    prompt: `Ты — лучший копирайтер для маркетплейсов. Напиши карточку товара.

${mpRules}

Стратегия:
- Главный ключ: "${strategy.primaryKeyword}"
- Вторичные: ${strategy.secondaryKeywords.join(', ')}
- Угол: ${strategy.contentAngle}
- УТП: ${strategy.uniqueSellingPoints.join('; ')}

Пиши продающим, живым языком. Каждый bullet-point начинается с emoji ✅.
Описание должно зацепить с первого предложения.`,
    temperature: 0.7,
  });

  return object;
}

/* ───── Agent 4: Visual Director ───── */

async function visualDirectorAgent(
  ctx: AgentContext,
  research: ResearchResult,
  strategy: SeoStrategy
): Promise<VisualDirective> {
  const { object } = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: z.object({
      mainImagePrompt: z.string(),
      infographicTexts: z.array(z.string()),
      colorScheme: z.string(),
      mood: z.string(),
    }),
    prompt: `Ты — арт-директор продуктовой фотографии для маркетплейсов.

Товар из ниши: ${research.niche}
УТП: ${strategy.uniqueSellingPoints.join('; ')}

Создай:
1. Промпт для AI-генерации главного изображения товара (для Flux/Midjourney, на английском, подробный)
2. 3-4 текста для инфографики (короткие фразы для изображений)
3. Цветовую схему (hex-коды)
4. Настроение (mood) для визуалов`,
    temperature: 0.8,
  });

  return object;
}

/* ───── Agent 5: QA Reviewer ───── */

async function qaReviewerAgent(
  ctx: AgentContext,
  content: CardContent,
  strategy: SeoStrategy
): Promise<QaResult> {
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    schema: z.object({
      seoScore: z.number().min(0).max(100),
      issues: z.array(z.string()),
      improvements: z.array(z.string()),
      approved: z.boolean(),
    }),
    prompt: `Ты — QA-инженер для карточек товаров на ${ctx.marketplace === 'wb' ? 'Wildberries' : 'Ozon'}.

Проверь карточку:
Заголовок: ${content.title}
Описание: ${content.description}
Bullets: ${content.bullets.join('\n')}

SEO-стратегия:
- Главный ключ: "${strategy.primaryKeyword}"
- Вторичные: ${strategy.secondaryKeywords.join(', ')}

Проверь:
1. SEO Score (0-100): наличие ключей, плотность, структура
2. Проблемы: ошибки, стоп-слова, нарушения правил МП
3. Улучшения: конкретные рекомендации
4. Approved: true если score >= 75`,
    temperature: 0.3,
  });

  return object;
}

/* ───── ORCHESTRATOR: Run All Agents ───── */

export interface CrewResult {
  research: ResearchResult;
  strategy: SeoStrategy;
  content: CardContent;
  visuals: VisualDirective;
  qa: QaResult;
}

export async function runCardCrewAI(ctx: AgentContext): Promise<CrewResult> {
  console.log('🤖 [Crew] Starting multi-agent card generation...');

  // Step 1: Research (parallel-ready, but sequential for context)
  console.log('🔍 [Agent 1] Researching niche...');
  const research = await researchAgent(ctx);

  // Step 2: SEO Strategy
  console.log('📊 [Agent 2] Building SEO strategy...');
  const strategy = await seoStrategyAgent(ctx, research);

  // Step 3 & 4: Copywriting + Visual Direction (parallel)
  console.log('✍️ [Agent 3+4] Writing content + visual direction...');
  const [content, visuals] = await Promise.all([
    copywriterAgent(ctx, research, strategy),
    visualDirectorAgent(ctx, research, strategy),
  ]);

  // Step 5: QA Review
  console.log('✅ [Agent 5] Quality review...');
  const qa = await qaReviewerAgent(ctx, content, strategy);

  // If QA fails, retry copywriter with improvements
  if (!qa.approved && qa.seoScore < 70) {
    console.log('🔄 [Crew] QA failed, regenerating with improvements...');
    const improvedContent = await copywriterAgent(
      { ...ctx, input: `${ctx.input}\n\nВАЖНО: ${qa.improvements.join('. ')}` },
      research,
      strategy
    );
    const improvedQa = await qaReviewerAgent(ctx, improvedContent, strategy);
    return { research, strategy, content: improvedContent, visuals, qa: improvedQa };
  }

  console.log(`🎉 [Crew] Done! SEO Score: ${qa.seoScore}`);
  return { research, strategy, content, visuals, qa };
}
