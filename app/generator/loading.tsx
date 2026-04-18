import { Skeleton } from '@/components/ui/Skeleton';

export default function GeneratorLoading() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="border-b border-white/5 p-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-1.5">
            <Skeleton className="w-40 h-5" variant="text" />
            <Skeleton className="w-56 h-3" variant="text" />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-[500px]" variant="card" />
          <Skeleton className="h-[500px]" variant="card" />
        </div>
      </div>
    </div>
  );
}
