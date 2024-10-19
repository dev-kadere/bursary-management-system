import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url, headers = {}, initialData = []) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axios.get(url, { headers });
        setData(response.data); // Set the fetched data
      } catch (err) {
        console.error("Fetch error:", err); // Log the error
        setError(
          err.response ? err.response.data.message : "An error occurred"
        );
      } finally {
        setLoading(false); // Stop loading once fetching is complete
      }
    };

    fetchData();
  }, [url, headers]);

  return { data, error, loading, setData };
};

export default useFetch;
