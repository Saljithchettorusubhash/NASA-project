import React from 'react';
import ChartComponent from '../../charts/ChartComponent';
import { useHabitableExoPlanetData } from '../../../hooks/useHabitableData';

interface Planet {
  koi_prad?: number;
  koi_teq?: number;
  koi_kepmag?: number;
  [key: string]: any;
}

const HabitableChart: React.FC = () => {
  const { habitableExoPlanetData, loading } = useHabitableExoPlanetData(100, 0); // Removed the generic type

  const defaultData = [
    { koi_teq: 0, koi_kepmag: 0, koi_prad: 1 }, // Default fallback data
  ];

  return (
    <div className="chart-container p-4 lg:p-8 bg-gray-900 text-white min-h-screen">
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-8">
        Habitable Exoplanets
      </h2>

      <ChartComponent
        data={loading ? defaultData : habitableExoPlanetData.map((planet: Planet) => ({
          ...(planet || {}),
          koi_teq: planet.koi_teq ?? 0,       // Ensure valid fallback if data is missing
          koi_kepmag: planet.koi_kepmag ?? 0, // Ensure valid fallback if data is missing
          koi_prad: planet.koi_prad || 1,     // Fallback to size 1 if koi_prad is missing
        }))}
        xKey="koi_teq"
        yKey="koi_kepmag"
        sizeKey="koi_prad"    // Use koi_prad for bubble size
        color="#82ca9d"
        pageSize={10}         // Display 10 items per page
      />
    </div>
  );
};

export default HabitableChart;
