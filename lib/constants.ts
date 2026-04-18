export const APP_NAME = 'ESEO AI';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://eseo-ai.ru';

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/#features', label: 'Возможности' },
  { href: '/#how-it-works', label: 'Как это работает' },
  { href: '/pricing', label: 'Тарифы' },
  { href: '/blog', label: 'Блог' },
];

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  content?: string;
  excerpt?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'seo-optimization-wb-2025',
    title: 'SEO-оптимизация карточек на Wildberries в 2025',
    description: 'Полный гайд по оптимизации заголовков, описаний и характеристик для максимальной видимости.',
    date: '2025-04-10',
    readTime: '8 мин',
    category: 'SEO',
  },
  {
    slug: 'ai-product-cards',
    title: 'Как AI генерирует продающие карточки товаров',
    description: 'Разбираем, как нейросети анализируют конкурентов и создают конверсионный контент.',
    date: '2025-04-05',
    readTime: '6 мин',
    category: 'AI',
  },
  {
    slug: 'ozon-vs-wildberries',
    title: 'Ozon vs Wildberries: где продавать в 2025?',
    description: 'Сравниваем площадки по трафику, комиссиям и возможностям для селлеров.',
    date: '2025-03-28',
    readTime: '10 мин',
    category: 'Аналитика',
  },
];

export interface PricingPlan {
  name: string;
  desc: string;
  price: string;
  period: string;
  items: string[];
  cta: string;
  ctaLink: string;
  highlighted: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Старт',
    desc: 'Для тестирования сервиса',
    price: '0 ₽',
    period: '',
    items: ['5 карточек в месяц', 'Базовый SEO-анализ', 'Экспорт в текст'],
    cta: 'Начать бесплатно',
    ctaLink: '/auth/register',
    highlighted: false,
  },
  {
    name: 'Бизнес',
    desc: 'Для активных селлеров',
    price: '1 490 ₽',
    period: ' / мес',
    items: ['100 карточек в месяц', 'AI-генерация контента', 'SEO-оптимизация', 'Анализ конкурентов', 'Приоритетная поддержка'],
    cta: 'Подключить',
    ctaLink: '/dashboard/billing',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    desc: 'Для крупных брендов',
    price: 'По запросу',
    period: '',
    items: ['Безлимит карточек', 'API-доступ', 'Персональный менеджер', 'SLA 99.9%', 'Кастомные интеграции'],
    cta: 'Связаться',
    ctaLink: '/contacts',
    highlighted: false,
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_DATA: FaqItem[] = [
  { q: 'Можно ли попробовать бесплатно?', a: 'Да, тариф «Старт» полностью бесплатный — 5 карточек в месяц без ограничений по функциям.' },
  { q: 'Как происходит оплата?', a: 'Оплата через ЮKassa — банковские карты, СБП, электронные кошельки. Подписка продлевается автоматически.' },
  { q: 'Могу ли я отменить подписку?', a: 'Да, отменить можно в любой момент в личном кабинете. Доступ сохранится до конца оплаченного периода.' },
  { q: 'Есть ли API для интеграции?', a: 'API доступен на тарифе Enterprise. Свяжитесь с нами для получения документации.' },
];
