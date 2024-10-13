import { useState, useEffect } from "react";
import { fetchAstronomyPictureOfTheDay } from "../api/nasaAPI";

interface ApodData {
    date: string;
    explanation: string;
    hdurl: string;
    title: string;
    url: string;
}

const useApodData = () => {
    const [apodData, setApodData] = useState<ApodData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const fetchApodData = async () => {
            try {
                setLoading(true);
                const data = await fetchAstronomyPictureOfTheDay({});
                setApodData(data);
                console.log('APOD Data:', data);
            } catch (err: string | any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApodData();

        // eslint-disable-next-line prefer-const
        intervalId = setInterval(fetchApodData, 600000); 

        return () => clearInterval(intervalId);

    }, []); 

    return { apodData, loading, error };
};

export default useApodData;
 