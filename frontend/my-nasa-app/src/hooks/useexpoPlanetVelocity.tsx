import  { useEffect, useState } from 'react';
import { exoPlanetTransitOrVelocity } from '../api/nasaAPI';

export const useExoPlanetTransitOrVelocity = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await exoPlanetTransitOrVelocity();
        setData(response);
        console.log('Exo Planet Transit or Velocity Response:..................', response);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch exoplanet data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
