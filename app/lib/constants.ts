import {
  Sparkles,
  BarChart3,
  MessageSquareText,
  Brain,
  Target,
  Layers,
  ArrowUpRight,
  Rocket,
} from 'lucide-react';
import type {
  NavLink,
  Feature,
  Step,
  Testimonial,
  PricingPlan,
  FaqItem,
  BlogPost,
  ComparisonRow,
} from '@/lib/types';

/* ───── Navigation ───── */
export const NAV_LINKS: NavLink[] = [
  { href: '/#features', label: 'Возможности' },
  { href: '/#how', label: 'Как работает' },
  { href: '/#compare', label: 'Сравнение' },
  { href: '/#testimonials', label: 'Отзывы' },
  { href: '/pricing', label: 'Цены' },
  { href: '/blog', label: 'Блог' },
];

export const DASHBOARD_NAV: NavLink[] = [
  { href: '/dashboard', label: 'Обзор' },
  { href: '/generator', label: 'Генератор' },
  { href: '/analytics', label: 'Аналитика' },
  { href: '/reviews', label: 'Автоответы' },
];

/* ───── Stats ───── */
export const STATS = [
  { value: 12400, suffix: '+', label: 'Карточек создано' },
  { value: 340, suffix: '+', label: 'Активных селлеров' },
  { value: 97, suffix: '%', label: 'Довольных клиентов' },
  { value: 3, suffix: 'мин', label: 'Среднее время генерации' },
];

/* ───── Features ───── */
export const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: 'AI Карточки под ключ',
    desc: 'Заголовки, описания, УТП, ключевые слова и rich-контент — всё за 3 минуты. Поддержка WB и Ozon форматов.',
    badge: 'Хит',
  },
  {
    icon: BarChart3,
    title: 'Глубокая аналитика',
    desc: 'Цены, остатки, позиции, динамика продаж конкурентов. Данные обновляются каждые 2 часа.',
    badge: null,
  },
  {
    icon: MessageSquareText,
    title: 'Автоответы на отзывы',
    desc: 'AI отвечает на отзывы 24/7 в тоне вашего бренда. Увеличивает рейтинг и лояльность.',
    badge: 'Новое',
  },
  {
    icon: Brain,
    title: 'AI-рекомендации',
    desc: 'Персональные рекомендации по улучшению карточек на основе анализа топ-продавцов в нише.',
    badge: null,
  },
  {
    icon: Target,
    title: 'SEO-оптимизация',
    desc: 'Автоматический подбор ключевых слов, проверка плотности, анализ поисковой выдачи WB/Ozon.',
    badge: null,
  },
  {
    icon: Layers,
    title: 'Массовая обработка',
    desc: 'Загрузите CSV/Excel — обработайте 100+ товаров за раз. Идеально для крупных магазинов.',
    badge: 'Pro',
  },
];

/* ───── Steps ───── */
export const STEPS: Step[] = [
  { num: '01', title: 'Загрузите товар', desc: 'Фото, ссылку на WB/Ozon или краткое описание товара.', icon: ArrowUpRight },
  { num: '02', title: 'AI анализирует нишу', desc: 'Сравнивает топ-10 конкурентов, находит точки роста и ключевые слова.', icon: Brain },
  { num: '03', title: 'Генерирует контент', desc: 'Создаёт тексты, структуру, bullet-points и блоки rich-контента.', icon: Sparkles },
  { num: '04', title: 'Публикуете и растёте', desc: 'Экспортируйте готовую карточку в WB/Ozon за 1 клик через API.', icon: Rocket },
];

