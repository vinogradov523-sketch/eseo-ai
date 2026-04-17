import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  external?: boolean;
}

const variants = {
  primary:
    'bg-white text-black hover:bg-orange-500 hover:text-white shadow-lg shadow-white/10 hover:shadow-orange-500/25',
  secondary:
    'border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20',
  ghost: 'text-zinc-400 hover:text-white hover:bg-white/5',
  gradient:
    'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-[0.98]',
};

const sizes = {
  sm: 'min-h-10 px-4 py-2 text-sm rounded-xl',
  md: 'min-h-12 px-6 py-3 text-sm rounded-2xl',
  lg: 'min-h-14 px-8 py-4 text-base rounded-2xl',
};

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  disabled,
  type = 'button',
  external,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 touch-manipulation',
    variants[variant],
    sizes[size],
    disabled && 'opacity-50 pointer-events-none',
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
