'use client';

import { useEffect, useState, useRef } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  Sparkles,
  BarChart3,
  MessageSquareText,
  ShieldCheck,
  Gauge,
  Rocket,
  Check,
  Play,
  MessagesSquare,
  ChevronUp,
  ChevronDown,
  Star,
  Zap,
  TrendingUp,
  Users,
  Clock,
  Shield,
  ArrowUpRight,
  ExternalLink,
  Bot,
  Brain,
  Target,
  Layers,
  RefreshCw,
  Send,
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';

/* ───────────────────────── helpers ───────────────────────── */

function useCountUp(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!startOnView || !inView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, startOnView, inView]);

  return { count, ref };
}

/* ───────────────────────── animation variants ───────────────────────── */

const reveal = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

/* ───────────────────────── data ───────────────────────── */

const NAV_LINKS = [
  { href: '#features', label: 'Возможности' },
  { href: '#how', label: 'Как работает' },
  { href: '#compare', label: 'Сравнение' },
  { href: '#testimonials', label: 'Отзывы' },
  { href: '#pricing', label: 'Цены' },
  { href: '#faq', label: 'FAQ' },
];

const STATS = [
  { value: 12400, suffix: '+', label: 'Карточек создано' },
  { value: 340, suffix: '+', label: 'Активных селлеров' },
  { value: 97, suffix: '%', label: 'Довольных клиентов' },
  { value: 3, suffix: 'мин', label: 'Среднее время генерации' },
];

