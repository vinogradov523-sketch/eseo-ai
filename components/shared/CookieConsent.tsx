'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50"
        >
          <div className="rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="flex items-start gap-3 mb-4">
              <Cookie className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold mb-1">Мы используем cookie</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Для улучшения работы сайта и аналитики. Подробнее в{' '}
                  <Link href="/legal/privacy" className="text-orange-400 hover:underline">
                    политике конфиденциальности
                  </Link>.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 min-h-10 rounded-xl bg-white text-black text-xs font-semibold hover:bg-orange-500 hover:text-white transition-all touch-manipulation"
              >
                Принять
              </button>
              <button
                onClick={decline}
                className="min-h-10 px-4 rounded-xl border border-white/10 text-xs text-zinc-400 hover:text-white transition-colors touch-manipulation"
              >
                Отклонить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
