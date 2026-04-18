import { StatSkeleton, TableRowSkeleton, ChartSkeleton } from '@/components/ui/Skeleton';

export default function DashboardLoading() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="h-8 w-64 bg-white/[0.04] rounded-xl animate-pulse" />
        <div className="h-4 w-48 bg-white/[0.04] rounded-md animate-pulse" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table */}
        <div className="xl:col-span-2 rounded-[24px] border border-white/[0.06] bg-white/[0.02]">
          <div className="p-5 border-b border-white/5">
            <div className="h-4 w-32 bg-white/[0.04] rounded-md animate-pulse" />
          </div>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRowSkeleton key={i} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
          <div className="h-4 w-36 bg-white/[0.04] rounded-md animate-pulse" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2 py-4 border-b border-white/5 last:border-0">
              <div className="h-3 w-24 bg-white/[0.04] rounded-md animate-pulse" />
              <div className="h-10 w-full bg-white/[0.04] rounded-xl animate-pulse" />
              <div className="h-8 w-full bg-white/[0.04] rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