/* ───── Comparison ───── */
export const COMPARISON: ComparisonRow[] = [
  { feature: 'Генерация текста карточки', eseo: true, mashaGpt: true, neiroCard: true, sellerDen: false },
  { feature: 'AI-визуалы (Flux/Aurora)', eseo: true, mashaGpt: false, neiroCard: true, sellerDen: false },
  { feature: 'Аналитика конкурентов', eseo: true, mashaGpt: false, neiroCard: false, sellerDen: true },
  { feature: 'Автоответы на отзывы', eseo: true, mashaGpt: false, neiroCard: false, sellerDen: false },
  { feature: 'SEO-оптимизация карточек', eseo: true, mashaGpt: false, neiroCard: false, sellerDen: true },
  { feature: 'Массовая обработка', eseo: true, mashaGpt: false, neiroCard: false, sellerDen: false },
  { feature: 'Интеграция WB API', eseo: true, mashaGpt: false, neiroCard: false, sellerDen: true },
  { feature: 'Интеграция Ozon API', eseo: true, mashaGpt: false, neiroCard: false, sellerDen: false },
  { feature: 'Dashboard с метриками', eseo: true, mashaGpt: false, neiroCard: false, sellerDen: false },
  { feature: 'AI-рекомендации по нише', eseo: true, mashaGpt: false, neiroCard: false, sellerDen: false },
];

/* ───── Testimonials ───── */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Алексей К.',
    role: 'Селлер WB, 500+ SKU',
    text: 'За первый месяц карточки выросли в среднем на 34% по позициям. Автоответы на отзывы — это вообще магия.',
    rating: 5,
    avatar: 'А',
  },
  {
    name: 'Мария С.',
    role: 'Менеджер Ozon-магазина',
    text: 'Раньше на 1 карточку уходило 2 часа. Теперь — 5 минут. ESEO окупился за первую неделю.',
    rating: 5,
    avatar: 'М',
  },
  {
    name: 'Дмитрий В.',
    role: 'Владелец бренда одежды',
    text: 'Аналитика конкурентов помогла найти незанятые ниши. Вывели 3 товара в топ за 2 недели.',
    rating: 5,
    avatar: 'Д',
  },
  {
    name: 'Елена Т.',
    role: 'Менеджер маркетплейсов',
    text: 'Массовая обработка — спасение. 200 карточек за вечер вместо недели. Команда в шоке от скорости.',
    rating: 5,
    avatar: 'Е',
  },
  {
    name: 'Игорь Н.',
    role: 'Предприниматель, электроника',
    text: 'SEO-оптимизация вывела 8 товаров на первую страницу WB. ROI за месяц — x12.',
    rating: 5,
    avatar: 'И',
  },
  {
    name: 'Анна Р.',
    role: 'Владелица магазина косметики',
    text: 'Автоответы экономят мне 3 часа в день. AI отвечает вежливо, точно и в стиле бренда.',
    rating: 5,
    avatar: 'А',
  },
];

/* ───── Pricing ───── */
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '0 ₽',
    period: '',
    desc: 'Для знакомства с платформой',
    items: ['5 карточек в месяц', 'Базовая генерация текста', 'SEO-проверка', 'Без привязки карты'],
    highlighted: false,
    cta: 'Начать бесплатно',
    ctaLink: '/auth/register',
  },
  {
    name: 'Pro',
    price: '29 000 ₽',
    period: '/мес',
    desc: 'Для активных селлеров',
    items: [
      'Безлимитные генерации',
      'Аналитика конкурентов',
      'Автоответы на отзывы',
      'AI-рекомендации',
      'Массовая обработка',
      'Интеграция WB + Ozon API',
      'Приоритетная поддержка',
    ],
    highlighted: true,
    cta: 'Выбрать Pro',
    ctaLink: '/auth/register?plan=pro',
  },
  {
    name: 'Enterprise',
    price: 'от 79 000 ₽',
    period: '',
    desc: 'Для агентств и крупных брендов',
    items: [
      'Всё из Pro',
      'White Label решение',
      'Выделенный менеджер',
      'Custom интеграции',
      'SLA 99.9%',
      'Обучение команды',
    ],
    highlighted: false,
    cta: 'Связаться с нами',
    ctaLink: '/contacts',
  },
];

