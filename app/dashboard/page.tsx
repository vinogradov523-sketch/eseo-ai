/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  BarChart3,
  MessageSquareText,
  TrendingUp,
  ArrowUpRight,
  Eye,
  ShoppingCart,
  Star,
  Clock,
  Plus,
  ArrowRight,
} from 'lucide-react';

const quickStats = [
  { label: 'Карточек создано', value: '23', icon: Sparkles, change: '+5 за неделю', color: 'orange' },
  { label: 'Просмотры товаров', value: '12.4K', icon: Eye, change: '+18%', color: 'blue' },
  { label: 'Конверсия', value: '4.2%', icon: ShoppingCart, change: '+0.8%', color: 'green' },
  { label: 'Средний рейтинг', value: '4.8', icon: Star, change: '+0.2', color: 'yellow' },
];

const recentCards = [
  { id: 1, title: 'Bluetooth наушники TWS Pro Max', marketplace: 'WB', seoScore: 92, date: '2 часа назад' },
  { id: 2, title: 'Набор кистей для макияжа Premium', marketplace: 'Ozon', seoScore: 87, date: '5 часов назад' },
  { id: 3, title: 'Чехол для iPhone 15 силиконовый', marketplace: 'WB', seoScore: 94, date: 'Вчера' },
  { id: 4, title: 'Органайзер для косметики настольный', marketplace: 'Ozon', seoScore: 79, date: 'Вчера' },
  { id: 5, title: 'Фитнес-браслет Smart Band 8', marketplace: 'WB', seoScore: 91, date: '2 дня назад' },
];

const pendingReviews = [
  { product: 'Bluetooth наушники', review: 'Отличный звук, но зарядки хватает на 3 часа...', rating: 4 },
  { product: 'Набор кистей', review: 'Щетина мягкая, но ручки коротковаты для проф работы.', rating: 3 },
  { product: 'Чехол iPhone', review: 'Идеальная посадка! Заказал ещё для второго телефона.', rating: 5 },
];

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
          Добро пожаловать 👋
        </h1>
        <p className="text-sm text-zinc-500">
          Вот что происходит с вашими товарами на маркетплейсах.
        </p>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={reveal}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-zinc-500" />
                </div>
                <span className="text-xs text-green-400 font-medium flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-black tracking-tight">{stat.value}</div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ─── Recent Cards ─── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="xl:col-span-2 rounded-[24px] border border-white/[0.06] bg-white/[0.02] overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <div>
              <h3 className="font-bold text-sm">Последние карточки</h3>
              <p className="text-xs text-zinc-600">Ваши недавние генерации</p>
            </div>
            <Link
              href="/generator"
              className="min-h-9 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-xs font-semibold text-white flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/20 transition-all touch-manipulation"
            >
              <Plus className="w-3 h-3" /> Новая
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{card.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        card.marketplace === 'WB'
                          ? 'bg-purple-500/10 text-purple-400'
                          : 'bg-blue-500/10 text-blue-400'
                      }`}>
                        {card.marketplace}
                      </span>
                      <span className="text-[11px] text-zinc-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {card.date}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    card.seoScore >= 90
                      ? 'bg-green-500/10 text-green-400'
                      : card.seoScore >= 80
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}>
                    SEO {card.seoScore}
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-700" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ─── Pending Reviews ─── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reveal}
          transition={{ delay: 0.15 }}
          className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-white/5">
            <div>
              <h3 className="font-bold text-sm">Отзывы без ответа</h3>
              <p className="text-xs text-zinc-600">{pendingReviews.length} ожидают ответа</p>
            </div>
            <Link
              href="/reviews"
              className="text-xs text-orange-400 hover:text-orange-300 font-medium"
            >
              Все →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {pendingReviews.map((review, i) => (
              <div key={i} className="p-5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-zinc-300">{review.product}</span>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3 h-3 ${
                          j < review.rating ? 'fill-orange-400 text-orange-400' : 'text-zinc-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">
                  &ldquo;{review.review}&rdquo;
                </p>
                <button className="w-full min-h-9 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 hover:text-orange-400 hover:border-orange-500/20 transition-all touch-manipulation">
                  Сгенерировать ответ
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { icon: Sparkles, label: 'Создать карточку', href: '/generator', desc: 'AI генерация за 3 мин' },
          { icon: BarChart3, label: 'Анализ конкурентов', href: '/analytics', desc: 'Цены, позиции, динамика' },
          { icon: MessageSquareText, label: 'Автоответы', href: '/reviews', desc: 'AI ответы на отзывы' },
        ].map((action) => {
          const Icon = action.icon;
          return (
            <motion.div key={action.label} variants={reveal}>
              <Link
                href={action.href}
                className="group flex items-center gap-4 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-orange-500/20 hover:bg-white/[0.04] transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500/15 transition-colors">
                  <Icon className="w-5 h-5 text-orange-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold group-hover:text-orange-400 transition-colors">
                    {action.label}
                  </div>
                  <div className="text-xs text-zinc-600">{action.desc}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-700 shrink-0 group-hover:text-orange-400 transition-colors" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
