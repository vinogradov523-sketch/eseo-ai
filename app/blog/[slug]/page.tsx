 
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, ArrowRight, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/constants';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/blog" className="p-2 rounded-xl hover:bg-white/5 transition-colors flex items-center gap-2 text-sm text-zinc-400">
            <ArrowLeft className="w-4 h-4" />
            Блог
          </Link>
          <button className="p-2 rounded-xl hover:bg-white/5 transition-colors">
            <Share2 className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-6 text-xs text-zinc-500">
          <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] mb-6">
          {post.title}
        </h1>

        <p className="text-lg text-zinc-400 leading-relaxed mb-10">{post.excerpt}</p>

        <div className="h-px bg-white/5 mb-10" />

        {/* Content placeholder */}
        <div className="prose prose-invert prose-zinc max-w-none space-y-6 text-zinc-300 leading-relaxed">
          <p>
            Статья находится в разработке. Здесь будет полный текст с изображениями, примерами кода,
            скриншотами и практическими рекомендациями.
          </p>

          <h2 className="text-2xl font-bold text-white mt-10 mb-4">Основные тезисы</h2>

          <ul className="space-y-3 list-none pl-0">
            <li className="flex items-start gap-3">
              <span className="text-orange-400 shrink-0">→</span>
              <span>AI-генерация карточек экономит до 90% времени по сравнению с ручным написанием</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-400 shrink-0">→</span>
              <span>Правильная структура карточки увеличивает CTR на 25-40%</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-400 shrink-0">→</span>
              <span>SEO-оптимизация ключевых слов — главный фактор ранжирования на WB и Ozon</span>
            </li>
          </ul>

          <div className="mt-10 rounded-2xl bg-orange-500/5 border border-orange-500/20 p-6">
            <p className="text-sm text-orange-300 font-medium mb-2">💡 Совет от ESEO</p>
            <p className="text-sm text-zinc-400">
              Попробуйте сгенерировать карточку вашего товара прямо сейчас — это бесплатно и занимает 3 минуты.
            </p>
            <Link
              href="/generator"
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-orange-400 hover:text-orange-300"
            >
              Попробовать генератор <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center py-12 rounded-[28px] border border-white/[0.06] bg-white/[0.02]">
          <h3 className="text-2xl font-bold mb-3">Попробуйте ESEO бесплатно</h3>
          <p className="text-zinc-400 text-sm mb-6">5 карточек бесплатно · Без привязки карты</p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 min-h-12 px-8 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all"
          >
            Начать бесплатно <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-6">Читайте также</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-orange-500/20 transition-all"
                >
                  <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">{p.category}</span>
                  <h4 className="text-sm font-semibold mt-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                    {p.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
