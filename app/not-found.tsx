import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl sm:text-9xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Страница не найдена</h1>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          Такой страницы не существует. Возможно, она была перемещена или удалена.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-12 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-orange-500 hover:text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
