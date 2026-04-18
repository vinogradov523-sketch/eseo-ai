'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-8 max-w-xl mx-auto text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-7 h-7 text-red-400" />
      </div>
      <h2 className="text-xl font-bold mb-2">Ошибка загрузки</h2>
      <p className="text-sm text-zinc-400 mb-6">{error.message || 'Не удалось загрузить данные'}</p>
      <button
        onClick={reset}
        className="min-h-11 px-6 rounded-xl bg-white text-black font-semibold text-sm inline-flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all"
      >
        <RefreshCw className="w-4 h-4" /> Обновить
      </button>
    </div>
  );
}
