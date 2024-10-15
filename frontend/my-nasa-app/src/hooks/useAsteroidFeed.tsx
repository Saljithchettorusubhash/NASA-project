import { useState, useEffect } from 'react';
import { fetchAsteroidFeed } from '../api/nasaAPI'; // Ensure this is the correct path

interface Asteroid {
    id: string;
    name: string;
    close_approach_data: {
      miss_distance: { kilometers: string };
      relative_velocity: { kilometers_per_hour: string };
    }[];
    estimated_diameter: { meters: { estimated_diameter_max: number } };
  }
  
  interface AsteroidFeed {
    [date: string]: Asteroid[];
  }
  
  export const useAsteroidFeed = (startDate: string, endDate: string) => {
    const [asteroidFeed, setAsteroidFeed] = useState<AsteroidFeed>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const getAsteroidFeed = async () => {
        setLoading(true);
        try {
          const data = await fetchAsteroidFeed(startDate, endDate);
          setAsteroidFeed(data.near_earth_objects || {});
          setError(null);
        } catch (err) {
          setError('Failed to fetch asteroid data');
          setAsteroidFeed({});
        } finally {
          setLoading(false);
        }
      };
  
      getAsteroidFeed();
    }, [startDate, endDate]);
  
    return { asteroidFeed, loading, error };
  };
  