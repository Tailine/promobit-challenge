import { useFetch } from "hooks/useFetch";
import { MovieDetails } from "types";
import s from "./styles.module.scss";
import { Link, useHistory } from "react-router-dom";

export function MovieDetail() {
  const { respData, loading, error } = useFetch<MovieDetails>(
    `https://api.themoviedb.org/3/movie/${localStorage.getItem(
      "movieId"
    )}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

  const genres = respData?.genres.reduce((initialStr, genre, i) => {
    return i === 0 ? `${genre.name}` : `${initialStr}, ${genre.name}`;
  }, "");

  const history = useHistory();

  return (
    <>
      <Link to="/">Voltar</Link>
      <section className={s.movieDetailContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${respData?.poster_path}`}
          alt=""
        />
        <div className={s.movieDetails}>
          <h1>{respData?.title}</h1>
          <p className={s.genre}>{genres}</p>
          <p className={s.year}>{respData?.release_date.split("-")[0]}</p>
          <h2>Summary</h2>
          <p className={s.overview}>{respData?.overview}</p>
          <p className={s.vote}>{respData?.vote_average}</p>
        </div>
      </section>
    </>
  );
}
