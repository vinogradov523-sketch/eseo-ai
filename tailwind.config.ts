import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    //'./src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        fog: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)', opacity: '0.7' },
          '50%': { transform: 'translate3d(2%, -2%, 0) scale(1.06)', opacity: '1' },
          '100%': { transform: 'translate3d(-2%, 2%, 0) scale(1)', opacity: '0.75' },
        },
      },
      animation: {
        fog: 'fog 80s linear infinite',
      },
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      boxShadow: {
        glow: '0 0 60px rgba(249, 115, 22, 0.18)',
      },
    },
  },
  plugins: [],
};

export default config;