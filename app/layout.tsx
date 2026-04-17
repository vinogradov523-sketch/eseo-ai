import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ESEO AI — AI для селлеров Wildberries и Ozon',
  description: 'AI, который делает селлеров на WB и Ozon непобедимыми. Генерация карточек, аналитика конкурентов, автоответы.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        {/* Запрет автоматического перевода страницы браузером */}
        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Language" content="ru" />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}