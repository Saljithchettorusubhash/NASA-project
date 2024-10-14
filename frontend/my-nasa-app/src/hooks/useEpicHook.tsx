import { useState, useEffect } from 'react';
import { fetchEpicAvailableDates, fetchEpicImagesByDate, fetchLatestEpicImages } from '../api/nasaAPI';

interface EpicImage {
  latitude: number;
  longitude: number;
  identifier: string;
  caption: string;
  image: string;
  date: string;
}

export const useEpicImages = (date?: string, page: number = 1, limit: number = 10) => {
    const [epicImages, setEpicImages] = useState<EpicImage[]>([]);
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          if (date) {
            const images = await fetchEpicImagesByDate(date, page, limit);
            setEpicImages(images);
          } else {
            const latestImages = await fetchLatestEpicImages(page, limit);
            setEpicImages(latestImages);
          }
  
          const dates = await fetchEpicAvailableDates();
          setAvailableDates(dates);
          setError(null);
        } catch (err) {
          setError('Failed to fetch EPIC images');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [date, page, limit]);
  
    return { epicImages, availableDates, loading, error };
  };