'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  RefreshCw,
  Check,
  Copy,
  Send,
  Filter,
  Sparkles,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Clock,
  MessageSquareText,
} from 'lucide-react';

interface Review {
  id: number;
  product: string;
  marketplace: 'WB' | 'Ozon';
  author: string;
  rating: number;
  text: string;
  date: string;
  replied: boolean;
  generatedReply?: string;
}

const mockReviews: Review[] = [
  { id: 1, product: 'Bluetooth наушники TWS', marketplace: 'WB', author: 'Покупатель А.', rating: 4, text: 'Звук хороший, басы нравятся. Но зарядки хватает только на 3 часа, хотелось бы побольше. В остальном — за эту цену отлично.', date: '2 часа назад', replied: false },
  { id: 2, product: 'Набор кистей для макияжа', marketplace: 'Ozon', author: 'Елена К.', rating: 2, text: 'Ожидала лучшего качества. Щетина посыпалась после первой мойки, ручки скользкие. Не рекомендую.', date: '5 часов назад', replied: false },
  { id: 3, product: 'Чехол для iPhone 15', marketplace: 'WB', author: 'Максим В.', rating: 5, text: 'Идеальный чехол! Точно по размеру, приятный на ощупь, кнопки нажимаются чётко. Заказал ещё 2 штуки для семьи!', date: 'Вчера', replied: false },
  { id: 4, product: 'Органайзер настольный', marketplace: 'Ozon', author: 'Светлана П.', rating: 3, text: 'Нормальный органайзер, но пластик тонковат. Для лёгких вещей подойдёт, тяжёлую косметику лучше не ставить.', date: 'Вчера', replied: true, generatedReply: 'Светлана, благодарим за отзыв! Рады, что органайзер вам подходит для повседневного использования. Мы передадим ваше замечание о плотности пластика в отдел разработки для улучшения следующих партий. Ваше мнение очень важно для нас! 🙏' },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [generating, setGenerating] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'replied'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filtered = reviews.filter((r) => {
    if (filter === 'pending') return !r.replied;
    if (filter === 'replied') return r.replied;
    return true;
  });

  const handleGenerate = async (id: number) => {
    setGenerating(id);
    // Simulate AI generation
    await new Promise((r) => setTimeout(r, 2500));

    setReviews((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const replies: Record<number, string> = {
          1: `Благодарим за отзыв! 🎧 Рады, что качество звука вам понравилось. По поводу времени работы — в настоящее время мы работаем над увеличением ёмкости аккумулятора в новой партии. Рекомендуем использовать кейс для подзарядки между сессиями. Спасибо, что выбрали нас!`,
          2: `Елена, приносим искренние извинения за неудобства. Качество нашей продукции — наш приоритет. Пожалуйста, свяжитесь с нами через личные сообщения — мы оперативно решим вопрос с заменой или возвратом. Ваш отзыв поможет нам стать лучше. 🙏`,
          3: `Максим, огромное спасибо за отличный отзыв! 🔥 Очень рады, что чехол идеально подошёл. Надеемся, что и вашим близким понравится! Для постоянных покупателей у нас действуют специальные скидки — следите за обновлениями в магазине.`,
        };
        return {
          ...r,
          generatedReply: replies[r.id] || 'Спасибо за ваш отзыв! Мы ценим ваше мнение и учтём его в работе.',
          replied: false,
        };
      })
    );
    setGenerating(null);
  };

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePublish = (id: number) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, replied: true } : r))
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight mb-1">Автоответы на отзывы</h1>
          <p className="text-sm text-zinc-500">AI генерирует ответы в тоне вашего бренда</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <MessageSquareText className="w-4 h-4" />
          {reviews.filter((r) => !r.replied).length} без ответа
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {([
          { key: 'all' as const, label: 'Все' },
          { key: 'pending' as const, label: 'Без ответа' },
          { key: 'replied' as const, label: 'С ответом' },
        ]).map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`min-h-10 px-4 rounded-xl text-xs font-medium transition-all ${
              filter === f.key
                ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                : 'bg-white/5 border border-white/10 text-zinc-500 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Batch action */}
      {reviews.filter((r) => !r.replied && !r.generatedReply).length > 0 && (
        <div className="mb-6 rounded-xl bg-orange-500/5 border border-orange-500/20 p-4 flex items-center justify-between">
          <p className="text-sm text-orange-300">
            💡 {reviews.filter((r) => !r.replied && !r.generatedReply).length} отзывов можно обработать за раз
          </p>
          <button className="min-h-9 px-4 rounded-lg bg-orange-500 text-xs font-semibold text-white hover:bg-orange-600 transition-colors touch-manipulation">
            Сгенерировать все
          </button>
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        {filtered.map((review) => (
          <motion.div
            key={review.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[20px] border border-white/[0.06] bg-white/[0.02] overflow-hidden"
          >
            {/* Review header */}
            <div className="p-5 border-b border-white/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{review.author}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      review.marketplace === 'WB'
                        ? 'bg-purple-500/10 text-purple-400'
                        : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {review.marketplace}
                    </span>
                    {review.replied && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-green-500/10 text-green-400">
                        Ответ отправлен
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-600">{review.product} · {review.date}</div>
                </div>
                <div className="flex items-center gap-0.5 shrink-0">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3.5 h-3.5 ${
                        j < review.rating ? 'fill-orange-400 text-orange-400' : 'text-zinc-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>

            {/* Reply section */}
            <div className="p-5 bg-white/[0.01]">
              {!review.generatedReply && !review.replied && (
                <button
                  onClick={() => handleGenerate(review.id)}
                  disabled={generating === review.id}
                  className="w-full min-h-11 rounded-xl bg-white/5 border border-white/10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-orange-500/10 hover:border-orange-500/20 hover:text-orange-400 transition-all disabled:opacity-50 touch-manipulation"
                >
                  {generating === review.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Генерирую ответ...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Сгенерировать ответ
                    </>
                  )}
                </button>
              )}

              {review.generatedReply && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-semibold text-orange-400">AI-ответ</span>
                  </div>
                  <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-zinc-300 leading-relaxed">
                    {review.generatedReply}
                  </div>
                  {!review.replied && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePublish(review.id)}
                        className="flex-1 min-h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-xs font-semibold text-white flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/20 transition-all touch-manipulation"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Опубликовать
                      </button>
                      <button
                        onClick={() => handleCopy(review.id, review.generatedReply!)}
                        className="min-h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-medium flex items-center gap-2 hover:bg-white/10 transition-colors touch-manipulation"
                      >
                        {copiedId === review.id ? (
                          <Check className="w-3.5 h-3.5 text-green-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleGenerate(review.id)}
                        className="min-h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-medium flex items-center gap-2 hover:bg-white/10 transition-colors touch-manipulation"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
