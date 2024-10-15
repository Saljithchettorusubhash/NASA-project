import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, differenceInDays } from 'date-fns';
import CelestialPositionPanel from '../CelestialPositionPanel/CelestialPositionPanel';
import { useAsteroidFeed } from '../../../hooks/useAsteroidFeed';

// Define types for asteroid data
interface Asteroid {
  id: string;
  name: string;
  close_approach_data: {
    miss_distance: { kilometers: string };
    relative_velocity: { kilometers_per_hour: string };
  }[];
  estimated_diameter: { meters: { estimated_diameter_max: number } };
}

const GlobeDetailsWrapper: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date('2023-09-01'));
  const [endDate, setEndDate] = useState<Date | null>(new Date('2023-09-07'));
  const [isDateValid, setIsDateValid] = useState<boolean>(true);
  const [fetchData, setFetchData] = useState<boolean>(false);

  // Automatically fetch data on first render for a default date range
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  // Fetch asteroid data using the hook
  const { asteroidFeed, loading } = useAsteroidFeed(
    startDate?.toISOString().slice(0, 10) || '2023-09-01',
    endDate?.toISOString().slice(0, 10) || '2023-09-07'
  );

  // Extract relevant asteroid data
  const getAsteroidData = (asteroid: Asteroid) => {
    const closeApproachData = asteroid?.close_approach_data[0] || {};
    return {
      identifier: asteroid.name || 'Unknown Asteroid',
      missDistance: closeApproachData.miss_distance?.kilometers || 'N/A',
      velocity: closeApproachData.relative_velocity?.kilometers_per_hour || 'N/A',
      diameter: asteroid.estimated_diameter?.meters.estimated_diameter_max?.toString() || 'N/A',
    };
  };

  // Handle start and end date changes
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date && (!endDate || endDate < date)) {
      setEndDate(addDays(date, 7));
    }
    setIsDateValid(true); // Reset error on start date change
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date && startDate && date > startDate ? date : addDays(startDate!, 7));
    setIsDateValid(true); // Reset error on end date change
  };

  const handleFetchData = () => {
    // Validate the 7-day rule
    if (startDate && endDate && differenceInDays(endDate, startDate) > 7) {
      setIsDateValid(false);
      setFetchData(false);
    } else {
      setIsDateValid(true);
      setFetchData(true); // Trigger data fetch
    }
  };

  // Trigger automatic fetch on first render
  useEffect(() => {
    if (initialLoad) {
      setFetchData(true); // Auto-fetch on first render
      setInitialLoad(false);
    }
  }, [initialLoad]);

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row text-white">
      {/* Date Picker Filter */}
      <div className="w-full lg:w-1/3 flex flex-col items-center justify-center p-4 bg-gradient-to-r from-gray-800 to-black">
        <h1 className="text-3xl lg:text-5xl font-bold text-white text-center">
          NASA Asteroid Data
        </h1>
        <label className="text-lg text-white mt-4">Select Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          maxDate={new Date()}
          className="text-black rounded-md p-2 mt-2"
          dateFormat="yyyy-MM-dd"
        />
        <label className="text-lg text-white mt-4">Select End Date (Max 7 Days):</label>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          minDate={startDate || undefined}
          maxDate={startDate ? addDays(startDate, 7) : undefined}
          className="text-black rounded-md p-2 mt-2"
          dateFormat="yyyy-MM-dd"
        />
        
        {/* Button to Fetch Data */}
        <button
          onClick={handleFetchData}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
        >
          Fetch Data
        </button>

        {/* Error Message if Date Validation Fails */}
        {!isDateValid && (
          <p className="text-red-500 mt-4">Error: The date range must be within 7 days.</p>
        )}
      </div>

      {/* Asteroid Data Panels or Loading Spinner */}
      <div className="w-full lg:w-2/3 overflow-y-auto p-8 bg-black flex flex-wrap justify-center items-center">
        {fetchData && loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            {/* Inline style for loading spinner */}
            <div
              style={{
                borderTopColor: '#3498db',
                borderRadius: '50%',
                width: '64px',
                height: '64px',
                border: '8px solid rgba(0, 0, 0, 0.1)',
                borderTop: '8px solid #3498db',
                animation: 'spin 1.5s linear infinite',
              }}
            />
            <p className="text-lg text-gray-400 mt-4">Loading asteroid data...</p>
          </div>
        ) : fetchData && !isDateValid ? (
          <div className="text-red-400">Error: Please ensure the date range is within 7 days.</div>
        ) : fetchData && (!asteroidFeed || Object.keys(asteroidFeed).length === 0) ? (
          <div className="text-lg text-gray-400">No asteroid data available for the selected date range.</div>
        ) : (
          fetchData && Object.keys(asteroidFeed).map((date) =>
            asteroidFeed[date].map((asteroid) => {
              const data = getAsteroidData(asteroid);
              return (
                <div className="w-full lg:w-96" key={asteroid.id}>
                  <CelestialPositionPanel
                    identifier={data.identifier}
                    centroidCoordinates={{ lat: 0, lon: 0 }}
                    dscovrPosition={{ x: 0, y: 0, z: 0 }}
                    lunarPosition={{ x: 0, y: 0, z: 0 }}
                    sunPosition={{ x: 0, y: 0, z: 0 }}
                    additionalInfo={{
                      missDistance: data.missDistance,
                      velocity: data.velocity,
                      diameter: data.diameter,
                    }}
                  />
                </div>
              );
            })
          )
        )}
      </div>

      {/* Add spinner keyframes animation in a <style> tag */}
      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default GlobeDetailsWrapper;
