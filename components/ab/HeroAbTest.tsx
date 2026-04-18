'use client';

import { useEffect, useState } from 'react';
import { getAbVariant, trackAbConversion } from '@/lib/ab-test';

const variants = {
  A: {
    headline: (
      <>
        Карточки, которые
        <br />
        <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          продают сами.
        </span>
      </>
    ),
    cta: 'Создать карточку бесплатно',
  },
  B: {
    headline: (
      <>
        Увеличьте продажи на WB
        <br />
        <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          с помощью AI за 3 минуты.
        </span>
      </>
    ),
    cta: 'Попробовать бесплатно →',
  },
};

export function HeroAbTest() {
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  useEffect(() => {
    setVariant(getAbVariant('hero_2026_04'));
  }, []);

  const v = variants[variant];

  return { headline: v.headline, cta: v.cta, variant };
}
