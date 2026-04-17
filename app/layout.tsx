import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://eseo-ai.ru'),
  title: {
    default: 'ESEO — AI для селлеров WB и Ozon',
    template: '%s | ESEO',
  },
  description:
    'ESEO — премиальная AI-платформа для продавцов на WB и Ozon: генерация карточек, анализ конкурентов, автоответы на отзывы и рост продаж без ручной рутины.',
  keywords: [
    'AI для WB',
    'AI для Ozon',
    'генератор карточек товаров',
    'анализ конкурентов',
    'автоответы на отзывы',
    'SEO карточек товаров',
    'маркетплейсы',
  ],
  authors: [{ name: 'ESEO' }],
  creator: 'ESEO',
  publisher: 'ESEO',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ESEO — AI для селлеров WB и Ozon',
    description:
      'Премиальная AI-платформа для генерации карточек, аналитики конкурентов и автоответов на отзывы.',
    url: '/',
    siteName: 'ESEO',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'ESEO — AI платформа для WB и Ozon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ESEO — AI для селлеров WB и Ozon',
    description:
      'Генерация карточек, аналитика конкурентов и автоответы на отзывы.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}