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
  links: { href: string, rel: string }[];
}

const useNasaVideoData = (searchQuery: string) => {
  const [data, setData] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log('searchQuery...............................', searchQuery);
      try {
        // Fetch video data using the NASA API, filtered by 'video' media type
        const response = await fetchNasaImage(searchQuery);
        console.log('response...............................', response);
        const collection = response?.data?.body?.collection?.items || [];
        console.log('collection...............................', collection);

        // Map the API response to extract the relevant fields
        const mappedItems = collection.map((item: any) => {
          const itemData = item?.data?.[0];
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
        const videos = mappedItems.filter(item => item.media_type === 'video');
        console.log('videos...............................', videos);
        setData(videos);
        setError(null); // Clear errors if fetch is successful
      } catch (err: string | any) {
        setError(err.message || 'Failed to fetch data');
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
