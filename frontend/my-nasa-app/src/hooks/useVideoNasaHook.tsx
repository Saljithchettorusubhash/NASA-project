import { useState, useEffect } from 'react';
import { fetchNasaImage } from '../api/nasaAPI'; // Ensure this is the correct API client

interface VideoData {
  href: string;
  title: string;
  nasa_id: string;
  date_created: string;
  description: string;
  keywords: string[];
  media_type: string;
  links: { href: string; rel: string }[];
}

interface NasaApiResponseItem {
  data: {
    title: string;
    nasa_id: string;
    date_created: string;
    description: string;
    keywords: string[];
    media_type: string;
  }[];
  href: string;
  links: { href: string; rel: string }[];
}

const useNasaVideoData = (searchQuery: string) => {
  const [data, setData] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log('searchQuery:', searchQuery);
      try {
        const response = await fetchNasaImage(searchQuery);
        const collection: NasaApiResponseItem[] = response?.data?.body?.collection?.items || [];
        console.log('collection:', collection);

        // Map the API response to extract the relevant fields
        const mappedItems = collection.map((item: NasaApiResponseItem) => {
          const itemData = item.data[0];
          return {
            title: itemData?.title || 'No title available',
            nasa_id: itemData?.nasa_id || 'No ID available',
            date_created: itemData?.date_created || 'No date available',
            description: itemData?.description || 'No description available',
            keywords: itemData?.keywords || [],
            media_type: itemData?.media_type || 'unknown',
            href: item?.href || '',
            links: item?.links || [],
          };
        });

        // Filter only videos from the mapped items
        const videos = mappedItems.filter((item: VideoData) => item.media_type === 'video');
        setData(videos);
        setError(null); // Clear errors if fetch is successful
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Failed to fetch data');
        } else {
          setError('An unknown error occurred');
        }
        setData([]); 
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [searchQuery]);

  return { data, loading, error };
};

export default useNasaVideoData;
