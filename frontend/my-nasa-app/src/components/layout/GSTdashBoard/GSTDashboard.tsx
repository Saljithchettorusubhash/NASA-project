import React, { useState } from 'react';
import { addDays, format } from 'date-fns';
import useDonkiData from '../../../hooks/DONKI/useDonki';
import GuageChart from '../../charts/GuageChart';
import GSTLineChart from '../../charts/LineChart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// TypeScript interfaces for data structure
interface KPIndex {
  observedTime: string;
  kpIndex: number;
}

interface GSTEvent {
  allKpIndex: KPIndex[];
}

interface DonkiGSTResponse {
  gstData?: GSTEvent[]; // Ensure gstData is optional to handle different data types
}

const GSTDashboard: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date('2023-01-01'));

  // Calculate the end date (60 days after the start date)
  const endDate = addDays(startDate, 60);
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(endDate, 'yyyy-MM-dd');

  // Fetch DONKI data, typed as DonkiGSTResponse
  const { data = {} as DonkiGSTResponse, loading, error } = useDonkiData(formattedStartDate, formattedEndDate, 'gstData');

  // Dummy data for fallback
  const dummyData = [
    { time: '2023-01-01T00:00Z', kpIndex: 5 },
    { time: '2023-01-02T00:00Z', kpIndex: 4.5 },
    { time: '2023-01-03T00:00Z', kpIndex: 6.2 },
    { time: '2023-01-04T00:00Z', kpIndex: 7.1 },
  ];

  // Process GST data or use dummy data if unavailable
  const gstData = (data as DonkiGSTResponse)?.gstData?.flatMap((gst: GSTEvent) =>
    gst.allKpIndex.map((kp: KPIndex) => ({
      time: kp.observedTime,
      kpIndex: kp.kpIndex,
    }))
  ) || dummyData;

  const highestKpIndex = Math.max(...gstData.map((gst) => gst.kpIndex), 0);

  // Date change handler
  const handleDateChange = (date: Date | null) => {
    if (date) setStartDate(date);
  };

  return (
    <div className="p-6 lg:p-12 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl lg:text-5xl text-center mb-8 font-semibold text-indigo-500">Geomagnetic Storms (GST)</h1>

      {/* Date Range Display and DatePicker */}
      <div className="text-center mb-8">
        <p className="text-lg lg:text-xl font-semibold text-gray-300">
          Date Range: {formattedStartDate} to {formattedEndDate}
        </p>

        <div className="flex justify-center items-center flex-col mt-4">
          <div className="mb-6 z-10">
            <p className="text-gray-300 mb-2">Select Start Date</p>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              maxDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="p-3 rounded-lg shadow-lg border-2 border-blue-300 focus:ring-2 focus:ring-indigo-500 text-center text-lg bg-gray-800 text-white"
            />
          </div>
        </div>
      </div>

      {/* Error and Loading States */}
      {error && <div className="text-red-500 text-center">Error: {error}</div>}
      {loading && <div className="text-blue-400 text-center">Loading...</div>}

      {/* Flexbox Layout to Separate the Charts */}
      <div className="flex flex-col lg:flex-row items-center justify-around lg:space-x-8 space-y-8 lg:space-y-0 mt-8">
        {/* Gauge Chart */}
        <div className="w-full lg:w-1/2 flex justify-center"> {/* Ensure centering and dynamic width */}
          <GuageChart kpIndex={highestKpIndex} />
        </div>

        {/* Line Chart */}
        <div className="w-full lg:w-1/2">
          <GSTLineChart kpIndexData={gstData} />
        </div>
      </div>
    </div>
  );
};

export default GSTDashboard;
