import React from 'react';
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text,
} from 'recharts';

interface BarChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  barColor?: string;
}

const CustomBarChart: React.FC<BarChartProps> = ({
  data,
  xKey,
  yKey,
  barColor = '#82ca9d',
}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsBarChart
        data={data}
        margin={{ top: 20, right: 30, bottom: 70, left: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xKey}
          tick={({ x, y, payload }) => (
            <Text
              x={x}
              y={y}
              width={100} // Set an appropriate width for text wrapping
              textAnchor="end"
              verticalAnchor="middle"
              angle={-45} // Rotate the text by -45 degrees
              fill="white"
            >
              {payload.value}
            </Text>
          )}
          interval={0} // Show all labels
        />
        <YAxis
          tick={{ fill: 'white', fontSize: 12 }}
          label={{
            value: yKey,
            angle: -90,
            position: 'insideLeft',
            offset: -10,
            fill: 'white',
          }}
        />
        <Tooltip
          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const dataPoint = payload[0].payload;
              return (
                <div className="bg-white text-black p-2 border border-gray-300 rounded">
                  <p className="font-bold">{dataPoint.planetName}</p>
                  <p>Radius: {dataPoint.radius} Rj</p>
                  <p>Orbital Period: {dataPoint.orbitalPeriod} days</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar dataKey={yKey} fill={barColor} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
