import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  Legend
} from 'recharts';

interface ChartProps {
  data: any[];
  xKey?: string;
  yKey?: string;
  sizeKey?: string;
  color?: string;
  pageSize?: number;
}

const ChartComponent: React.FC<ChartProps> = ({
  data,
  xKey = 'koi_teq',
  yKey = 'koi_kepmag',
  sizeKey = 'koi_prad',
  color = '#82ca9d',
  pageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const start = currentPage * pageSize;
  const paginatedData = data.slice(start, start + pageSize);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const scaleFactor = 50;

  // Adjusting the data to include calculated sizes
  const formattedData = paginatedData.map((entry) => ({
    ...entry,
    z: (entry[sizeKey] || 1) * scaleFactor, // Calculate size using z instead of size
  }));

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <ScatterChart margin={{ top: 20, right: 40, bottom: 60, left: 80 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            name={xKey}
            label={{
              value: xKey,
              position: 'insideBottom',
              offset: -10,
              dy: 20,
              style: { textAnchor: 'middle', fill: 'white' }, // White text
            }}
            tick={{ fontSize: 12, fill: 'white' }} // White ticks
          />
          <YAxis
            dataKey={yKey}
            name={yKey}
            label={{
              value: yKey,
              angle: -90,
              position: 'insideLeft',
              dx: -30,
              style: { textAnchor: 'middle', fill: 'white' }, // White text
            }}
            tick={{ fontSize: 12, fill: 'white' }} // White ticks
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const dataPoint = payload[0].payload;
                return (
                  <div className="bg-white p-2 border border-gray-200">
                    <p className="font-bold text-black">Planet Details</p>
                    <p className="text-black">Temperature: {dataPoint[xKey]}</p>
                    <p className="text-black">Magnitude: {dataPoint[yKey]}</p>
                    <p className="text-black">Radius: {dataPoint[sizeKey]}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Brush dataKey={xKey} height={30} stroke="#8884d8" />
          <Scatter
            name="Habitable Planets"
            data={formattedData} // Use pre-formatted data with z for size
            fill={color}
            shape="circle"
            isAnimationActive={true}
            animationBegin={0}
            animationDuration={2000}
            animationEasing="ease-in-out"
            zAxisId={0} // Control bubble size using z-axis
          />
        </ScatterChart>
      </ResponsiveContainer>

      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handleNext}
          disabled={start + pageSize >= data.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChartComponent;
