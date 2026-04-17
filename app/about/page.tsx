import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Zap, Shield, Heart, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'О платформе ESEO',
  description: 'ESEO — AI-платформа нового поколения для продавцов на маркетплейсах. Наша миссия — автоматизировать рутину и помочь селлерам расти.',
};

const values = [
  { icon: Zap, title: 'Скорость', desc: 'Карточка за 3 минуты, а не 3 часа. Мы экономим ваше время на самом важном.' },
  { icon: Shield, title: 'Надёжность', desc: '99.9% uptime, ежедневные бэкапы, шифрование данных.' },
  { icon: Heart, title: 'Забота', desc: 'Каждая фича разработана с учётом реальных болей селлеров.' },
  { icon: Users, title: 'Сообщество', desc: '340+ селлеров уже с нами. Закрытый Telegram-чат для обмена опытом.' },
];

const timeline = [
  { date: 'Январь 2026', event: 'Идея и первый прототип' },
  { date: 'Февраль 2026', event: 'Закрытая бета с 20 селлерами' },
  { date: 'Март 2026', event: 'Запуск MVP: генератор + аналитика' },
  { date: 'Апрель 2026', event: 'Автоответы, 340+ пользователей' },
  { date: 'Май 2026', event: 'Enterprise план, WB/Ozon API v2' },
  { date: 'Q3 2026', event: 'AI-агент полного цикла, 5000+ юзеров' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <h1 className="font-bold text-lg">О платформе</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Hero */}
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4 font-semibold">О нас</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-[0.95]">
            Мы строим AI,
            <br />
            <span className="text-zinc-500">который думает как менеджер.</span>
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
            ESEO — это не просто генератор текстов. Это полноценный AI-агент, который анализирует рынок, 
            создаёт конкурентоспособный контент и помогает управлять репутацией. 
            Один инструмент вместо десяти.
          </p>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8">Наши ценности</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-orange-400" />
                  </div>
                  <h4 className="font-bold mb-2">{v.title}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8">Наш путь</h3>
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={item.date} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full ${i <= 3 ? 'bg-orange-500' : 'bg-zinc-700'}`} />
                  {i < timeline.length - 1 && (
                    <div className={`w-px h-12 ${i < 3 ? 'bg-orange-500/30' : 'bg-zinc-800'}`} />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-1">
                    {item.date}
                  </p>
                  <p className="text-sm text-zinc-300">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-12 rounded-[28px] border border-white/[0.06] bg-white/[0.02]">
          <h3 className="text-2xl font-bold mb-4">Присоединяйтесь</h3>
          <p className="text-zinc-400 mb-6">Начните использовать ESEO бесплатно прямо сейчас.</p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 min-h-12 px-8 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all"
          >
            Начать бесплатно <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
