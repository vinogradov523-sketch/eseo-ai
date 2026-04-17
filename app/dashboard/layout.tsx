'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  MessageSquareText,
  Settings,
  CreditCard,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const sidebarLinks = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Обзор' },
  { href: '/generator', icon: Sparkles, label: 'Генератор' },
  { href: '/analytics', icon: BarChart3, label: 'Аналитика' },
  { href: '/reviews', icon: MessageSquareText, label: 'Автоответы' },
  { href: '/dashboard/billing', icon: CreditCard, label: 'Подписка' },
  { href: '/dashboard/settings', icon: Settings, label: 'Настройки' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      {/* ─── Desktop Sidebar ─── */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl fixed inset-y-0 left-0 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-white font-black text-base">E</span>
            </div>
            <div>
              <div className="font-bold text-sm">ESEO</div>
              <div className="text-[9px] uppercase tracking-[0.3em] text-zinc-600">Dashboard</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                  active
                    ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link
            href="/contacts"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <HelpCircle className="w-4 h-4" />
            Поддержка
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
            <LogOut className="w-4 h-4" />
            Выйти
          </button>
        </div>

        {/* Plan badge */}
        <div className="p-4 border-t border-white/5">
          <div className="rounded-xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 p-4">
            <div className="text-xs text-orange-400 font-bold uppercase tracking-wider mb-1">Starter</div>
            <div className="text-[11px] text-zinc-500 mb-3">3 из 5 карточек использовано</div>
            <div className="w-full h-1.5 rounded-full bg-white/5 mb-3">
              <div className="w-3/5 h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500" />
            </div>
            <Link
              href="/dashboard/billing"
              className="block text-center text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
            >
              Перейти на Pro →
            </Link>
          </div>
        </div>
      </aside>

      {/* ─── Mobile Header ─── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-black/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 min-h-10 min-w-10 flex items-center justify-center touch-manipulation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-white font-black text-sm">E</span>
            </div>
            <span className="font-bold text-sm">ESEO</span>
          </Link>
          <button className="p-2 min-h-10 min-w-10 flex items-center justify-center relative touch-manipulation">
            <Bell className="w-5 h-5 text-zinc-500" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
          </button>
        </div>
      </div>

      {/* ─── Mobile Sidebar Overlay ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-[#0a0a0a] border-r border-white/5 z-50 flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b border-white/5">
                <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <span className="text-white font-black">E</span>
                  </div>
                  <span className="font-bold">ESEO</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="p-2 touch-manipulation">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                        active
                          ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                          : 'text-zinc-500 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content ─── */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen">{children}</main>
    </div>
  );
}
