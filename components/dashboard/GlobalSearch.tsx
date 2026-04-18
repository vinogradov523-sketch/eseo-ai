'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, FileText, BarChart3, Settings, X, Command } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  id: string;
  type: 'card' | 'page' | 'action';
  title: string;
  subtitle?: string;
  href: string;
  icon: React.ElementType;
}

const QUICK_ACTIONS: SearchResult[] = [
  { id: 'gen', type: 'action', title: 'Создать карточку', subtitle: 'AI генерация', href: '/generator', icon: Sparkles },
  { id: 'ana', type: 'action', title: 'Аналитика', subtitle: 'Конкуренты', href: '/analytics', icon: BarChart3 },
  { id: 'set', type: 'page', title: 'Настройки', subtitle: 'Профиль и тон бренда', href: '/dashboard/settings', icon: Settings },
];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    if (!query.trim()) return QUICK_ACTIONS;
    return QUICK_ACTIONS.filter(
      (r) =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle?.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const select = (result: SearchResult) => {
    setOpen(false);
    setQuery('');
    router.push(result.href);
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="hidden sm:flex items-center gap-2 min-h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-500 hover:text-zinc-300 hover:border-white/20 transition-all"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Поиск...</span>
        <kbd className="ml-4 flex items-center gap-0.5 text-[10px] text-zinc-600 bg-white/5 px-1.5 py-0.5 rounded">
          <Command className="w-2.5 h-2.5" />K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <Search className="w-5 h-5 text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск карточек, действий, страниц..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none"
                />
                <button onClick={() => setOpen(false)} className="p-1 text-zinc-600 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto p-2">
                {results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-zinc-600">
                    Ничего не найдено
                  </div>
                ) : (
                  results.map((result) => {
                    const Icon = result.icon;
                    return (
                      <button
                        key={result.id}
                        onClick={() => select(result)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-white/5 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium truncate">{result.title}</div>
                          {result.subtitle && (
                            <div className="text-[11px] text-zinc-600 truncate">{result.subtitle}</div>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-700 uppercase shrink-0">
                          {result.type === 'action' ? 'Действие' : result.type === 'card' ? 'Карточка' : 'Страница'}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-4 text-[10px] text-zinc-700">
                <span>↑↓ навигация</span>
                <span>↵ выбрать</span>
                <span>esc закрыть</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
