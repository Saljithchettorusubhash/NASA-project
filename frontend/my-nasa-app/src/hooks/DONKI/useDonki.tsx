import { useState, useEffect } from "react";
import { DONKI_ENDPOINTS } from "../../api/endpoints";
import { fetchRetry } from "../../utils/fetchRetry";
import { apiClient } from "../../api/apiClient";

// Define types for the response data
interface CMEData {
  speed: number;
  latitude: number;
  longitude: number;
  [key: string]: any;
}

interface GSTData {
  kpIndex: number;
  latitude: number;
  longitude: number;
  [key: string]: any;
}

interface FLRData {
  classType: string;
  [key: string]: any;
}

interface IPSData {
  intensity: number;
  [key: string]: any;
}

interface MPCData {
  distance: number;
  [key: string]: any;
}

interface SEPData {
  energy: number;
  [key: string]: any;
}

type DonkiDataTypes = CMEData[] | GSTData[] | FLRData[] | IPSData[] | MPCData[] | SEPData[];

const useDonkiData = (startDate: string, endDate: string, dataType: string) => {
  const [data, setData] = useState<DonkiDataTypes>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        switch (dataType) {
          case 'cmeData':
            response = await fetchRetry(() =>
              apiClient.get(DONKI_ENDPOINTS.CME, { params: { startDate, endDate } })
            );
            setData(response.data.body || []);
            break;
          case 'gstData':
            response = await fetchRetry(() =>
              apiClient.get(DONKI_ENDPOINTS.GST, { params: { startDate, endDate } })
            );
            setData(response.data.body || []);
            break;
          case 'flrData':
            response = await fetchRetry(() =>
              apiClient.get(DONKI_ENDPOINTS.FLR, { params: { startDate, endDate } })
            );
            setData(response.data.body || []);
            break;
          case 'ipsData':
            response = await fetchRetry(() =>
              apiClient.get(DONKI_ENDPOINTS.IPS, { params: { startDate, endDate } })
            );
            setData(response.data.body || []);
            break;
          case 'mpcData':
            response = await fetchRetry(() =>
              apiClient.get(DONKI_ENDPOINTS.MPC, { params: { startDate, endDate } })
            );
            setData(response.data.body || []);
            break;
          case 'sepData':
            response = await fetchRetry(() =>
              apiClient.get(DONKI_ENDPOINTS.SEP, { params: { startDate, endDate } })
            );
            setData(response.data.body || []);
            break;
          default:
            throw new Error('Invalid data type');
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate, dataType]);

  return { data, loading, error };
};

export default useDonkiData;
