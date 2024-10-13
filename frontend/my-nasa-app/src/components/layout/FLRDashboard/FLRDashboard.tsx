import React, { useState, useEffect } from 'react';
import { addDays, subDays, format } from 'date-fns';
import useDonkiData from '../../../hooks/DONKI/useDonki';
import { GanttChart } from '../../charts/GanttChart';
import HeatMap from '../../charts/HeatMap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDebouncedEffect } from '../../../hooks/useDebounceEffect';
import CollapsiblePanel from '../CollapsiblePanel';

const FLRDashboard: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 7));
  const [debouncedStartDate, setDebouncedStartDate] = useState<Date>(startDate);
  const [cachedData, setCachedData] = useState<any[]>([]);

  const endDate = format(addDays(debouncedStartDate, 7), 'yyyy-MM-dd');
  const formattedStartDate = format(debouncedStartDate, 'yyyy-MM-dd');

  // Fetch cached data if it exists and matches the date range
  useEffect(() => {
    const storedData = localStorage.getItem('flrData');
    const storedStartDate = localStorage.getItem('flrStartDate');
    const storedEndDate = localStorage.getItem('flrEndDate');

    if (
      storedData &&
      storedStartDate === formattedStartDate &&
      storedEndDate === endDate
    ) {
      setCachedData(JSON.parse(storedData));
    }
  }, [formattedStartDate, endDate]);

  // Debounce effect to delay fetching data until the date has stabilized
  useDebouncedEffect(() => {
    setDebouncedStartDate(startDate);
  }, [startDate], 1000);

  const { data = [], loading, error } = useDonkiData(formattedStartDate, endDate, 'flrData');

  // Store the fetched data in localStorage for future use
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('flrData', JSON.stringify(data));
      localStorage.setItem('flrStartDate', formattedStartDate);
      localStorage.setItem('flrEndDate', endDate);
      setCachedData(data);
    }
  }, [data, formattedStartDate, endDate]);

  // Dummy data for fallback
  const dummyData = [
    {
      flrID: 'FLR-001',
      beginTime: '2024-10-06T00:00Z',
      peakTime: '2024-10-06T02:00Z',
      endTime: '2024-10-06T03:00Z',
      classType: 'M1.0',
      instruments: [{ displayName: 'Instrument A' }],
      sourceLocation: 'AR2673',
      linkedEvents: [],
    },
  ];

  // Data for charts and panels
  const flrEvents = (cachedData.length > 0 ? cachedData : data.length > 0 ? data : dummyData).map(
    (flare: any) => ({
      flrID: flare.flrID,
      beginTime: flare.beginTime,
      peakTime: flare.peakTime,
      endTime: flare.endTime,
    })
  );

  const flrHeatMapData = (cachedData.length > 0 ? cachedData : data.length > 0 ? data : dummyData).map(
    (flare: any) => ({
      time: flare.beginTime,
      classType: flare.classType,
      intensity: parseFloat(flare.classType.replace(/[^\d.]/g, '')),
    })
  );

  const flrDetails = (cachedData.length > 0 ? cachedData : data.length > 0 ? data : dummyData).map(
    (flare: any) => ({
      flrID: flare.flrID,
      instruments: flare.instruments.map((instr: any) => instr.displayName),
      sourceLocation: flare.sourceLocation,
      linkedEvents: flare.linkedEvents ? flare.linkedEvents.map((event: any) => event.activityID) : [],
    })
  );

  // Handle date change and reset cached data
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      // Clear cache when date changes
      localStorage.removeItem('flrData');
      localStorage.removeItem('flrStartDate');
      localStorage.removeItem('flrEndDate');
      setCachedData([]); // Clear cached data to trigger refetch
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl text-center mb-8 font-semibold text-indigo-400">Solar Flares (FLR)</h1>

      <div className="text-center mb-8">
        <p className="text-xl font-semibold">Date Range: {formattedStartDate} to {endDate}</p>
        <div className="flex justify-center items-center flex-col mt-4">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            maxDate={new Date()}
            dateFormat="yyyy-MM-dd"
            className="p-3 rounded-lg shadow-lg border-2 border-blue-300 focus:ring-2 focus:ring-indigo-500 text-center text-lg bg-gray-800 text-white"
          />
        </div>
      </div>

      {error && <div className="text-red-600">Error: {error}</div>}
      {loading && cachedData.length === 0 && <div className="text-blue-600">Loading...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {flrEvents.length > 0 && (
          <div className="w-full">
            <GanttChart flareEvents={flrEvents} />
          </div>
        )}

        {flrHeatMapData.length > 0 && (
          <div className="w-full">
            <HeatMap flareData={flrHeatMapData} />
          </div>
        )}
      </div>

      {flrDetails.length > 0 && (
        <div className="mb-8">
          <CollapsiblePanel flareDetails={flrDetails} />
        </div>
      )}
    </div>
  );
};

export default FLRDashboard;
