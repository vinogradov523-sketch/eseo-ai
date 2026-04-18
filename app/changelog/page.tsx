import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Zap, Bug, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Что нового — ESEO Changelog',
  description: 'История обновлений AI-платформы ESEO для селлеров WB и Ozon.',
};

const releases = [
  {
    version: '1.3.0',
    date: '15 апреля 2026',
    title: 'Multi-Agent AI + Генерация изображений',
    changes: [
      { type: 'feature', text: 'Multi-agent AI: 5 специализированных агентов для создания карточки' },
      { type: 'feature', text: 'Генерация изображений через Flux AI и YandexART' },
      { type: 'feature', text: 'Массовая обработка: до 100 товаров за раз' },
      { type: 'improvement', text: 'Улучшена точность SEO-оценки (+15% корреляция с позициями)' },
      { type: 'fix', text: 'Исправлен сброс лимитов карточек' },
    ],
  },
  {
    version: '1.2.0',
    date: '1 апреля 2026',
    title: 'Автоответы на отзывы + Ozon API',
    changes: [
      { type: 'feature', text: 'Автоматические ответы на отзывы WB и Ozon' },
      { type: 'feature', text: 'Интеграция Ozon Seller API' },
      { type: 'feature', text: 'Настройка тона бренда для ответов' },
      { type: 'improvement', text: 'Ускорена генерация карточек на 40%' },
      { type: 'fix', text: 'Исправлена авторизация через Google' },
    ],
  },
  {
    version: '1.1.0',
    date: '15 марта 2026',
    title: 'Аналитика конкурентов + Dashboard',
    changes: [
      { type: 'feature', text: 'Dashboard с метриками и графиками' },
      { type: 'feature', text: 'Аналитика конкурентов: цены, позиции, продажи' },
      { type: 'feature', text: 'AI-рекомендации по улучшению карточек' },
      { type: 'improvement', text: 'Переработан UI генератора' },
    ],
  },
  {
    version: '1.0.0',
    date: '1 марта 2026',
    title: 'Запуск ESEO 🚀',
    changes: [
      { type: 'feature', text: 'AI генератор карточек для WB и Ozon' },
      { type: 'feature', text: 'SEO-оптимизация и оценка качества' },
      { type: 'feature', text: 'Тарифные планы: Starter, Pro, Enterprise' },
      { type: 'security', text: 'Шифрование данных, HTTPS, безопасная аутентификация' },
    ],
  },
];

const typeConfig = {
  feature: { icon: Sparkles, label: 'Новое', color: 'text-green-400 bg-green-500/10' },
  improvement: { icon: Zap, label: 'Улучшено', color: 'text-blue-400 bg-blue-500/10' },
  fix: { icon: Bug, label: 'Исправлено', color: 'text-yellow-400 bg-yellow-500/10' },
  security: { icon: Shield, label: 'Безопасность', color: 'text-purple-400 bg-purple-500/10' },
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <h1 className="font-bold text-lg">Что нового</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="space-y-12">
          {releases.map((release) => (
            <div key={release.version} className="relative pl-8 border-l border-white/5">
              {/* Dot */}
              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-orange-500" />

              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">
                    v{release.version}
                  </span>
                  <span className="text-xs text-zinc-600">{release.date}</span>
                </div>
                <h2 className="text-xl font-bold">{release.title}</h2>
              </div>

              {/* Changes */}
              <div className="space-y-2">
                {release.changes.map((change, i) => {
                  const config = typeConfig[change.type as keyof typeof typeConfig];
                  const Icon = config.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 ${config.color}`}>
                        {config.label}
                      </span>
                      <p className="text-sm text-zinc-300">{change.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
