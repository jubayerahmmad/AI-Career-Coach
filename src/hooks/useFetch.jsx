import { useState } from "react";
import { toast } from "sonner";

const useFetch = (callback) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    console.log("args from useFetch", args);
    try {
      const response = await callback(...args);
      console.log("response from useFetch", response);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { data, setData, error, loading, fn };
};

export default useFetch;
