 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface NavbarProps {
  variant?: 'landing' | 'app';
}

export function Navbar({ variant = 'landing' }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-black/80 backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
            <span className="text-white font-black text-lg">E</span>
          </div>
          <div>
            <div className="font-bold tracking-tight text-lg">ESEO</div>
            <div className="hidden sm:block text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              AI for marketplaces
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        {variant === 'landing' && (
          <div className="hidden lg:flex items-center gap-8 text-sm text-zinc-400">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button href="/auth/login" variant="ghost" size="sm">
            Войти
          </Button>
          <Button href="/auth/register" variant="primary" size="sm">
            Запустить бесплатно
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 min-h-12 min-w-12 flex items-center justify-center text-white touch-manipulation"
          aria-label="Меню"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-5 py-7 text-base text-zinc-300">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 w-[92%] flex flex-col gap-3">
                <Button href="/auth/login" variant="secondary" className="w-full">
                  Войти
                </Button>
                <Button href="/auth/register" variant="gradient" className="w-full">
                  Запустить бесплатно
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
