import React from 'react';
import GlobeComponent from '../GlobalComponent/GlobalComponent';
import { useAsteroidFeed } from '../../../hooks/useAsteroidFeed';

interface Asteroid {
  name: string;
  id: string; 
}

interface AsteroidFeed {
  [date: string]: Asteroid[]; // Define asteroidFeed with string keys and arrays of Asteroids
}

const GlobeWrapper: React.FC = () => {
  const { asteroidFeed, loading } = useAsteroidFeed('2023-09-01', '2023-09-07');
  console.log('Asteroid Feed:', asteroidFeed);

  const fallbackData = [
    { lat: 40.7128, lon: -74.0060, caption: 'New York City' },
    { lat: 34.0522, lon: -118.2437, caption: 'Los Angeles' },
    { lat: 51.5074, lon: -0.1278, caption: 'London' },
  ];

  const generateRandomLatLon = () => {
    const lat = Math.random() * 180 - 90;
    const lon = Math.random() * 360 - 180;
    return { lat, lon };
  };

  const isAsteroidFeed = (feed: any): feed is AsteroidFeed => {
    return typeof feed === 'object' && feed !== null && Object.keys(feed).every(date => Array.isArray(feed[date]));
  };
  
  const images = !loading && isAsteroidFeed(asteroidFeed) && Object.keys(asteroidFeed).length > 0
    ? Object.keys(asteroidFeed).flatMap((date: string) =>
        asteroidFeed[date].map((asteroid: Asteroid, index: number) => {
          const { lat, lon } = generateRandomLatLon();
          return {
            lat,
            lon,
            caption: asteroid.name,
            key: asteroid.id || index, // Use asteroid.id or index as a unique key
          };
        })
      )
    : fallbackData;

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <div className="lg:w-2/3 w-full h-64 lg:h-full relative">
        <GlobeComponent images={images} />
      </div>
      <div className="lg:w-1/3 w-full h-1/2 lg:h-full flex items-center justify-center bg-gradient-to-r from-black via-gray-800 to-black">
        <h1
          style={{ lineHeight: '1.2' }}
          className="text-3xl lg:text-5xl font-bold text-white text-center p-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500 animate-pulse"
        >
          Explore Asteroids Near Earth
        </h1>
      </div>
    </div>
  );
};

export default GlobeWrapper;
