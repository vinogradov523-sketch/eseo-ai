import { ButtonHTMLAttributes, forwardRef, AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'primary' | 'secondary' | 'gradient';
  size?: string;
  href?: string;
  asChild?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size, href, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors',
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
