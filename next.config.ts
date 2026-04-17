import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Включаем оптимизацию изображений
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.wildberries.ru' },
      { protocol: 'https', hostname: '**.ozon.ru' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Заголовки безопасности
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },

  // Редиректы
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
