import { useEffect, useState } from "react";
import { Genre, Movie, PaginatedData } from "types";
import { useFetch } from "../../hooks/useFetch";
import { MovieCard } from "components/MovieCard";
import s from "./styles.module.scss";

interface MovieListProps {
  genreList: Genre[];
}

export function MovieList({ genreList }: MovieListProps) {
  // passar pag e generos
  // &with_genres=&page=1
  const { respData: movies, error, loading } = useFetch<PaginatedData<Movie>>(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );

  function getMovieGenres(genreIds: number[]) {
    return genreIds.map(
      (id) => genreList.find((genre) => genre.id === id)?.name ?? ""
    );
  }

  return (
    <section className={s.movieListContainer}>
      {movies?.results.map((movie) => (
        <MovieCard
          key={movie.id}
          posterPath={movie.poster_path}
          title={movie.title}
          releaseDate={movie.release_date}
          vote_average={movie.vote_average}
          genres={getMovieGenres(movie.genre_ids)}
        />
      ))}
    </section>
  );
}
