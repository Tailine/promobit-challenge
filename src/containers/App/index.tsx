import { ErrorMessage } from "components/ErrorMessage";
import { Loading } from "components/Loading";
import { MovieList } from "containers/MovieList";
import { useFetch } from "hooks/useFetch";
import { Genre } from "types";

function App() {
  const { respData, error, loading } = useFetch<{ genres: Genre[] }>(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

  const genreList = respData?.genres ?? [];

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      {error && <ErrorMessage message="Error to fetch movie genres" />}
      <MovieList genreList={genreList} />
    </main>
  );
}

export default App;
