import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [respData, setRespData] = useState<T | undefined>();
  const [error, setError] = useState();

  useEffect(() => {
    async function getGenres() {
      try {
        const genreList = await fetch(url).then((data) => data.json());

        setRespData(genreList.genres);
      } catch (err) {
        setError(err);
      }
    }

    if (!respData) {
      getGenres();
    }
  }, []);

  return [respData, error];
}
