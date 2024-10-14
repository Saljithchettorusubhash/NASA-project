import { useEffect, useState } from "react";
import { exoPlanetHabitable } from "../api/nasaAPI";

export const useHabitableExoPlanetData = (limit: number, offset: number) => {
  const [habitableExoPlanetData, setHabitableExoPlanetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Define error as a string or null

  useEffect(() => {
    const fetchHabitableData = async () => {
      setLoading(true);
      try {
        const response = await exoPlanetHabitable({ limit, offset });
        setHabitableExoPlanetData(response.body);  // Ensure the correct response body is used
      } catch (err) {
        // Type check for error
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHabitableData();
  }, [limit, offset]);

  return { habitableExoPlanetData, loading, error };
};
