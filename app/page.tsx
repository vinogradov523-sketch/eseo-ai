'use client';

import { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowMobileCta(window.scrollY > 280);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const reveal = {
    hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
  };

  const features = [
    { icon: Sparkles, title: 'Генерация карточек', desc: 'Сильные карточки за минуты: заголовки, описания, УТП, структура и визуалы.' },
    { icon: BarChart3, title: 'Аналитика конкурентов', desc: 'Цены, остатки, позиции и динамика рынка без ручного мониторинга.' },
    { icon: MessageSquareText, title: 'Автоответы на отзывы', desc: 'Поддерживайте репутацию магазина 24/7 и уменьшайте рутину.' },
    { icon: ShieldCheck, title: 'Контроль качества', desc: 'Проверка структуры и текста помогает избегать типовых ошибок.' },
    { icon: Gauge, title: 'Быстрый запуск', desc: 'Минимум кликов, быстрый поток действий и моментальный результат.' },
    { icon: Rocket, title: 'Рост без перегруза', desc: 'Масштабируйте ассортимент и маркетинг без расширения команды.' },
  ];

  const steps = [
    { num: '01', title: 'Загрузите товар', desc: 'Фото, ссылку или краткое описание.' },
    { num: '02', title: 'AI анализирует', desc: 'Сравнивает рынок, конкурентов и точки роста.' },
    { num: '03', title: 'Создаёт контент', desc: 'Генерирует тексты, структуру и блоки.' },
    { num: '04', title: 'Вы публикуете', desc: 'Готовые материалы можно применять сразу.' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-orange-500/30">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/8 border border-white/10 flex items-center justify-center">
              <span className="text-orange-400 font-black text-base sm:text-lg">E</span>
            </div>
            <div>
              <div className="font-semibold tracking-tight text-base sm:text-lg">ESEO</div>
              <div className="hidden sm:block text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                AI for marketplaces
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
            <a href="#features" className="hover:text-white transition-colors">Возможности</a>
            <a href="#how" className="hover:text-white transition-colors">Как работает</a>
            <a href="#pricing" className="hover:text-white transition-colors">Цены</a>
          </div>

          <div className="hidden md:block">
            <button className="min-h-12 px-6 py-3 rounded-2xl bg-white text-black font-medium hover:bg-orange-500 hover:text-white transition-all touch-manipulation">
              Запустить бесплатно
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 min-h-12 min-w-12 flex items-center justify-center text-white touch-manipulation"
            aria-label="Открыть меню"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-white/10 bg-black/95"
            >
              <div className="flex flex-col items-center gap-5 py-7 text-base text-zinc-300">
                <a href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Возможности</a>
                <a href="#how" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Как работает</a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="hover:text-white">Цены</a>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 w-[92%] min-h-12 py-4 rounded-2xl bg-white text-black font-medium touch-manipulation"
                >
                  Запустить бесплатно
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section className="relative min-h-[92svh] pt-28 flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_36%)] animate-[fog_80s_linear_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.05),transparent_28%)] animate-[fog_110s_linear_infinite_reverse]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.3em] text-zinc-400"
            >
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              AI платформа для WB и Ozon
            </motion.div>

            <motion.h1
              variants={reveal}
              initial="hidden"
              animate="visible"
              className="mt-7 text-4xl sm:text-5xl md:text-7xl lg:text-[5.6rem] font-black tracking-tight leading-[0.94] max-w-4xl"
            >
              AI, который делает
              <br />
              карточки сильнее.
            </motion.h1>

            <motion.p
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.08 }}
              className="mt-5 max-w-2xl text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed"
            >
              Генерация карточек, аналитика конкурентов и автоответы на отзывы — в одном чистом интерфейсе без лишнего шума.
            </motion.p>

            <motion.div
              variants={reveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.16 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button
                onClick={() => alert('Генератор пока в разработке.')}
                className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 font-medium text-black transition-all hover:bg-orange-500 hover:text-white touch-manipulation"
              >
                Запустить генератор <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => alert('Демо скоро будет доступно.')}
                className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-medium text-white backdrop-blur-xl transition-all hover:bg-white/10 touch-manipulation"
              >
                <Play className="w-5 h-5" /> Смотреть демо
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {['5 карточек бесплатно', 'Без карты', 'Моментальный доступ'].map((item) => (
              <motion.div
                key={item}
                variants={reveal}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-zinc-300 text-center"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">Возможности</p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Минимализм сверху, мощность внутри.</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={stagger}
            className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={reveal}
                  whileHover={{ y: -6 }}
                  className="rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white/[0.04] p-5 sm:p-7 backdrop-blur-xl"
                >
                  <div className="mb-5 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-orange-400">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="how" className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl">
            Четыре шага до результата.
          </h2>

          <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { num: '01', title: 'Загрузите товар', desc: 'Фото, ссылку или краткое описание.' },
              { num: '02', title: 'AI анализирует', desc: 'Сравнивает рынок, конкурентов и точки роста.' },
              { num: '03', title: 'Создаёт контент', desc: 'Генерирует тексты, структуру и блоки.' },
              { num: '04', title: 'Вы публикуете', desc: 'Готовые материалы можно применять сразу.' },
            ].map((step) => (
              <div key={step.num} className="rounded-[24px] sm:rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:p-7">
                <div className="text-orange-400 text-sm font-semibold mb-5">{step.num}</div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 md:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl">
            Простой выбор без лишнего веса.
          </h2>

          <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Starter', price: '0 ₽', period: '', items: ['5 карточек в месяц', 'Базовая генерация', 'Без карты'], highlighted: false, cta: 'Начать бесплатно' },
              { name: 'Pro', price: '29 000 ₽', period: '/мес', items: ['Безлимитные генерации', 'Аналитика конкурентов', 'Автоответы на отзывы'], highlighted: true, cta: 'Выбрать Pro' },
              { name: 'Enterprise', price: 'от 79 000 ₽', period: '', items: ['Всё из Pro', 'White Label', 'Интеграции и внедрение'], highlighted: false, cta: 'Связаться' },
            ].map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.highlighted
                    ? 'relative rounded-[28px] border border-orange-500/35 bg-white/[0.05] p-5 sm:p-7 shadow-[0_0_60px_rgba(249,115,22,0.14)]'
                    : 'rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:p-7'
                }
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-3xl sm:text-4xl font-black mb-6">
                  {plan.price}
                  <span className="text-sm text-zinc-500">{plan.period}</span>
                </p>
                <ul className="space-y-3 mb-7 text-sm text-zinc-300">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className={plan.highlighted ? 'w-full min-h-12 rounded-2xl bg-white px-5 py-4 text-black font-medium touch-manipulation' : 'w-full min-h-12 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white font-medium touch-manipulation'}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showMobileCta && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden fixed bottom-3 left-3 right-3 z-50"
          >
            <div className="rounded-3xl border border-white/10 bg-black/85 backdrop-blur-xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <button className="w-full min-h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4 font-semibold text-white touch-manipulation">
                Запустить бесплатно
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed right-4 bottom-4 z-40 md:right-6 md:bottom-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_20px_60px_rgba(255,255,255,0.12)] touch-manipulation"
        aria-label="Открыть чат"
      >
        <MessagesSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 bottom-20 md:bottom-24 md:right-6 md:left-auto md:w-[380px] z-50"
          >
            <div className="rounded-[28px] border border-white/10 bg-[#0b0b0b] backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div>
                  <div className="font-semibold">ESEO Assistant</div>
                  <div className="text-xs text-zinc-500">Ответим за 1 минуту</div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="p-2 text-zinc-400 touch-manipulation">
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-sm text-zinc-300">
                  Привет! Могу показать, как работает генератор карточек, цены и быстрый старт.
                </div>
                <button className="w-full min-h-12 rounded-2xl bg-white text-black font-medium touch-manipulation">
                  Начать диалог
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}