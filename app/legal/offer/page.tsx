import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Публичная оферта',
  description: 'Публичная оферта на оказание услуг платформой ESEO.',
};

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <h1 className="font-bold text-lg">Публичная оферта</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-sm text-zinc-400 leading-relaxed">
        <p className="text-xs text-zinc-600">Последнее обновление: 15 апреля 2026 г.</p>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">1. Предмет оферты</h2>
          <p>Настоящая публичная оферта является официальным предложением ООО «ESEO» (далее — Исполнитель) заключить договор на оказание услуг по предоставлению доступа к AI-платформе ESEO.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">2. Акцепт оферты</h2>
          <p>Акцептом оферты является регистрация на платформе и/или оплата любого тарифного плана. С момента акцепта оферты договор считается заключённым.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">3. Стоимость услуг</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Starter — бесплатно (5 генераций/месяц)</li>
            <li>Pro — 29 000 ₽/месяц</li>
            <li>Enterprise — от 79 000 ₽/месяц (индивидуальный расчёт)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">4. Порядок оплаты</h2>
          <p>Оплата осуществляется через платёжный сервис ЮKassa. Оплата списывается автоматически в начале каждого расчётного периода.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">5. Возврат средств</h2>
          <p>Возврат средств возможен в течение 14 дней с момента оплаты, если сервис не использовался. Для оформления возврата направьте запрос на hello@eseo-ai.ru.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">6. Реквизиты</h2>
          <p>ООО «ESEO»<br />ИНН: XXXXXXXXXX<br />ОГРН: XXXXXXXXXXXXX<br />Юридический адрес: г. Москва</p>
        </section>
      </div>
    </div>
  );
}
