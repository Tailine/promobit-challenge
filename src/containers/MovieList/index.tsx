import { useEffect, useState } from "react";
import { Genre, Movie, PaginatedData } from "types";
import { useFetch } from "../../hooks/useFetch";
import { MovieCard } from "components/MovieCard";
import s from "./styles.module.scss";
import { Pagination } from "components/Pagination";

interface MovieListProps {
  genreList: Genre[];
}

export function MovieList({ genreList }: MovieListProps) {
  // passar pag e generos
  // &with_genres=&page=1
  const [currentPage, setCurrentPage] = useState(1);
  // const [movies, setMovies] = useState<PaginatedData<Movie>>();

  const { respData: movies, error, loading } = useFetch<PaginatedData<Movie>>(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`,
    [currentPage]
  );
  // function fetchMovies() {
  //   setMovies(respData);
  // }

  // TODO handle error and loading
  // useEffect(() => {
  //   fetchMovies();
  // }, [currentPage]);

  function getMovieGenres(genreIds: number[]) {
    return genreIds.map(
      (id) => genreList.find((genre) => genre.id === id)?.name ?? ""
    );
  }

  function handlePageChange(page: number) {
    console.log(page);
    setCurrentPage(page);
  }

  return (
    <section className={s.movieListContainer}>
      {movies?.results.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          posterPath={movie.poster_path}
          title={movie.title}
          releaseDate={movie.release_date}
          vote_average={movie.vote_average}
          genres={getMovieGenres(movie.genre_ids)}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        onPageClick={handlePageChange}
        pages={[1, 3, 5, 6, 7]}
      />
    </section>
  );
}
