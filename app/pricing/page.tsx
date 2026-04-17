import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Check, ArrowRight, Zap } from 'lucide-react';
import { PRICING_PLANS, FAQ_DATA } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Тарифы — прозрачные цены без скрытых платежей',
  description: 'Выберите подходящий тариф ESEO: от бесплатного старта до Enterprise-решений для крупных брендов.',
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <h1 className="font-bold text-lg">Тарифы</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4 font-semibold">Тарифы</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Прозрачные цены.
            <br />
            <span className="text-zinc-500">Без скрытых платежей.</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Начните бесплатно. Масштабируйтесь, когда будете готовы.
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[28px] p-6 sm:p-8 ${
                plan.highlighted
                  ? 'border-2 border-orange-500/40 bg-gradient-to-b from-orange-500/[0.08] to-transparent shadow-[0_0_80px_rgba(249,115,22,0.12)]'
                  : 'border border-white/[0.06] bg-white/[0.02]'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Популярный
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-xs text-zinc-500 mb-4">{plan.desc}</p>
              <p className="text-4xl sm:text-5xl font-black mb-8">
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
                className={`block w-full min-h-14 rounded-2xl font-semibold text-center py-4 transition-all touch-manipulation ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]'
                    : 'border border-white/10 bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Частые вопросы о тарифах</h3>
          <div className="space-y-4">
            {FAQ_DATA.slice(0, 4).map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer text-sm font-medium list-none">
                  {faq.q}
                  <span className="text-zinc-600 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
