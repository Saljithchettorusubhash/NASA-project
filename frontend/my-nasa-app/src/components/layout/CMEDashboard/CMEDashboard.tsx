import React, { useState } from 'react';
import { addDays, subDays, format } from 'date-fns';
import useDonkiData from '../../../hooks/DONKI/useDonki';
import CmeCard from '../../common/Card/CmeCard';
import SolarDisk from '../solarDisk/solarDisk';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDebouncedEffect } from '../../../hooks/useDebounceEffect';

// Consistent type for CMEData with speed possibly undefined
interface CMEData {
  activityID: string;
  sourceLocation: string;
  speed?: number; // speed can be undefined
  latitude: number | null;
  longitude: number | null;
  note?: string;
}

const CMEDashboard: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 7));
  const [debouncedStartDate, setDebouncedStartDate] = useState<Date>(startDate);

  const endDate = format(addDays(debouncedStartDate, 7), 'yyyy-MM-dd');
  const formattedStartDate = format(debouncedStartDate, 'yyyy-MM-dd');

  useDebouncedEffect(() => {
    setDebouncedStartDate(startDate);
  }, [startDate], 1000);

  // Remove the generic argument here
  const { data = [], loading, error } = useDonkiData(formattedStartDate, endDate, 'cmeData');

  // Fallback data for when no data is available
  const fallbackData: CMEData[] = [
    {
      activityID: 'CME-1234',
      sourceLocation: 'N15W10',
      speed: 1200,
      latitude: 15,
      longitude: -10,
      note: 'Sample CME event data',
    },
  ];

  // Process data and map it correctly
  const cmeData: CMEData[] = Array.isArray(data) && data.length > 0
    ? data.map((cme) => ({
        activityID: cme.activityID,
        sourceLocation: cme.sourceLocation,
        speed: cme.speed ?? 'N/A', // Handle undefined speed
        latitude: cme.latitude ?? null,  // Ensure consistency with `null`
        longitude: cme.longitude ?? null, // Ensure consistency with `null`
        note: cme.note || '',
      }))
    : fallbackData;

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  return (
    <div className="p-4 lg:p-8 text-white min-h-screen bg-gray-900">
      <h1 className="text-4xl text-center mb-8 font-semibold text-indigo-400">Coronal Mass Ejections (CMEs)</h1>

      <div className="text-center mb-8">
        <p className="text-xl font-semibold">
          Date Range: {formattedStartDate} to {endDate}
        </p>
        <div className="flex justify-center items-center flex-col mt-4">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            className="p-3 rounded-lg shadow-lg border-2 border-blue-300 focus:ring-2 focus:ring-indigo-500 text-center text-lg bg-gray-800 text-white"
          />
          <p className="mt-2 text-sm">Select a start date (end date will be 7 days after start)</p>
        </div>
      </div>

      {loading && <div className="text-blue-600 text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">Error: {error}</div>}

      {/* Pass the consistent cmeData to SolarDisk */}
      <SolarDisk cmeData={cmeData} />

      {/* Pass the same cmeData to CmeCard */}
      {!loading && !error && <CmeCard cmeData={cmeData} />}
    </div>
  );
};

export default CMEDashboard;
