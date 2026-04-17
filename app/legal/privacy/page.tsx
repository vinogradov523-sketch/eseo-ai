import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности платформы ESEO. Как мы собираем, используем и защищаем ваши данные.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <h1 className="font-bold text-lg">Политика конфиденциальности</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 text-sm text-zinc-400 leading-relaxed">
        <p className="text-xs text-zinc-600">Последнее обновление: 15 апреля 2026 г.</p>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">1. Общие положения</h2>
          <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей платформы ESEO (далее — «Платформа»), расположенной по адресу https://eseo-ai.ru.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">2. Какие данные мы собираем</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Имя и адрес электронной почты при регистрации</li>
            <li>Данные о товарах, загруженных для обработки</li>
            <li>Техническая информация (IP-адрес, тип браузера, cookie-файлы)</li>
            <li>Платёжные данные обрабатываются сторонним провайдером (ЮKassa) и не хранятся на наших серверах</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">3. Как мы используем данные</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Предоставление и улучшение сервиса</li>
            <li>Персонализация рекомендаций AI</li>
            <li>Обработка платежей</li>
            <li>Техническая поддержка</li>
            <li>Рассылка обновлений (с возможностью отписки)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">4. Защита данных</h2>
          <p>Мы используем шифрование SSL/TLS для передачи данных, хеширование паролей (bcrypt), регулярное резервное копирование и доступ к данным только для авторизованных сотрудников.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">5. Права пользователя</h2>
          <p>Вы имеете право запросить доступ к своим данным, их изменение или удаление, направив запрос на hello@eseo-ai.ru. Мы обработаем запрос в течение 30 дней.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">6. Cookie-файлы</h2>
          <p>Мы используем cookie для улучшения работы сайта и аналитики. Вы можете отключить cookie в настройках браузера.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-3">7. Контакты</h2>
          <p>По всем вопросам, связанным с конфиденциальностью: hello@eseo-ai.ru</p>
        </section>
      </div>
    </div>
  );
}
