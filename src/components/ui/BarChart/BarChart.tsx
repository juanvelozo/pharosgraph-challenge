import { memo } from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface BarChartDataItem {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartDataItem[];
  className?: string;
  barColor?: string;
  maxValue?: number;
}

const BarChart = memo(function BarChart({
  data,
  className = "",
  barColor = "hsl(var(--chart-color, 217 91% 60%))",
  maxValue,
}: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value), 100);

  return (
    <div className={`h-64 w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
        >
          <XAxis type="number" domain={[0, max]} hide />
          <YAxis
            type="category"
            dataKey="label"
            width={100}
            style={{ marginRight: 20 }}
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ payload, label }) => {
              return (
                <div className="bg-white rounded-2xl p-4 shadow-md">
                  <p className="text-sm font-medium">{`${label} : ${payload?.[0]?.value}%`}</p>
                </div>
              );
            }}
            contentStyle={{
              borderRadius: 20,
              border: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              padding: '16px',
            }}
            itemStyle={{
              borderRadius: 20,
              border: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              padding: '16px',
            }}
            cursor={false}
          />
          <Bar
            dataKey="value"
            background={{ fill: 'rgba(0,0,0,0.06)', radius: 20 }}
            fill={barColor}
            radius={[20, 20, 20, 20]}
            maxBarSize={20}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default BarChart;