/* ───── FAQ ───── */
export const FAQ_DATA: FaqItem[] = [
  { q: 'Как быстро я получу первую карточку?', a: 'Регистрация занимает 30 секунд. Первая карточка будет готова через 2-3 минуты после загрузки товара. Никаких настроек не нужно.' },
  { q: 'Поддерживаете ли вы Wildberries и Ozon?', a: 'Да, ESEO полностью поддерживает оба маркетплейса. Мы генерируем контент с учётом требований каждой площадки и предлагаем прямую интеграцию через API.' },
  { q: 'Насколько уникальны сгенерированные тексты?', a: 'Каждый текст генерируется уникально на основе вашего товара и анализа конкурентов. Уникальность — 95%+ по всем проверкам.' },
  { q: 'Можно ли отменить подписку?', a: 'Да, подписку можно отменить в любой момент в личном кабинете. Доступ сохранится до конца оплаченного периода.' },
  { q: 'Есть ли API для разработчиков?', a: 'Да, на тарифе Enterprise мы предоставляем полный REST API с документацией для интеграции ESEO в ваши системы.' },
  { q: 'Как работают автоответы на отзывы?', a: 'AI анализирует тон и содержание отзыва, формирует ответ в стиле вашего бренда. Вы можете настроить шаблоны и правила модерации.' },
];

/* ───── Blog posts ───── */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'kak-sozdat-idealnuyu-kartochku-wb-2026',
    title: 'Как создать идеальную карточку товара на WB в 2026 году',
    excerpt: 'Полный гайд по структуре, SEO-оптимизации и визуалам для карточек Wildberries с использованием AI.',
    date: '2026-04-15',
    readTime: '12 мин',
    category: 'Гайд',
  },
  {
    slug: 'seo-kartochek-ozon-polnoe-rukovodstvo',
    title: 'SEO карточек на Ozon: полное руководство',
    excerpt: 'Разбираем алгоритм ранжирования Ozon и показываем, как вывести товар на первую страницу.',
    date: '2026-04-12',
    readTime: '15 мин',
    category: 'SEO',
  },
  {
    slug: 'avtootvety-na-otzyvy-uvelichivayut-prodazhi',
    title: 'Как автоответы на отзывы увеличивают продажи на 23%',
    excerpt: 'Кейс: внедрение AI-автоответов для магазина с 1000+ отзывов в месяц.',
    date: '2026-04-10',
    readTime: '8 мин',
    category: 'Кейс',
  },
  {
    slug: 'analiz-konkurentov-na-wildberries',
    title: 'Анализ конкурентов на Wildberries: 7 метрик, которые решают',
    excerpt: 'Какие метрики отслеживать, чтобы обойти конкурентов и занять топ выдачи.',
    date: '2026-04-08',
    readTime: '10 мин',
    category: 'Аналитика',
  },
  {
    slug: 'massovaya-zagruzka-tovarov-wb-ozon',
    title: 'Массовая загрузка товаров: как обработать 500 SKU за день',
    excerpt: 'Пошаговая инструкция по массовой генерации карточек через ESEO.',
    date: '2026-04-05',
    readTime: '7 мин',
    category: 'Инструкция',
  },
  {
    slug: 'ai-vs-kopirajter-kto-delaet-kartochki-luchshe',
    title: 'AI vs копирайтер: кто делает карточки лучше в 2026?',
    excerpt: 'Сравниваем качество, скорость и стоимость AI-генерации и ручного написания карточек товаров.',
    date: '2026-04-02',
    readTime: '11 мин',
    category: 'Исследование',
  },
];

/* ───── Integrations ───── */
export const INTEGRATIONS = [
  { name: 'Wildberries', short: 'WB' },
  { name: 'Ozon', short: 'OZ' },
  { name: 'YandexGPT', short: 'YG' },
  { name: 'Flux AI', short: 'FX' },
  { name: 'ЮKassa', short: 'ЮK' },
  { name: 'Telegram', short: 'TG' },
];
