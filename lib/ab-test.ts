type Variant = 'A' | 'B';

interface AbTest {
  name: string;
  variants: Record<Variant, unknown>;
}

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
  }
}

export function getAbVariant(testName: string): Variant {
  if (typeof window === 'undefined') return 'A';

  const key = `ab_${testName}`;
  const stored = localStorage.getItem(key);
  if (stored === 'A' || stored === 'B') return stored;

  // 50/50 split
  const variant: Variant = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(key, variant);

  // Track assignment
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(process.env.NEXT_PUBLIC_YM_ID, 'params', {
      ab_tests: { [testName]: variant },
    });
  }

  return variant;
}

export function trackAbConversion(testName: string, event: string) {
  const variant = localStorage.getItem(`ab_${testName}`);
  if (!variant) return;

  // Track to Yandex Metrika
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(process.env.NEXT_PUBLIC_YM_ID, 'reachGoal', `${testName}_${variant}_${event}`);
  }
}
