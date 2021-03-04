import { useEffect, useState } from "react";

export function useFetch<T>(url: string, dependenciesArr: any[] = []) {
  const [respData, setRespData] = useState<T | undefined>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const useEffectDependencies = [...dependenciesArr, url];

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(url).then((data) => data.json());
        setRespData(data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }

    fetchData();
  }, useEffectDependencies);

  return { respData, error, loading };
}
