'use client';

import { useState } from 'react';
import {
  ArrowRight,
  Play,
  Menu,
  X,
  Sparkles,
  BarChart3,
  MessageSquareText,
  ShieldCheck,
  Gauge,
  Rocket,
  Check,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' as const },
    },
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Генерация карточек',
      desc: 'Создавайте продающие карточки за минуты: заголовки, описания, УТП, блоки доверия и структуру для WB и Ozon.',
    },
    {
      icon: BarChart3,
      title: 'Аналитика конкурентов',
      desc: 'Отслеживайте цены, остатки, позиции и динамику рынка, чтобы принимать решения быстрее конкурентов.',
    },
    {
      icon: MessageSquareText,
      title: 'Автоответы на отзывы',
      desc: 'Поддерживайте репутацию магазина 24/7 и снижайте долю негатива без ручной рутины.',
    },
    {
      icon: ShieldCheck,
      title: 'Контроль качества',
      desc: 'Проверка текста и структуры помогает избегать типовых ошибок в карточках и визуалах.',
    },
    {
      icon: Gauge,
      title: 'Быстрый запуск',
      desc: 'Минимум кликов, быстрый поток действий и моментальный переход к результату.',
    },
    {
      icon: Rocket,
      title: 'Рост без перегруза',
      desc: 'Масштабируйте ассортимент и маркетинг без расширения команды на старте.',
    },
  ];

  const steps = [
    { num: '01', title: 'Загрузите товар', desc: 'Фото, ссылку или краткое описание продукта.' },
    { num: '02', title: 'AI анализирует', desc: 'Сравнивает рынок, конкурентов и точки роста.' },
    { num: '03', title: 'Создаёт контент', desc: 'Тексты, структура и визуальные блоки.' },
    { num: '04', title: 'Вы публикуете', desc: 'Готовые материалы можно сразу применять.' },
  ];

  const cases = [
    { percent: '↑ 87%', title: 'Магазин одежды', desc: 'Рост CTR благодаря более сильной упаковке карточек.' },
    { percent: '↓ 71%', title: 'Электроника', desc: 'Снижение негатива после внедрения автоответов.' },
  ];

  const pricing = [
    {
      name: 'Starter',
      price: '0 ₽',
      period: '',
      items: ['5 карточек в месяц', 'Базовая генерация', 'Доступ без карты'],
      highlighted: false,
      button: 'Начать бесплатно',
    },
    {
      name: 'Pro',
      price: '29 000 ₽',
      period: '/мес',
      items: ['Безлимитные генерации', 'Аналитика конкурентов', 'Автоответы на отзывы'],
      highlighted: true,
      button: 'Выбрать Pro',
    },
    {
      name: 'Enterprise',
      price: 'от 79 000 ₽',
      period: '',
      items: ['Всё из Pro', 'White Label', 'Интеграции и внедрение'],
      highlighted: false,
      button: 'Связаться',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-orange-500/30">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.18),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.06),transparent_28%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 rounded-2xl flex items-center justify-center text-2xl font-black shadow-[0_0_30px_rgba(249,115,22,0.35)]">
              E
            </div>
            <div>
              <div className="text-xl font-black tracking-tight">ESEO</div>
              <div className="text-[11px] text-zinc-400 uppercase tracking-[0.3em]">
                AI for marketplaces
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-zinc-300">
            <a href="#features" className="hover:text-white transition-colors">Возможности</a>
            <a href="#how" className="hover:text-white transition-colors">Как работает</a>
            <a href="#cases" className="hover:text-white transition-colors">Кейсы</a>
            <a href="#pricing" className="hover:text-white transition-colors">Цены</a>
          </div>

          <div className="hidden md:block">
            <button className="px-7 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-orange-500 hover:text-white transition-all shadow-[0_10px_40px_rgba(255,255,255,0.08)]">
              Запустить бесплатно →
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Открыть меню"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden bg-black/95 border-t border-white/10"
        >
          <div className="flex flex-col items-center gap-8 py-10 text-lg">
            {['features', 'how', 'cases', 'pricing'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-orange-400 capitalize"
              >
                {id}
              </a>
            ))}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 w-[90%] py-4 bg-white text-black font-semibold rounded-2xl text-lg"
            >
              Запустить бесплатно →
            </button>
          </div>
        </motion.div>
      </nav>

      <section className="min-h-screen flex items-center relative pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(249,115,22,0.18),transparent_40%)] animate-[fog_70s_linear_infinite]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_60%,rgba(249,115,22,0.12),transparent_60%)] animate-[fog_95s_linear_infinite_reverse]" />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-orange-300 text-sm backdrop-blur-xl shadow-[0_0_50px_rgba(249,115,22,0.12)]"
          >
            <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
            ПРЕМИАЛЬНАЯ AI-ПЛАТФОРМА ДЛЯ WB И OZON
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] mb-6"
          >
            AI, который превращает
            <br />
            карточки в продажи
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-10"
          >
            Генерация карточек, анализ конкурентов и автоответы на отзывы — в одной системе, созданной для роста селлеров.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-14"
          >
            <button
              onClick={() => alert('Генератор пока в разработке. Скоро будет доступен!')}
              className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-orange-600 text-white text-lg font-semibold rounded-2xl transition-all flex items-center gap-3 justify-center shadow-[0_18px_60px_rgba(249,115,22,0.28)]"
            >
              Запустить генератор <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => alert('Демо скоро будет добавлено')}
              className="px-10 py-5 bg-white/5 border border-white/15 hover:bg-white/10 text-lg rounded-2xl transition-all flex items-center gap-3 justify-center backdrop-blur-xl"
            >
              <Play className="w-5 h-5" /> Смотреть демо
            </button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {['5 карточек бесплатно', 'Без карты', 'Моментальный доступ'].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 text-zinc-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-orange-300 uppercase tracking-[0.35em] text-xs mb-4">Возможности</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">
              Платформа, которая выглядит и работает как топовый SaaS
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mt-5">
              Всё, что нужно селлеру для сильной упаковки товара и системного роста, в одном аккуратном интерфейсе.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/20">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section id="how" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-orange-300 uppercase tracking-[0.35em] text-xs mb-4">Как работает</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Четыре шага до готового результата</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
                <div className="text-orange-300 text-sm font-bold mb-5">{step.num}</div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-orange-300 uppercase tracking-[0.35em] text-xs mb-4">Кейсы</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Результаты, которые продают лучше слов</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {cases.map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-8 backdrop-blur-xl"
              >
                <div className="text-5xl font-black text-orange-400 mb-5">{item.percent}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-orange-300 uppercase tracking-[0.35em] text-xs mb-4">Цены</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight">Простые тарифы без лишнего шума</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.highlighted
                    ? 'relative rounded-[32px] border border-orange-500/40 bg-gradient-to-br from-orange-500/20 to-white/[0.04] p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(249,115,22,0.2)]'
                    : 'rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl'
                }
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    РЕКОМЕНДУЕМ
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-5xl font-black mb-8">
                  {plan.price}
                  <span className="text-base text-zinc-400">{plan.period}</span>
                </p>
                <ul className="space-y-4 mb-10 text-zinc-300">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-orange-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  className={
                    plan.highlighted
                      ? 'w-full py-4 rounded-2xl bg-white text-black font-semibold hover:bg-orange-100 transition-all'
                      : 'w-full py-4 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 transition-all'
                  }
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}