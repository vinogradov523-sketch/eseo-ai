'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  Link2,
  FileText,
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  Check,
  ChevronDown,
  Loader2,
} from 'lucide-react';

type InputMode = 'url' | 'text' | 'photo';
type Marketplace = 'wb' | 'ozon';

export default function GeneratorPage() {
  const [mode, setMode] = useState<InputMode>('url');
  const [marketplace, setMarketplace] = useState<Marketplace>('wb');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    title: string;
    description: string;
    bullets: string[];
    keywords: string[];
    seoScore: number;
  }>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(null);

    // Simulated AI generation (replace with real API call)
    await new Promise((r) => setTimeout(r, 3000));

    setResult({
      title: `Премиальный товар — ${input.slice(0, 30)}... | Топ качество | Быстрая доставка`,
      description:
        'Откройте для себя непревзойдённое качество и стиль. Наш товар создан с вниманием к каждой детали, чтобы превзойти ваши ожидания. Идеальный выбор для тех, кто ценит надёжность и элегантность. Сертифицированное производство, гарантия качества 12 месяцев.',
      bullets: [
        '✅ Премиальные материалы — долговечность и комфорт',
        '✅ Универсальный дизайн — подходит для любого случая',
        '✅ Быстрая доставка — получите за 1-3 дня',
        '✅ Гарантия возврата — 14 дней без вопросов',
        '✅ Сертифицировано — соответствует ГОСТ',
      ],
      keywords: [
        'купить премиум',
        'качественный товар',
        'быстрая доставка',
        'гарантия качества',
        'топ продаж',
        'хит 2026',
        'оригинал',
        'сертифицированный',
      ],
      seoScore: 87,
    });
    setLoading(false);
  };

  const copyAll = () => {
    if (!result) return;
    const text = `${result.title}\n\n${result.description}\n\n${result.bullets.join('\n')}\n\nКлючевые слова: ${result.keywords.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </Link>
            <div>
              <h1 className="font-bold text-lg">AI Генератор карточек</h1>
              <p className="text-xs text-zinc-500">Создайте карточку товара за 3 минуты</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-600">Осталось: 5/5 бесплатных</span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input panel */}
          <div>
            <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
              {/* Marketplace selector */}
              <div className="mb-6">
                <label className="text-xs text-zinc-500 uppercase tracking-wider mb-3 block">
                  Маркетплейс
                </label>
                <div className="flex gap-2">
                  {(['wb', 'ozon'] as Marketplace[]).map((mp) => (
                    <button
                      key={mp}
                      onClick={() => setMarketplace(mp)}
                      className={`flex-1 min-h-11 rounded-xl text-sm font-medium transition-all ${
                        marketplace === mp
                          ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                          : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {mp === 'wb' ? 'Wildberries' : 'Ozon'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input mode tabs */}
              <div className="mb-6">
                <label className="text-xs text-zinc-500 uppercase tracking-wider mb-3 block">
                  Источник данных
                </label>
                <div className="flex gap-2">
                  {[
                    { key: 'url' as InputMode, icon: Link2, label: 'Ссылка' },
                    { key: 'text' as InputMode, icon: FileText, label: 'Описание' },
                    { key: 'photo' as InputMode, icon: Upload, label: 'Фото' },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setMode(tab.key)}
                      className={`flex-1 min-h-11 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                        mode === tab.key
                          ? 'bg-white/10 border border-white/20 text-white'
                          : 'bg-white/5 border border-white/5 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input area */}
              <div className="mb-6">
                {mode === 'url' && (
                  <input
                    type="url"
                    placeholder="https://www.wildberries.ru/catalog/123456789/detail.aspx"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full min-h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30 transition-colors"
                  />
                )}
                {mode === 'text' && (
                  <textarea
                    placeholder="Опишите ваш товар: что это, для кого, ключевые характеристики..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={6}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30 transition-colors resize-none"
                  />
                )}
                {mode === 'photo' && (
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-10 text-center hover:border-orange-500/30 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
                    <p className="text-sm text-zinc-500">
                      Перетащите фото товара или{' '}
                      <span className="text-orange-400 underline">выберите файл</span>
                    </p>
                    <p className="text-xs text-zinc-700 mt-2">PNG, JPG до 10 МБ</p>
                  </div>
                )}
              </div>

              {/* Generate button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className="w-full min-h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    AI генерирует карточку...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Сгенерировать карточку
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output panel */}
          <div>
            {!result && !loading && (
              <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[500px] text-center">
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-zinc-700" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-500 mb-2">Результат появится здесь</h3>
                <p className="text-sm text-zinc-600 max-w-sm">
                  Введите ссылку, описание или загрузите фото товара — AI создаст полную карточку за 2-3 минуты.
                </p>
              </div>
            )}

            {loading && (
              <div className="rounded-[28px] border border-orange-500/20 bg-orange-500/[0.03] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[500px] text-center">
                <div className="w-16 h-16 rounded-3xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 animate-pulse">
                  <Sparkles className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI анализирует и генерирует...</h3>
                <div className="space-y-2 text-sm text-zinc-500 mt-4">
                  <p>🔍 Анализ конкурентов в нише...</p>
                  <p>📝 Генерация заголовка и описания...</p>
                  <p>🔑 Подбор ключевых слов...</p>
                  <p>✅ Проверка SEO-оптимизации...</p>
                </div>
              </div>
            )}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-6"
              >
                {/* SEO Score */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <span className="text-green-400 font-black text-lg">{result.seoScore}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold">SEO Score</div>
                      <div className="text-xs text-zinc-500">Отличная оптимизация</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={copyAll}
                      className="min-h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Скопировано' : 'Копировать'}
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="min-h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-medium flex items-center gap-2 hover:bg-white/10 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
                    Заголовок
                  </label>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm leading-relaxed">
                    {result.title}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
                    Описание
                  </label>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm leading-relaxed text-zinc-300">
                    {result.description}
                  </div>
                </div>

                {/* Bullets */}
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
                    Bullet-points
                  </label>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
                    {result.bullets.map((b, i) => (
                      <p key={i} className="text-sm text-zinc-300">
                        {b}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
                    Ключевые слова
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {result.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-orange-400"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/5 flex gap-3">
                  <button className="flex-1 min-h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-sm touch-manipulation">
                    Экспорт в {marketplace === 'wb' ? 'WB' : 'Ozon'}
                  </button>
                  <button className="min-h-12 px-6 rounded-2xl border border-white/10 bg-white/5 text-white font-medium text-sm flex items-center gap-2 touch-manipulation">
                    <Download className="w-4 h-4" />
                    Скачать
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
