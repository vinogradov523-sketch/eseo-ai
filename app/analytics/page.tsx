'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Eye,
  ShoppingCart,
  Star,
  RefreshCw,
  Filter,
  Download,
  ExternalLink,
} from 'lucide-react';

const competitors = [
  {
    name: 'Конкурент A — Premium Earbuds',
    marketplace: 'WB',
    price: 3990,
    priceChange: -5,
    position: 3,
    positionChange: 2,
    rating: 4.7,
    reviews: 1243,
    sales30d: 5420,
  },
  {
    name: 'Конкурент B — TWS наушники Sport',
    marketplace: 'WB',
    price: 2490,
    priceChange: 0,
    position: 7,
    positionChange: -1,
    rating: 4.3,
    reviews: 876,
    sales30d: 3210,
  },
  {
    name: 'Конкурент C — Беспроводные Pro',
    marketplace: 'WB',
    price: 5990,
    priceChange: 10,
    position: 1,
    positionChange: 0,
    rating: 4.9,
    reviews: 2341,
    sales30d: 8900,
  },
  {
    name: 'Конкурент D — Wireless Bass',
    marketplace: 'Ozon',
    price: 1990,
    priceChange: -15,
    position: 12,
    positionChange: -4,
    rating: 4.1,
    reviews: 432,
    sales30d: 1540,
  },
  {
    name: 'Конкурент E — Music Pro TWS',
    marketplace: 'Ozon',
    price: 4490,
    priceChange: 3,
    position: 5,
    positionChange: 1,
    rating: 4.6,
    reviews: 1567,
    sales30d: 4780,
  },
];

const insights = [
  { type: 'opportunity', text: 'Средняя цена в нише — 3 790 ₽. Ваш товар дешевле на 12%, но позиция ниже. Рекомендуем улучшить фото и описание.' },
  { type: 'warning', text: 'Конкурент C снизил цену на 10% — возможна ценовая война. Рекомендуем усилить УТП.' },
  { type: 'success', text: 'Ваш рейтинг (4.8) выше среднего по нише (4.5). Используйте это в карточке.' },
];

export default function AnalyticsPage() {
  const [query, setQuery] = useState('');
  const [activeMarketplace, setActiveMarketplace] = useState<'all' | 'wb' | 'ozon'>('all');

  const filtered = competitors.filter((c) => {
    if (activeMarketplace === 'wb') return c.marketplace === 'WB';
    if (activeMarketplace === 'ozon') return c.marketplace === 'Ozon';
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight mb-1">Аналитика конкурентов</h1>
          <p className="text-sm text-zinc-500">Мониторинг цен, позиций и динамики рынка</p>
        </div>
        <div className="flex gap-2">
          <button className="min-h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-medium flex items-center gap-2 hover:bg-white/10 transition-colors touch-manipulation">
            <Download className="w-4 h-4" />
            Экспорт
          </button>
          <button className="min-h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-medium flex items-center gap-2 hover:bg-white/10 transition-colors touch-manipulation">
            <RefreshCw className="w-4 h-4" />
            Обновить
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mb-8 space-y-3">
        <h3 className="text-xs uppercase tracking-wider text-orange-400 font-bold mb-3">
          🧠 AI-рекомендации
        </h3>
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-4 text-sm leading-relaxed border ${
              insight.type === 'opportunity'
                ? 'bg-blue-500/5 border-blue-500/20 text-blue-300'
                : insight.type === 'warning'
                ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-300'
                : 'bg-green-500/5 border-green-500/20 text-green-300'
            }`}
          >
            {insight.text}
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по нише или артикулу..."
            className="w-full min-h-11 rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'wb', 'ozon'] as const).map((mp) => (
            <button
              key={mp}
              onClick={() => setActiveMarketplace(mp)}
              className={`min-h-11 px-4 rounded-xl text-xs font-medium transition-all ${
                activeMarketplace === mp
                  ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                  : 'bg-white/5 border border-white/10 text-zinc-500 hover:text-white'
              }`}
            >
              {mp === 'all' ? 'Все' : mp === 'wb' ? 'WB' : 'Ozon'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[20px] border border-white/[0.06] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="text-left p-4 text-xs text-zinc-500 font-medium uppercase tracking-wider">Товар</th>
                <th className="p-4 text-xs text-zinc-500 font-medium uppercase tracking-wider text-center">МП</th>
                <th className="p-4 text-xs text-zinc-500 font-medium uppercase tracking-wider text-right">Цена</th>
                <th className="p-4 text-xs text-zinc-500 font-medium uppercase tracking-wider text-center">Позиция</th>
                <th className="p-4 text-xs text-zinc-500 font-medium uppercase tracking-wider text-center">Рейтинг</th>
                <th className="p-4 text-xs text-zinc-500 font-medium uppercase tracking-wider text-right">Продажи/30д</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((comp, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-sm">{comp.name}</div>
                    <div className="text-xs text-zinc-600 mt-0.5">{comp.reviews.toLocaleString()} отзывов</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${
                      comp.marketplace === 'WB'
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {comp.marketplace}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-semibold">{comp.price.toLocaleString()} ₽</div>
                    <div className={`text-xs flex items-center justify-end gap-1 mt-0.5 ${
                      comp.priceChange < 0 ? 'text-green-400' : comp.priceChange > 0 ? 'text-red-400' : 'text-zinc-600'
                    }`}>
                      {comp.priceChange < 0 ? <TrendingDown className="w-3 h-3" /> : comp.priceChange > 0 ? <TrendingUp className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                      {comp.priceChange !== 0 ? `${Math.abs(comp.priceChange)}%` : '—'}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="font-semibold">#{comp.position}</div>
                    <div className={`text-xs flex items-center justify-center gap-1 mt-0.5 ${
                      comp.positionChange > 0 ? 'text-green-400' : comp.positionChange < 0 ? 'text-red-400' : 'text-zinc-600'
                    }`}>
                      {comp.positionChange > 0 ? `↑${comp.positionChange}` : comp.positionChange < 0 ? `↓${Math.abs(comp.positionChange)}` : '—'}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                      <span className="font-semibold">{comp.rating}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right font-semibold">
                    {comp.sales30d.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
