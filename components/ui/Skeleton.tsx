import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'card' | 'rect';
}

export function Skeleton({ className, variant = 'rect' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-white/[0.04] rounded-xl',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-4 rounded-md',
        variant === 'card' && 'rounded-[24px]',
        className
      )}
    />
  );
}

/* Pre-built skeleton layouts */

export function CardSkeleton() {
  return (
    <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-16 h-5" variant="text" />
      </div>
      <Skeleton className="w-3/4 h-5" variant="text" />
      <Skeleton className="w-full h-4" variant="text" />
      <Skeleton className="w-2/3 h-4" variant="text" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <Skeleton className="w-9 h-9 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="w-48 h-4" variant="text" />
        <Skeleton className="w-24 h-3" variant="text" />
      </div>
      <Skeleton className="w-16 h-6 rounded-lg" />
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="w-9 h-9 rounded-xl" />
        <Skeleton className="w-12 h-4" variant="text" />
      </div>
      <Skeleton className="w-20 h-8" variant="text" />
      <Skeleton className="w-24 h-3" variant="text" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="w-32 h-4" variant="text" />
          <Skeleton className="w-20 h-3" variant="text" />
        </div>
        <Skeleton className="w-24 h-4" variant="text" />
      </div>
      <Skeleton className="w-full h-64 rounded-xl" />
    </div>
  );
}
