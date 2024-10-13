import { useState, useEffect } from 'react';
import { fetchAssetBYId, fetchMetaDataById, fetchNasaImage } from '../api/nasaAPI';

interface MediaData {
  href: string;
  title: string;
  nasa_id: string;
  date_created: string;
  description: string;
  keywords: string[];
  media_type: string;
  links: { href: string, rel: string }[];
}

interface AssetData {
  href: string;
}

interface MetaData {
  location: string;
}

type NasaDataTypes = MediaData[] | AssetData[] | MetaData[];

const useNasaMediaData = (searchQuery: string, dataType: 'image' | 'video' | 'asset' | 'metadata', nasaId?: string) => {
  const [data, setData] = useState<NasaDataTypes>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response: any;
        switch (dataType) {
          case 'image':
          case 'video': {
            response = await fetchNasaImage(searchQuery);
            const collection = response?.data?.body?.collection?.items || [];

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

            setData(mappedItems);
            break;
          }
          case 'asset': {
            if (nasaId) {
              response = await fetchAssetBYId(nasaId);
              setData(response?.data?.body?.collection?.items || []);
            } else {
              throw new Error('NASA ID is required for fetching asset data');
            }
            break;
          }
          case 'metadata': {
            if (nasaId) {
              response = await fetchMetaDataById(nasaId);
              setData(response?.data?.body?.collection?.items || []);
            } else {
              throw new Error('NASA ID is required for fetching metadata');
            }
            break;
          }
          default:
            throw new Error('Invalid data type');
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, dataType, nasaId]);

  return { data, loading, error };
};

export default useNasaMediaData;
