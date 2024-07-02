import { useState, useEffect } from "react";
import { TData } from "../models/fetchModel";

const UseJSONFetch = (url: string, options: RequestInit) => {
  const [data, setData] = useState<TData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response: Response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const dataJSON: TData[] = await response.json();
        setData(dataJSON);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default UseJSONFetch;
