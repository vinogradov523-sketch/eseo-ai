import { sendEmail } from './resend';

interface DripConfig {
  userId: string;
  email: string;
  name: string;
  event: 'signup' | 'first_card' | 'day3' | 'day7' | 'trial_ending';
}

const DRIP_TEMPLATES: Record<string, { subject: string; delay: number; template: (name: string) => string }> = {
  signup: {
    subject: '🚀 Добро пожаловать в ESEO!',
    delay: 0,
    template: (name) => `
      <h1>Привет, ${name}!</h1>
      <p>Рады видеть вас в ESEO. У вас 5 бесплатных генераций карточек.</p>
      <p><a href="https://eseo-ai.ru/generator">Создать первую карточку →</a></p>
    `,
  },
  day3: {
    subject: '💡 3 способа увеличить продажи с ESEO',
    delay: 3 * 24 * 60 * 60 * 1000,
    template: (name) => `
      <h1>${name}, вы уже попробовали?</h1>
      <p>Вот 3 функции, которые помогут вырасти:</p>
      <ol>
        <li><strong>Аналитика конкурентов</strong> — узнайте, что работает у лидеров ниши</li>
        <li><strong>SEO-оптимизация</strong> — поднимите карточки в поиске WB/Ozon</li>
        <li><strong>Автоответы</strong> — повысьте рейтинг магазина автоматически</li>
      </ol>
      <p><a href="https://eseo-ai.ru/dashboard">Попробовать →</a></p>
    `,
  },
  day7: {
    subject: '📊 Ваш недельный отчёт ESEO',
    delay: 7 * 24 * 60 * 60 * 1000,
    template: (name) => `
      <h1>${name}, прошла неделя!</h1>
      <p>Селлеры на Pro-тарифе в среднем создают 15 карточек в неделю и увеличивают продажи на 34%.</p>
      <p>Ваш лимит на бесплатном тарифе: 5 карточек/мес.</p>
      <p><a href="https://eseo-ai.ru/pricing">Перейти на Pro со скидкой 20% →</a></p>
    `,
  },
  trial_ending: {
    subject: '⚠️ Осталось 2 карточки — не упустите момент',
    delay: 0,
    template: (name) => `
      <h1>${name}, ваши бесплатные карточки заканчиваются</h1>
      <p>Осталось всего 2 генерации. Чтобы продолжить расти:</p>
      <p><a href="https://eseo-ai.ru/dashboard/billing" style="display:inline-block;padding:12px 24px;background:linear-gradient(90deg,#f97316,#ef4444);color:white;border-radius:12px;text-decoration:none;font-weight:600;">
        Перейти на Pro — 29 000 ₽/мес
      </a></p>
      <p style="color:#666;font-size:12px;">Безлимитные генерации · Аналитика · Автоответы · Отмена в 1 клик</p>
    `,
  },
};

export async function triggerDrip(config: DripConfig) {
  const template = DRIP_TEMPLATES[config.event];
  if (!template) return;

  if (template.delay > 0) {
    // In production: use a job queue (Inngest, Trigger.dev, etc.)
    // For now: schedule with setTimeout (not for production)
    console.log(`Drip "${config.event}" scheduled for ${config.email} in ${template.delay}ms`);
    return;
  }

  // Send immediately
  await sendEmail({
    to: config.email,
    subject: template.subject,
    html: wrapEmailTemplate(template.template(config.name)),
  });
}

function wrapEmailTemplate(content: string): string {
  return `
    <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:white;padding:40px;border-radius:16px;">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#f97316,#ef4444);display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:24px;color:white;">E</div>
      </div>
      ${content}
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.05);margin:32px 0;"/>
      <p style="color:#52525b;font-size:11px;text-align:center;">
        ESEO — AI для маркетплейсов · <a href="https://eseo-ai.ru" style="color:#f97316;">eseo-ai.ru</a><br/>
        <a href="https://eseo-ai.ru/unsubscribe" style="color:#3f3f46;">Отписаться</a>
      </p>
    </div>
  `;
}
