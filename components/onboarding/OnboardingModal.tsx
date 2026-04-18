'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  BarChart3,
  MessageSquareText,
  ArrowRight,
  ArrowLeft,
  X,
  Rocket,
  Check,
} from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: Sparkles,
    title: 'Генератор карточек',
    desc: 'Загрузите ссылку или описание товара — AI создаст полную карточку за 3 минуты с заголовком, описанием, ключевыми словами и SEO-оценкой.',
    action: 'Попробовать',
    href: '/generator',
  },
  {
    icon: BarChart3,
    title: 'Аналитика конкурентов',
    desc: 'Отслеживайте цены, позиции, рейтинги и продажи конкурентов. AI даёт рекомендации по улучшению ваших карточек.',
    action: 'Смотреть аналитику',
    href: '/analytics',
  },
  {
    icon: MessageSquareText,
    title: 'Автоответы на отзывы',
    desc: 'AI отвечает на отзывы покупателей в тоне вашего бренда 24/7. Повышает рейтинг и экономит 3+ часа в день.',
    action: 'Настроить',
    href: '/reviews',
  },
  {
    icon: Rocket,
    title: 'Вы готовы к старту!',
    desc: 'У вас 5 бесплатных генераций карточек. Начните с первого товара — результат будет через 3 минуты.',
    action: 'Создать первую карточку',
    href: '/generator',
  },
];

export function OnboardingModal() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem('onboarding-completed');
    if (!seen) {
      const t = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  const complete = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setShow(false);
  };

  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg rounded-[28px] border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl overflow-hidden"
          >
            {/* Progress */}
            <div className="flex gap-1.5 mb-8">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    i <= step ? 'bg-orange-500' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Close */}
            <button
              onClick={complete}
              className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-orange-400" />
                </div>

                <h3 className="text-2xl font-black mb-3">{current.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-8">{current.desc}</p>
              </motion.div>
            </AnimatePresence>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="min-h-10 px-4 rounded-xl border border-white/10 text-sm text-zinc-400 flex items-center gap-1 hover:bg-white/5 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Назад
                  </button>
                )}
              </div>

              {isLast ? (
                <Link
                  href={current.href}
                  onClick={complete}
                  className="min-h-12 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                >
                  {current.action} <Rocket className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={() => setStep(step + 1)}
                  className="min-h-12 px-6 rounded-xl bg-white text-black font-semibold flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all"
                >
                  Далее <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Skip */}
            <div className="mt-4 text-center">
              <button
                onClick={complete}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
              >
                Пропустить введение
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
