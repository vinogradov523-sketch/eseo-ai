import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { ruRU } from '@clerk/localizations';
import { Analytics } from '@/components/shared/Analytics';
import { CookieConsent } from '@/components/shared/CookieConsent';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://eseo-ai.ru'),
  title: {
    default: 'ESEO — AI-платформа №1 для селлеров WB и Ozon',
    template: '%s | ESEO',
  },
  description:
    'AI-агент для продавцов: генерация карточек за 3 минуты, аналитика конкурентов, автоответы 24/7. 340+ селлеров.',
  // ... остальные метаданные из части 1
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
    <ClerkProvider
      localization={ruRU}
      appearance={{
        variables: {
          colorPrimary: '#f97316',
          colorBackground: '#0a0a0a',
          colorInputBackground: 'rgba(255,255,255,0.05)',
          colorInputText: '#ffffff',
          colorText: '#ffffff',
          colorTextSecondary: '#71717a',
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary:
            'bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]',
          card: 'bg-[#0a0a0a] border border-white/10',
          headerTitle: 'text-white',
          headerSubtitle: 'text-zinc-500',
          socialButtonsBlockButton:
            'bg-white/5 border border-white/10 text-white hover:bg-white/10',
          formFieldLabel: 'text-zinc-500',
          formFieldInput:
            'bg-white/5 border-white/10 text-white placeholder:text-zinc-600',
          footerActionLink: 'text-orange-400 hover:text-orange-300',
        },
      }}
    >
      <html lang="ru" suppressHydrationWarning>
        <body className="antialiased">
          {children}
          <CookieConsent />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
