import React from 'react';
import GlobeComponent from '../GlobalComponent/GlobalComponent';
import { useEpicImages } from '../../../hooks/useEpicHook';

const GlobeWrapper: React.FC = () => {
  const { epicImages, loading } = useEpicImages();

  const fallbackData = [
    { lat: 40.7128, lon: -74.0060, caption: 'New York City' },
    { lat: 34.0522, lon: -118.2437, caption: 'Los Angeles' },
    { lat: 51.5074, lon: -0.1278, caption: 'London' },
  ];

  const images = !loading && epicImages.length > 0 ? epicImages.map((image: any) => ({
    lat: image.centroid_coordinates.lat,
    lon: image.centroid_coordinates.lon,
    caption: image.caption,
  })) : fallbackData;

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Globe Component Section */}
      <div className="lg:w-2/3 w-full h-1/2 lg:h-full relative">
        <GlobeComponent images={images} />
      </div>

      {/* Heading Section */}
      <div className="lg:w-1/3 w-full h-1/2 lg:h-full flex items-center justify-center bg-gradient-to-r from-black via-gray-800 to-black">
        <h1  style={{ lineHeight: '1.2' }} className="text-3xl lg:text-5xl font-bold text-white text-center p-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 animate-pulse">
          Explore NASA EPIC Images
        </h1>
      </div>
    </div>
  );
};

export default GlobeWrapper;
