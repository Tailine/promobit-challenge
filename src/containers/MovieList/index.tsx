import { useEffect, useState } from "react";
import { Genre, Movie, PaginatedData } from "types";
import { useFetch } from "../../hooks/useFetch";
import { MovieCard } from "components/MovieCard";
import s from "./styles.module.scss";
import { Pagination } from "components/Pagination";
import ReactPaginate from "react-paginate";
import chevronRight from "assets/images/chevronRight.svg";
import chevronLeft from "assets/images/chevronLeft.svg";
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

  function handlePageChange(page: { selected: number }) {
    console.log(page);
    setCurrentPage(page.selected + 1);
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
      <ReactPaginate
        initialPage={currentPage - 1}
        pageCount={movies?.total_pages ?? 0}
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        containerClassName={s.paginationContainer}
        pageClassName={s.page}
        activeClassName={s.active}
        breakClassName={s.break}
        nextLabel={
          !(currentPage === (movies?.total_pages ?? 0) - 1) && (
            <button className={s.chevron}>
              <img src={chevronRight} />
            </button>
          )
        }
        previousLabel={
          !(currentPage === 1) && (
            <button className={s.chevron}>
              <img src={chevronLeft} />
            </button>
          )
        }
      />
    </section>
  );
}
