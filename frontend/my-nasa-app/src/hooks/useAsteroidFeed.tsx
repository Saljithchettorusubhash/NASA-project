import { useState, useEffect } from 'react';
import { fetchAsteroidFeed } from '../api/nasaAPI'; // Ensure this is the correct path

export const useAsteroidFeed = (startDate: string, endDate: string) => {
  const [asteroidFeed, setAsteroidFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAsteroidFeed = async () => {
      setLoading(true);
      try {
        const data = await fetchAsteroidFeed(startDate, endDate);
        setAsteroidFeed(data.near_earth_objects);  // Assuming near_earth_objects is the structure from API response
        setError(null);
      } catch (err) {
        setError('Failed to fetch asteroid data');
        setAsteroidFeed([]);
      } finally {
        setLoading(false);
      }
    };

    getAsteroidFeed();
  }, [startDate, endDate]);

  return { asteroidFeed, loading, error };
};
