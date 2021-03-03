import s from "./styles.module.scss";

interface MovieCardProps {
  title: string;
  genres: string[];
  vote_average: number;
  posterPath: string;
  releaseDate: string;
}

export function MovieCard({
  genres,
  title,
  vote_average,
  posterPath,
  releaseDate,
}: MovieCardProps) {
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
            <a href="">See details</a>
            <p className={s.average}>{vote_average}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
