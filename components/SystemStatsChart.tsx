
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface SystemStatsChartProps {
  data: number[];
  strokeColor: string;
  fillColor: string;
  title: string;
  unit: string;
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-black/70 border border-cyan-500/50 rounded-md text-sm">
                <p className="label text-cyan-300">{`${payload[0].value.toFixed(1)} ${unit}`}</p>
            </div>
        );
    }
    return null;
};

const SystemStatsChart: React.FC<SystemStatsChartProps> = ({ data, strokeColor, fillColor, title, unit }) => {
  const chartData = data.map((value, index) => ({ name: index, value }));
  const currentValue = data[data.length - 1];

  return (
    <div className="w-full h-full p-2 flex flex-col">
        <div className="flex justify-between items-baseline px-2">
            <h3 className="text-sm font-bold text-cyan-200">{title}</h3>
            <p className="font-orbitron text-lg text-white">{currentValue.toFixed(1)}{unit}</p>
        </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={fillColor} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={fillColor} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Tooltip content={<CustomTooltip unit={unit} />} />
          <YAxis hide={true} domain={[0, 100]} />
          <XAxis hide={true} />
          <Area type="monotone" dataKey="value" stroke={strokeColor} fill={`url(#color-${title})`} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SystemStatsChart;
