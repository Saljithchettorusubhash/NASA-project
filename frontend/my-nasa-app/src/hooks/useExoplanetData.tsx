import { useEffect, useState } from 'react';
import { exoPlanetConfirmed } from '../api/nasaAPI';
import { fetchRetry } from '../utils/fetchRetry';

export const useExoplanetData = (limit: number, offset: number) => {
  const [exoPlanetData, setExoPlanetData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Fetching Exoplanet data with limit:', limit, 'and offset:', offset);

    const fetchExoPlanetData = async () => {
      setLoading(true);
      try {
        const response = await fetchRetry(() => exoPlanetConfirmed(limit, offset), 3, 1000);
        console.log('Exoplanet Data Response:', response);
        
        if (response && Array.isArray(response)) {
          setExoPlanetData(response); // Update state with the exoplanet data
        } else {
          console.error('API response format is incorrect:', response);
          throw new Error('Unexpected API response format');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch exoplanet data');
      } finally {
        setLoading(false);
      }
    };

    fetchExoPlanetData();
  }, [limit, offset]);

  return { exoPlanetData, loading, error };
};
