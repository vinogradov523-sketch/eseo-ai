'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Mail, MessageCircle, Check } from 'lucide-react';

export default function ContactsPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Replace with real API call
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <h1 className="font-bold text-lg">Контакты</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4 font-semibold">
              Контакты
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
              Давайте поговорим.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Есть вопросы, предложения или хотите обсудить Enterprise-план? Мы отвечаем в течение 2 часов
              в рабочее время.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:hello@eseo-ai.ru"
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-orange-500/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-xs text-zinc-500">hello@eseo-ai.ru</div>
                </div>
              </a>

              <a
                href="https://t.me/eseo_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-orange-500/20 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Telegram</div>
                  <div className="text-xs text-zinc-500">@eseo_ai</div>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="rounded-[28px] border border-green-500/20 bg-green-500/[0.05] p-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Отправлено!</h3>
                <p className="text-sm text-zinc-400">Мы ответим вам в течение 2 часов в рабочее время.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-5"
              >
                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
                    Имя
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Как вас зовут?"
                    className="w-full min-h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full min-h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-500 uppercase tracking-wider mb-2 block">
                    Сообщение
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Расскажите, чем мы можем помочь..."
                    rows={5}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/30 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all touch-manipulation"
                >
                  <Send className="w-4 h-4" />
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
