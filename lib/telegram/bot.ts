/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Bot, InlineKeyboard, webhookCallback } from 'grammy';
import { supabaseAdmin } from '@/lib/db/supabase';

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);

/* ─── Commands ─── */

bot.command('start', async (ctx) => {
  const keyboard = new InlineKeyboard()
    .url('🚀 Открыть платформу', 'https://eseo-ai.ru/auth/register')
    .row()
    .text('📊 Мои карточки', 'my_cards')
    .text('💰 Тарифы', 'pricing')
    .row()
    .text('❓ Помощь', 'help');

  await ctx.reply(
    `👋 Добро пожаловать в *ESEO*\\!\n\n` +
    `AI\\-платформа для селлеров WB и Ozon\\.\n\n` +
    `Что умею:\n` +
    `• Генерировать карточки товаров\n` +
    `• Анализировать конкурентов\n` +
    `• Отвечать на отзывы\n\n` +
    `Выберите действие 👇`,
    {
      parse_mode: 'MarkdownV2',
      reply_markup: keyboard,
    }
  );
});

bot.command('generate', async (ctx) => {
  await ctx.reply(
    '📝 Отправьте мне:\n\n' +
    '1. Ссылку на товар WB/Ozon\n' +
    '2. Или текстовое описание товара\n\n' +
    'Я создам полную карточку за 2-3 минуты.',
  );

  // Set conversation state
  ctx.session = { awaiting: 'product_input' };
});

bot.command('stats', async (ctx) => {
  const chatId = ctx.chat.id;

  const { data: user } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('telegram_chat_id', chatId)
    .single();

  if (!user) {
    await ctx.reply(
      '⚠️ Аккаунт не привязан.\n\n' +
      'Привяжите Telegram в настройках: eseo-ai.ru/dashboard/settings'
    );
    return;
  }

  const { count: cardsCount } = await supabaseAdmin
    .from('cards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const { count: reviewsCount } = await supabaseAdmin
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('reply_status', 'published');

  await ctx.reply(
    `📊 *Ваша статистика ESEO*\n\n` +
    `Тариф: ${user.plan.toUpperCase()}\n` +
    `Карточек создано: ${cardsCount || 0}\n` +
    `Лимит: ${user.cards_used_this_month}/${user.cards_limit}\n` +
    `Ответов на отзывы: ${reviewsCount || 0}\n\n` +
    `🔗 Подробнее: eseo-ai.ru/dashboard`,
    { parse_mode: 'Markdown' }
  );
});

bot.command('help', async (ctx) => {
  await ctx.reply(
    '📖 *Команды ESEO Bot*\n\n' +
    '/start — Главное меню\n' +
    '/generate — Создать карточку\n' +
    '/stats — Моя статистика\n' +
    '/link — Привязать аккаунт\n' +
    '/help — Справка\n\n' +
    '💬 Просто отправьте ссылку на товар WB/Ozon — бот создаст карточку автоматически.',
    { parse_mode: 'Markdown' }
  );
});

bot.command('link', async (ctx) => {
  const chatId = ctx.chat.id;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  // Save temp code
  await supabaseAdmin.from('activity_log').insert({
    action: 'telegram_link_request',
    details: { chat_id: chatId, code },
  });

  await ctx.reply(
    `🔗 Код привязки: \`${code}\`\n\n` +
    'Введите этот код на странице:\n' +
    'eseo-ai.ru/dashboard/settings → Telegram',
    { parse_mode: 'Markdown' }
  );
});

/* ─── Callback queries ─── */

bot.callbackQuery('my_cards', async (ctx) => {
  await ctx.answerCallbackQuery();

  const chatId = ctx.chat?.id;
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('telegram_chat_id', chatId)
    .single();

  if (!user) {
    await ctx.reply('⚠️ Привяжите аккаунт через /link');
    return;
  }

  const { data: cards } = await supabaseAdmin
    .from('cards')
    .select('title, marketplace, seo_score, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  if (!cards?.length) {
    await ctx.reply('У вас пока нет карточек. Создайте первую через /generate');
    return;
  }

  const list = cards
    .map((c, i) => `${i + 1}. [${c.marketplace.toUpperCase()}] ${c.title?.slice(0, 40)}... (SEO: ${c.seo_score})`)
    .join('\n');

  await ctx.reply(`📋 *Последние карточки:*\n\n${list}`, { parse_mode: 'Markdown' });
});

bot.callbackQuery('pricing', async (ctx) => {
  await ctx.answerCallbackQuery();

  const keyboard = new InlineKeyboard()
    .url('Перейти к тарифам', 'https://eseo-ai.ru/pricing');

  await ctx.reply(
    '💰 *Тарифы ESEO*\n\n' +
    '🆓 Starter — 0 ₽\n' +
    '• 5 карточек/мес\n\n' +
    '⭐ Pro — 29 000 ₽/мес\n' +
    '• Безлимит + аналитика + автоответы\n\n' +
    '🏢 Enterprise — от 79 000 ₽/мес\n' +
    '• White Label + выделенный менеджер',
    { parse_mode: 'Markdown', reply_markup: keyboard }
  );
});

bot.callbackQuery('help', async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply('Отправьте /help для списка команд');
});

/* ─── Auto-detect product links ─── */

bot.on('message:text', async (ctx) => {
  const text = ctx.message.text;

  // Detect WB/Ozon links
  const isWbLink = text.includes('wildberries.ru');
  const isOzonLink = text.includes('ozon.ru');

  if (isWbLink || isOzonLink) {
    const mp = isWbLink ? 'wb' : 'ozon';

    await ctx.reply('⏳ Анализирую товар и генерирую карточку...');

    try {
      // Call our API
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: text,
          mode: 'url',
          marketplace: mp,
          telegramChatId: ctx.chat.id,
        }),
      });

      const result = await res.json();

      if (result.error) {
        await ctx.reply(`❌ ${result.error}`);
        return;
      }

      const reply =
        `✅ *Карточка готова\\!*\n\n` +
        `📌 *Заголовок:*\n${escapeMarkdown(result.title)}\n\n` +
        `📝 *Описание:*\n${escapeMarkdown(result.description?.slice(0, 300))}\\.\\.\\.\n\n` +
        `🔑 *Ключевые слова:*\n${result.keywords?.map((k: string) => `\\#${escapeMarkdown(k.replace(/\s/g, '_'))}`).join(' ')}\n\n` +
        `📊 *SEO Score:* ${result.seoScore}/100\n\n` +
        `🔗 Подробнее в дашборде: eseo\\-ai\\.ru/dashboard`;

      const keyboard = new InlineKeyboard()
        .url('Открыть в дашборде', 'https://eseo-ai.ru/dashboard')
        .text('🔄 Перегенерировать', 'regenerate');

      await ctx.reply(reply, { parse_mode: 'MarkdownV2', reply_markup: keyboard });
    } catch (error) {
      await ctx.reply('❌ Произошла ошибка. Попробуйте позже или используйте веб-версию: eseo-ai.ru');
    }
  }
});

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}

export { bot };
export const handleWebhook = webhookCallback(bot, 'std/http');
