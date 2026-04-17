import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Условия использования',
  description: 'Условия использования платформы ESEO.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <h1 className="font-bold text-lg">Условия использования</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-sm text-zinc-400 leading-relaxed">
        <p className="text-xs text-zinc-600">Последнее обновление: 15 апреля 2026 г.</p>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">1. Принятие условий</h2>
          <p>Используя платформу ESEO, вы соглашаетесь с настоящими Условиями использования. Если вы не согласны с каким-либо из условий, пожалуйста, не используйте наш сервис.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">2. Описание сервиса</h2>
          <p>ESEO предоставляет AI-инструменты для создания карточек товаров, аналитики конкурентов и автоматизации ответов на отзывы для маркетплейсов Wildberries и Ozon.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">3. Регистрация</h2>
          <p>Для использования сервиса необходимо зарегистрироваться, предоставив достоверные данные. Вы несёте ответственность за сохранность своих учётных данных.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">4. Оплата и подписка</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Бесплатный тариф включает 5 генераций карточек в месяц</li>
            <li>Платные тарифы оплачиваются ежемесячно</li>
            <li>Подписку можно отменить в любой момент</li>
            <li>Возврат средств осуществляется в соответствии с законодательством РФ</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">5. Ограничения использования</h2>
          <p>Запрещается использовать сервис для незаконных целей, распространения вредоносного контента, реверс-инжиниринга или массового автоматизированного доступа без согласования.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">6. Ограничение ответственности</h2>
          <p>ESEO предоставляется «как есть». Мы не гарантируем конкретных бизнес-результатов от использования сервиса. Сгенерированный контент требует проверки перед публикацией.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">7. Контакты</h2>
          <p>По всем вопросам: hello@eseo-ai.ru</p>
        </section>
      </div>
    </div>
  );
}
