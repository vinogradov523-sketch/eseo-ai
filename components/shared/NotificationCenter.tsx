'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Sparkles, CreditCard, MessageSquareText, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'card' | 'payment' | 'review';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'card', title: 'Карточка готова', message: 'TWS наушники — SEO Score: 92', time: '5 мин назад', read: false },
  { id: '2', type: 'review', title: 'Новый отзыв', message: 'Bluetooth наушники — ★★★★☆', time: '1 час назад', read: false },
  { id: '3', type: 'info', title: 'Обновление', message: 'Добавлена поддержка Ozon API v3', time: '3 часа назад', read: true },
  { id: '4', type: 'warning', title: 'Лимит карточек', message: 'Осталось 2 из 5 бесплатных генераций', time: 'Вчера', read: true },
];

const typeIcons = {
  success: Check,
  info: AlertCircle,
  warning: AlertCircle,
  card: Sparkles,
  payment: CreditCard,
  review: MessageSquareText,
};

const typeColors = {
  success: 'text-green-400 bg-green-500/10',
  info: 'text-blue-400 bg-blue-500/10',
  warning: 'text-yellow-400 bg-yellow-500/10',
  card: 'text-orange-400 bg-orange-500/10',
  payment: 'text-green-400 bg-green-500/10',
  review: 'text-purple-400 bg-purple-500/10',
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 min-h-10 min-w-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors touch-manipulation"
      >
        <Bell className="w-5 h-5 text-zinc-400" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-orange-500 text-[9px] font-bold text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 w-80 sm:w-96 z-50 rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                <h3 className="font-semibold text-sm">Уведомления</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-orange-400 hover:text-orange-300"
                  >
                    Прочитать все
                  </button>
                )}
              </div>

              {/* List */}
              <div className="max-h-96 overflow-y-auto divide-y divide-white/5">
                {notifications.map((n) => {
                  const Icon = typeIcons[n.type];
                  const colors = typeColors[n.type];
                  return (
                    <div
                      key={n.id}
                      className={`px-4 py-3 flex gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer ${
                        !n.read ? 'bg-white/[0.01]' : ''
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colors}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold truncate">{n.title}</span>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-zinc-500 truncate">{n.message}</p>
                        <p className="text-[10px] text-zinc-700 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-white/5 text-center">
                <button className="text-xs text-zinc-500 hover:text-white transition-colors">
                  Все уведомления
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