const FEATURES = [
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

const STEPS = [
  {
    num: '01',
    title: 'Загрузите товар',
    desc: 'Фото, ссылку на WB/Ozon или краткое описание товара.',
    icon: ArrowUpRight,
  },
  {
    num: '02',
    title: 'AI анализирует нишу',
    desc: 'Сравнивает топ-10 конкурентов, находит точки роста и ключевые слова.',
    icon: Brain,
  },
  {
    num: '03',
    title: 'Генерирует контент',
    desc: 'Создаёт тексты, структуру, bullet-points и блоки rich-контента.',
    icon: Sparkles,
  },
  {
    num: '04',
    title: 'Публикуете и растёте',
    desc: 'Экспортируйте готовую карточку в WB/Ozon за 1 клик через API.',
    icon: Rocket,
  },
];

const COMPARISON = [
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

const TESTIMONIALS = [
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
];

const PRICING_PLANS = [
  {
    name: 'Starter',
    price: '0 ₽',
    period: '',
    desc: 'Для знакомства с платформой',
    items: ['5 карточек в месяц', 'Базовая генерация текста', 'SEO-проверка', 'Без привязки карты'],
    highlighted: false,
    cta: 'Начать бесплатно',
    ctaLink: '/dashboard',
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
    ctaLink: '/dashboard?plan=pro',
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

const FAQ_DATA = [
  {
    q: 'Как быстро я получу первую карточку?',
    a: 'Регистрация занимает 30 секунд. Первая карточка будет готова через 2-3 минуты после загрузки товара. Никаких настроек не нужно.',
  },
  {
    q: 'Поддерживаете ли вы Wildberries и Ozon?',
    a: 'Да, ESEO полностью поддерживает оба маркетплейса. Мы генерируем контент с учётом требований каждой площадки и предлагаем прямую интеграцию через API.',
  },
  {
    q: 'Насколько уникальны сгенерированные тексты?',
    a: 'Каждый текст генерируется уникально на основе вашего товара и анализа конкурентов. Уникальность — 95%+ по всем проверкам.',
  },
  {
    q: 'Можно ли отменить подписку?',
    a: 'Да, подписку можно отменить в любой момент в личном кабинете. Доступ сохранится до конца оплаченного периода.',
  },
  {
    q: 'Есть ли API для разработчиков?',
    a: 'Да, на тарифе Enterprise мы предоставляем полный REST API с документацией для интеграции ESEO в ваши системы.',
  },
  {
    q: 'Как работают автоответы на отзывы?',
    a: 'AI анализирует тон и содержание отзыва, формирует ответ в стиле вашего бренда. Вы можете настроить шаблоны и правила модерации.',
  },
];

const INTEGRATIONS = [
  { name: 'Wildberries', short: 'WB' },
  { name: 'Ozon', short: 'OZ' },
  { name: 'YandexGPT', short: 'YG' },
  { name: 'Flux AI', short: 'FX' },
  { name: 'ЮKassa', short: 'ЮK' },
  { name: 'Telegram', short: 'TG' },
];

/* ───────────────────────── FAQ Item ───────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 min-h-14 touch-manipulation"
        aria-expanded={open}
      >
        <span className="text-base sm:text-lg font-medium pr-4">{q}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-zinc-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm sm:text-base text-zinc-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────── MAIN PAGE ───────────────────────── */

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowMobileCta(window.scrollY > 500);
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stat1 = useCountUp(12400, 2500);
  const stat2 = useCountUp(340, 2000);
  const stat3 = useCountUp(97, 1500);
  const stat4 = useCountUp(3, 1000);
  const statRefs = [stat1, stat2, stat3, stat4];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-orange-500/30">
      {/* ─── JSON-LD ─── */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'ESEO',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            description: 'AI-платформа для селлеров WB и Ozon: генерация карточек, аналитика, автоответы.',
            url: 'https://eseo-ai.ru',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'RUB',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '340',
            },
          }),
        }}
      />

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-white/10 bg-black/80 backdrop-blur-2xl'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
              <span className="text-white font-black text-lg">E</span>
            </div>
            <div>
              <div className="font-bold tracking-tight text-lg">ESEO</div>
              <div className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                AI for marketplaces
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm text-zinc-400">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 text-sm text-zinc-300 hover:text-white transition-colors"
            >
              Войти
            </Link>
            <Link
              href="/dashboard"
              className="min-h-11 px-6 py-2.5 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/10 hover:shadow-orange-500/25"
            >
              Запустить бесплатно
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 min-h-12 min-w-12 flex items-center justify-center text-white touch-manipulation"
            aria-label="Меню"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
            >
              <div className="flex flex-col items-center gap-5 py-7 text-base text-zinc-300">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 w-[92%] min-h-12 py-4 rounded-2xl bg-white text-black font-semibold text-center touch-manipulation"
                >
                  Запустить бесплатно
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[100svh] pt-24 flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,115,22,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.03),transparent_50%)]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-[fog_80s_linear_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-red-500/5 rounded-full blur-3xl animate-[fog_110s_linear_infinite_reverse]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 rounded-full border border-orange-500/20 bg-orange-500/5 px-5 py-2.5 text-xs uppercase tracking-[0.25em] text-orange-400 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              AI платформа №1 для WB и Ozon
            </motion.div>

            <motion.h1
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black tracking-[-0.03em] leading-[0.92] max-w-5xl"
            >
              Карточки, которые
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                продают сами.
              </span>
            </motion.h1>

            <motion.p
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="mt-6 max-w-2xl text-lg sm:text-xl text-zinc-400 leading-relaxed"
            >
              ESEO — AI-агент, который анализирует конкурентов, генерирует
              карточки товаров и отвечает на отзывы за вас. Не просто текст —
              полная стратегия роста на маркетплейсах.
            </motion.p>

            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/dashboard"
                className="w-full sm:w-auto min-h-14 inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-[0.98] touch-manipulation text-base"
              >
                Создать карточку бесплатно
                <ArrowRight className="w-5 h-5" />
              </Link>

              <button
                onClick={() => {
                  const el = document.getElementById('how');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto min-h-14 inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/10 hover:border-white/20 touch-manipulation text-base"
              >
                <Play className="w-5 h-5" /> Как это работает
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-10 flex items-center gap-6 text-sm text-zinc-500"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                5 карточек бесплатно
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Без привязки карты
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                Результат за 3 минуты
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-zinc-600 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-orange-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ SOCIAL PROOF / STATS ═══════════════ */}
      <section className="py-16 md:py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={reveal}
                className="text-center p-6 rounded-3xl border border-white/5 bg-white/[0.02]"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                  <span ref={statRefs[i].ref}>{statRefs[i].count.toLocaleString()}</span>
                  <span className="text-orange-400">{stat.suffix}</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Integrations strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <span className="text-xs text-zinc-600 uppercase tracking-wider mr-2">Интеграции:</span>
            {INTEGRATIONS.map((int) => (
              <div
                key={int.name}
                className="px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-zinc-400 hover:border-orange-500/20 hover:text-orange-400 transition-all cursor-default"
                title={int.name}
              >
                {int.name}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal}
            className="max-w-3xl mb-12"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4 font-semibold">Возможности</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
              Всё, что нужно селлеру.
              <br />
              <span className="text-zinc-500">Ничего лишнего.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {FEATURES.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={reveal}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="group rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-xl hover:border-orange-500/20 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-orange-400 group-hover:bg-orange-500/10 group-hover:border-orange-500/20 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    {item.badge && (
                      <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how" className="py-20 md:py-28 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,115,22,0.05),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={reveal}
            className="max-w-3xl mb-12"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4 font-semibold">Процесс</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Четыре шага до топа выдачи.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-30px' }}
                  variants={reveal}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="text-orange-400 text-sm font-bold font-mono">{step.num}</div>
                    <div className="h-px flex-1 bg-gradient-to-r from-orange-500/30 to-transparent" />
                    <Icon className="w-5 h-5 text-zinc-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                  {i < STEPS.length - 1 && (
                    <div className="hidden xl:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-orange-500/30 to-transparent" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPARISON TABLE ═══════════════ */}
      <section id="compare" className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="max-w-3xl mb-12"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4 font-semibold">Сравнение</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Почему ESEO, а не «ещё один генератор».
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
            className="overflow-x-auto rounded-[28px] border border-white/[0.06]"
          >
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-4 sm:p-5 text-zinc-500 font-medium">Функция</th>
                  <th className="p-4 sm:p-5 text-center">
                    <span className="font-bold text-orange-400">ESEO</span>
                  </th>
                  <th className="p-4 sm:p-5 text-center text-zinc-500">MashaGPT</th>
                  <th className="p-4 sm:p-5 text-center text-zinc-500">Neiro-Card</th>
                  <th className="p-4 sm:p-5 text-center text-zinc-500">SellerDen</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={row.feature} className={i < COMPARISON.length - 1 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 sm:p-5 text-zinc-300">{row.feature}</td>
                    <td className="p-4 sm:p-5 text-center">
                      {row.eseo ? (
                        <Check className="w-5 h-5 text-orange-400 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-zinc-700 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      {row.mashaGpt ? (
                        <Check className="w-5 h-5 text-zinc-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-zinc-800 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      {row.neiroCard ? (
                        <Check className="w-5 h-5 text-zinc-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-zinc-800 mx-auto" />
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-center">
                      {row.sellerDen ? (
                        <Check className="w-5 h-5 text-zinc-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-zinc-800 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="testimonials" className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="max-w-3xl mb-12"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4 font-semibold">Отзывы</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Селлеры уже зарабатывают больше.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {TESTIMONIALS.map((t) => (
              <motion.div
                key={t.name}
                variants={reveal}
                className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="max-w-3xl mb-12"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4 font-semibold">Тарифы</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Прозрачные цены. Без скрытых платежей.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {PRICING_PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                variants={reveal}
                className={`relative rounded-[28px] p-6 sm:p-8 ${
                  plan.highlighted
                    ? 'border-2 border-orange-500/40 bg-gradient-to-b from-orange-500/[0.08] to-transparent shadow-[0_0_80px_rgba(249,115,22,0.12)]'
                    : 'border border-white/[0.06] bg-white/[0.02]'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-xs font-bold uppercase tracking-wider">
                    Популярный
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-zinc-500 mb-4">{plan.desc}</p>
                <p className="text-4xl font-black mb-6">
                  {plan.price}
                  <span className="text-sm text-zinc-500 font-normal">{plan.period}</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.ctaLink}
                  className={`block w-full min-h-12 rounded-2xl font-semibold text-center py-4 transition-all touch-manipulation ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]'
                      : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section id="faq" className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
            className="mb-12"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4 font-semibold">FAQ</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Частые вопросы.</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {FAQ_DATA.map((item) => (
              <motion.div key={item.q} variants={reveal}>
                <FaqItem q={item.q} a={item.a} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section className="py-20 md:py-28 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              Готовы увеличить продажи?
            </h2>
            <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
              Присоединяйтесь к 340+ селлерам, которые уже используют ESEO для роста на маркетплейсах.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-3 min-h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-10 py-4 font-semibold text-white text-lg hover:shadow-[0_0_60px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all touch-manipulation"
            >
              Начать бесплатно <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="mt-4 text-xs text-zinc-600">Без карты · 5 карточек бесплатно · Отмена в 1 клик</p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <span className="text-white font-black text-lg">E</span>
                </div>
                <span className="font-bold text-lg">ESEO</span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">
                AI-платформа для селлеров WB и Ozon. Генерация карточек, аналитика, автоответы.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-zinc-300">Продукт</h4>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><Link href="/generator" className="hover:text-white transition-colors">Генератор карточек</Link></li>
                <li><Link href="/analytics" className="hover:text-white transition-colors">Аналитика</Link></li>
                <li><Link href="/reviews" className="hover:text-white transition-colors">Автоответы</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Тарифы</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-zinc-300">Компания</h4>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><Link href="/about" className="hover:text-white transition-colors">О нас</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Блог</Link></li>
                <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-zinc-300">Документы</h4>
              <ul className="space-y-2.5 text-sm text-zinc-500">
                <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Конфиденциальность</Link></li>
                <li><Link href="/legal/terms" className="hover:text-white transition-colors">Условия</Link></li>
                <li><Link href="/legal/offer" className="hover:text-white transition-colors">Оферта</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-zinc-600">© 2026 ESEO. Все права защищены.</p>
            <div className="flex items-center gap-4">
              <a href="https://t.me/eseo_ai" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors text-xs">
                Telegram
              </a>
              <a href="mailto:hello@eseo-ai.ru" className="text-zinc-600 hover:text-white transition-colors text-xs">
                hello@eseo-ai.ru
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══════════════ MOBILE STICKY CTA ═══════════════ */}
      <AnimatePresence>
        {showMobileCta && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden fixed bottom-3 left-3 right-3 z-50"
          >
            <div className="rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <Link
                href="/dashboard"
                className="block w-full min-h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3.5 font-semibold text-white text-center touch-manipulation"
              >
                Запустить бесплатно
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════ CHAT WIDGET ═══════════════ */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed right-4 bottom-4 z-40 md:right-6 md:bottom-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-[0_8px_30px_rgba(249,115,22,0.25)] hover:shadow-[0_8px_40px_rgba(249,115,22,0.4)] transition-shadow touch-manipulation"
        aria-label="Открыть чат"
      >
        <MessagesSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 bottom-20 md:bottom-24 md:right-6 md:left-auto md:w-[400px] z-50"
          >
            <div className="rounded-[28px] border border-white/10 bg-[#0a0a0a] backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.7)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">ESEO Assistant</div>
                    <div className="text-[11px] text-green-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      Онлайн
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-2 text-zinc-400 hover:text-white touch-manipulation">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-zinc-300 leading-relaxed">
                  👋 Привет! Я AI-ассистент ESEO. Могу показать, как работает генератор карточек, рассказать про цены или помочь с быстрым стартом. Что интересует?
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 hover:bg-white/10 transition-colors touch-manipulation">
                    💳 Цены
                  </button>
                  <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 hover:bg-white/10 transition-colors touch-manipulation">
                    🚀 Быстрый старт
                  </button>
                  <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300 hover:bg-white/10 transition-colors touch-manipulation">
                    📊 Демо
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Напишите сообщение..."
                    className="flex-1 min-h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30"
                  />
                  <button className="min-h-11 w-11 rounded-xl bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors touch-manipulation">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
