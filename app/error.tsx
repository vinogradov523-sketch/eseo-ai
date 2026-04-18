'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to Sentry in production
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Что-то пошло не так</h1>
        <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
          Произошла непредвиденная ошибка. Мы уже знаем о ней и работаем над исправлением.
        </p>
        {error.digest && (
          <p className="text-xs text-zinc-700 mb-6 font-mono">
            Код ошибки: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="min-h-11 px-6 rounded-xl bg-white text-black font-semibold text-sm flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Попробовать снова
          </button>
          <Link
            href="/"
            className="min-h-11 px-6 rounded-xl border border-white/10 text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-colors"
          >
            <Home className="w-4 h-4" /> На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
