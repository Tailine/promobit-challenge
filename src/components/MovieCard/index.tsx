import { useHistory } from "react-router-dom";
import s from "./styles.module.scss";

interface MovieCardProps {
  id: number;
  title: string;
  genres: string[];
  vote_average: number;
  posterPath: string;
  releaseDate: string;
}

export function MovieCard({
  id,
  genres,
  title,
  vote_average,
  posterPath,
  releaseDate,
}: MovieCardProps) {
  const history = useHistory();

  function seeMovieDetials() {
    localStorage.setItem("movieId", id.toString());
    history.push("/movie-details");
  }

  return (
    <div className={s.movieCardContainer}>
      <div className={s.imageContainer}>
        <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt="" />
      </div>
      <div className={s.mainContent}>
        <div className={s.movieInfo}>
          <div>
            <h2>{title}</h2>
            <p className={s.genres}>{genres.join(", ")}</p>
            <p className={s.year}>{releaseDate.split("-")[0]}</p>
          </div>
          <div className={s.footerContent}>
            <button onClick={seeMovieDetials}>See details</button>
            <p className={s.average}>{vote_average}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
