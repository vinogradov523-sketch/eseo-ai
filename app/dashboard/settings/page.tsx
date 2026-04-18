'use client';

import { useState } from 'react';
import { User, Mail, Bell, Shield, Trash2, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    name: 'Алексей',
    email: 'alex@example.com',
    brandTone: 'Дружелюбный и профессиональный',
    notifyEmail: true,
    notifyTelegram: false,
    autoReplyEnabled: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight mb-2">Настройки</h1>
        <p className="text-sm text-zinc-500">Управляйте профилем и настройками платформы</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="font-bold text-sm mb-5 flex items-center gap-2">
            <User className="w-4 h-4 text-orange-400" />
            Профиль
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Имя</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full min-h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white focus:outline-none focus:border-orange-500/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">Email</label>
              <input
                type="email"
                value={settings.email}
                disabled
                className="w-full min-h-11 rounded-xl bg-white/5 border border-white/5 px-4 text-sm text-zinc-600 cursor-not-allowed"
              />
              <p className="text-[11px] text-zinc-600 mt-1">Email привязан к аккаунту и не может быть изменён</p>
            </div>
          </div>
        </div>

        {/* Brand tone */}
        <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="font-bold text-sm mb-5 flex items-center gap-2">
            <Mail className="w-4 h-4 text-orange-400" />
            Тон бренда для автоответов
          </h3>
          <textarea
            value={settings.brandTone}
            onChange={(e) => setSettings({ ...settings, brandTone: e.target.value })}
            rows={3}
            placeholder="Опишите, каким тоном AI должен отвечать на отзывы..."
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30 transition-colors resize-none"
          />
        </div>

        {/* Notifications */}
        <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6">
          <h3 className="font-bold text-sm mb-5 flex items-center gap-2">
            <Bell className="w-4 h-4 text-orange-400" />
            Уведомления
          </h3>
          <div className="space-y-4">
            {[
              { key: 'notifyEmail' as const, label: 'Email-уведомления', desc: 'Получать отчёты и обновления на почту' },
              { key: 'notifyTelegram' as const, label: 'Telegram-уведомления', desc: 'Мгновенные уведомления в Telegram' },
              { key: 'autoReplyEnabled' as const, label: 'Авто-публикация ответов', desc: 'Автоматически публиковать ответы AI (без модерации)' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-zinc-600">{item.desc}</div>
                </div>
                <button
                  onClick={() =>
                    setSettings({ ...settings, [item.key]: !settings[item.key] })
                  }
                  className={`w-11 h-6 rounded-full transition-all ${
                    settings[item.key] ? 'bg-orange-500' : 'bg-white/10'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                      settings[item.key] ? 'translate-x-5.5' : 'translate-x-0.5'
                    }`}
                    style={{ transform: settings[item.key] ? 'translateX(22px)' : 'translateX(2px)' }}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full min-h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all touch-manipulation"
        >
          {saved ? (
            <>
              <Check className="w-5 h-5" /> Сохранено
            </>
          ) : (
            <>
              <Save className="w-5 h-5" /> Сохранить настройки
            </>
          )}
        </button>

        {/* Danger zone */}
        <div className="rounded-[24px] border border-red-500/20 bg-red-500/[0.03] p-6">
          <h3 className="font-bold text-sm mb-3 text-red-400 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Опасная зона
          </h3>
          <p className="text-xs text-zinc-500 mb-4">
            Удаление аккаунта необратимо. Все данные, карточки и история будут удалены навсегда.
          </p>
          <button className="min-h-10 px-6 rounded-xl border border-red-500/30 text-red-400 text-xs font-medium hover:bg-red-500/10 transition-colors touch-manipulation">
            Удалить аккаунт
          </button>
        </div>
      </div>
    </div>
  );
}
