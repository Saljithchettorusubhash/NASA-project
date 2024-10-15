import { useState, useEffect } from "react";
import { fetchCarouselApodData } from "../api/nasaAPI";

interface ApodData {
  date: string;
  explanation: string;
  hdurl: string;
  title: string;
  url: string;
}

const useCarouselApodData = () => {
  const [carouselApodData, setCarouselApodData] = useState<ApodData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchCarouselApodData();
        setCarouselApodData(data);
        console.log('Carousel APOD Data:', data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { carouselApodData, loading, error };
};

export default useCarouselApodData;
