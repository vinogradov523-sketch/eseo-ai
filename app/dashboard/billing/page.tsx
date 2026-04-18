// @ts-nocheck
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, ArrowRight, Shield, Zap, Crown, AlertCircle } from 'lucide-react';

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const currentPlan = 'starter'; // TODO: get from auth context

  const handleUpgrade = async (plan: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight mb-2">Подписка и оплата</h1>
        <p className="text-sm text-zinc-500">Управляйте вашим тарифным планом</p>
      </div>

      {/* Current plan */}
      <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Текущий план</span>
            <h2 className="text-2xl font-black mt-1 capitalize">{currentPlan}</h2>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            {currentPlan === 'starter' && <Zap className="w-6 h-6 text-zinc-500" />}
            {currentPlan === 'pro' && <Crown className="w-6 h-6 text-orange-400" />}
          </div>
        </div>

        {currentPlan === 'starter' && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-zinc-500">Карточки</span>
              <span className="font-semibold">3 / 5</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/5">
              <div className="w-3/5 h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
            </div>
          </div>
        )}

        {currentPlan === 'starter' && (
          <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-orange-300 font-medium">Осталось 2 карточки</p>
              <p className="text-xs text-zinc-500 mt-1">
                Перейдите на Pro для безлимитных генераций и доступа к аналитике.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Pro */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-[24px] p-6 ${
            currentPlan === 'pro'
              ? 'border-2 border-orange-500/40 bg-orange-500/[0.05]'
              : 'border border-white/[0.06] bg-white/[0.02]'
          }`}
        >
          <h3 className="text-xl font-bold mb-1">Pro</h3>
          <p className="text-3xl font-black mb-4">
            29 000 ₽<span className="text-sm text-zinc-500 font-normal">/мес</span>
          </p>
          <ul className="space-y-2 mb-6">
            {[
              'Безлимитные генерации',
              'Аналитика конкурентов',
              'Автоответы на отзывы',
              'AI-рекомендации',
              'WB + Ozon API',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-orange-400" />
                {item}
              </li>
            ))}
          </ul>
          {currentPlan === 'pro' ? (
            <div className="text-center text-sm text-green-400 font-medium py-3">
              ✅ Текущий план
            </div>
          ) : (
            <button
              onClick={() => handleUpgrade('pro')}
              disabled={loading}
              className="w-full min-h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50 touch-manipulation"
            >
              <CreditCard className="w-4 h-4" />
              {loading ? 'Перенаправление...' : 'Оплатить через ЮKassa'}
            </button>
          )}
        </motion.div>

        {/* Enterprise */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <h3 className="text-xl font-bold mb-1">Enterprise</h3>
          <p className="text-3xl font-black mb-4">
            от 79 000 ₽<span className="text-sm text-zinc-500 font-normal">/мес</span>
          </p>
          <ul className="space-y-2 mb-6">
            {[
              'Всё из Pro',
              'White Label',
              'Выделенный менеджер',
              'Custom интеграции',
              'SLA 99.9%',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-orange-400" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="mailto:hello@eseo-ai.ru?subject=Enterprise план"
            className="w-full min-h-12 rounded-xl border border-white/10 bg-white/5 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 transition-colors touch-manipulation"
          >
            Связаться <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Security note */}
      <div className="mt-8 flex items-center gap-3 text-xs text-zinc-600">
        <Shield className="w-4 h-4" />
        Безопасная оплата через ЮKassa. Данные карт не хранятся на наших серверах.
      </div>
    </div>
  );
}
