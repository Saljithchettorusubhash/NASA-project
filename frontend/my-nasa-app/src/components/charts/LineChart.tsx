import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

interface LineChartProps {
  kpIndexData: { time: string, kpIndex: number }[];
}

const GSTLineChart: React.FC<LineChartProps> = ({ kpIndexData }) => {
  return (
    <div className="line-chart-container w-full">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={kpIndexData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="time" stroke="white">
            <Label value="Time" offset={-5} position="insideBottom" fill="white" />
          </XAxis>
          <YAxis stroke="white">
            <Label value="KP Index" angle={-90} position="insideLeft" fill="white" />
          </YAxis>
          <Tooltip contentStyle={{ backgroundColor: '#333', color: '#fff' }} />
          <Line type="monotone" dataKey="kpIndex" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-center mt-4 text-white">KP Index Over Time</p>
    </div>
  );
};

export default GSTLineChart;
