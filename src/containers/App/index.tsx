import { MovieList } from "containers/MovieList";
import { Filter } from "components/Filter/index";
import { useFetch } from "hooks/useFetch";
import { Genre } from "types";

function App() {
  const { respData, error, loading } = useFetch<{ genres: Genre[] }>(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

  const genreList = respData?.genres ?? [];

  return (
    <main>
      <MovieList genreList={genreList} />
      <Filter genreList={genreList} />
    </main>
  );
}

export default App;
