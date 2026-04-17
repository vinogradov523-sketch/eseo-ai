import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://eseo-ai.ru', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://eseo-ai.ru/pricing', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://eseo-ai.ru/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://eseo-ai.ru/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: 'https://eseo-ai.ru/contacts', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
}
