import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, ArrowLeft } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Блог — статьи про WB, Ozon и AI для маркетплейсов',
  description:
    'Гайды, кейсы и исследования: как AI помогает продавать больше на Wildberries и Ozon. SEO-оптимизация карточек, аналитика конкурентов, автоответы.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </Link>
          <div>
            <h1 className="font-bold text-lg">Блог ESEO</h1>
            <p className="text-xs text-zinc-500">Гайды, кейсы и исследования</p>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="max-w-3xl mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4 font-semibold">
            Блог
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Знания, которые приносят деньги.
          </h2>
          <p className="text-lg text-zinc-400">
            Практические гайды и реальные кейсы от команды ESEO. Без воды — только то, что работает.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[28px] border border-white/[0.06] bg-white/[0.02] p-6 hover:border-orange-500/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Category + Read time */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-600">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-3 group-hover:text-orange-400 transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed mb-4">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-600">
                  {new Date(post.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
