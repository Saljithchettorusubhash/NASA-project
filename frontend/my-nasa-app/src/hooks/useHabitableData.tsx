import { useEffect, useState } from "react";
import { exoPlanetHabitable } from "../api/nasaAPI";

export const useHabitableExoPlanetData = (limit, offset) => {
  const [habitableExoPlanetData, setHabitableExoPlanetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabitableData = async () => {
      setLoading(true);
      try {
        const response = await exoPlanetHabitable({ limit, offset });
        setHabitableExoPlanetData(response.body);  // Make sure to use response.body
      } catch (err) {
        setError(err.message || "Failed to fetch habitable exoplanet data");
      } finally {
        setLoading(false);
      }
    };

    fetchHabitableData();
  }, [limit, offset]);

  return { habitableExoPlanetData, loading, error };
};
