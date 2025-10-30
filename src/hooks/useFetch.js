import { useCallback, useEffect, useState } from "react";

const useFetch = (url) => {
    console.log(url)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(url);
      if (!res.ok) throw new Error("Fetch failed");
      const result = await res.json();
      console.log(result)
      setData(result);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};

export default useFetch;
