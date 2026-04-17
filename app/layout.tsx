import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://eseo-ai.ru'),
  title: {
    default: 'ESEO — AI-платформа №1 для селлеров WB и Ozon | Генерация карточек, аналитика, автоответы',
    template: '%s | ESEO — AI для маркетплейсов',
  },
  description:
    'ESEO — AI-агент для продавцов на WB и Ozon: генерация карточек за 3 минуты, аналитика конкурентов, автоответы на отзывы 24/7, SEO-оптимизация. 340+ селлеров уже используют. Начните бесплатно.',
  keywords: [
    'AI для WB',
    'AI для Ozon',
    'генератор карточек товаров',
    'генерация карточек Wildberries',
    'генерация карточек Ozon',
    'анализ конкурентов маркетплейсы',
    'автоответы на отзывы WB',
    'автоответы на отзывы Ozon',
    'SEO карточек товаров',
    'оптимизация карточек WB',
    'оптимизация карточек Ozon',
    'AI селлер',
    'ESEO',
    'маркетплейсы',
    'продажи на WB',
    'продажи на Ozon',
    'карточка товара AI',
  ],
  authors: [{ name: 'ESEO', url: 'https://eseo-ai.ru' }],
  creator: 'ESEO',
  publisher: 'ESEO',
  alternates: {
    canonical: '/',
    languages: {
      'ru-RU': '/',
    },
  },
  category: 'technology',
  openGraph: {
    title: 'ESEO — AI-платформа для селлеров WB и Ozon',
    description:
      'Генерация карточек за 3 минуты, аналитика конкурентов, автоответы на отзывы 24/7. 340+ селлеров уже используют.',
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
      'Генерация карточек, аналитика конкурентов и автоответы на отзывы за 3 минуты.',
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
  verification: {
    // google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    // yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
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
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Preconnect to key domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
