'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  date: string;
  views: number;
  sales: number;
}

const mockData: ChartData[] = [
  { date: '1 Апр', views: 1200, sales: 45 },
  { date: '2 Апр', views: 1350, sales: 52 },
  { date: '3 Апр', views: 980, sales: 38 },
  { date: '4 Апр', views: 1560, sales: 64 },
  { date: '5 Апр', views: 1890, sales: 78 },
  { date: '6 Апр', views: 1450, sales: 56 },
  { date: '7 Апр', views: 2100, sales: 89 },
  { date: '8 Апр', views: 1780, sales: 72 },
  { date: '9 Апр', views: 2340, sales: 95 },
  { date: '10 Апр', views: 1950, sales: 81 },
  { date: '11 Апр', views: 2560, sales: 103 },
  { date: '12 Апр', views: 2800, sales: 115 },
  { date: '13 Апр', views: 2650, sales: 108 },
  { date: '14 Апр', views: 3100, sales: 128 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value?: number }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg bg-[#0a0a0a] border border-white/10 p-3 text-xs shadow-xl">
      <p className="text-zinc-400 mb-1">{label}</p>
      <p className="text-white font-semibold">
        👁 {payload[0]?.value?.toLocaleString()} просмотров
      </p>
      <p className="text-orange-400 font-semibold">
        🛒 {payload[1]?.value?.toLocaleString()} продаж
      </p>
    </div>
  );
};

export function SalesChart() {
  return (
    <div className="rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-sm">Динамика продаж</h3>
          <p className="text-xs text-zinc-600">Последние 14 дней</p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            Просмотры
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            Продажи
          </span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(249,115,22,0.3)" />
                <stop offset="100%" stopColor="rgba(249,115,22,0)" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#3f3f46' }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="views"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={2}
              fill="url(#viewsGrad)"
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#salesGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
