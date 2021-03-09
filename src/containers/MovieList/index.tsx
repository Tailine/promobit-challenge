import { useContext, useState } from "react";
import { Genre, Movie, PaginatedData } from "types";
import { useFetch } from "../../hooks/useFetch";
import { MovieCard } from "components/MovieCard";
import s from "./styles.module.scss";
import ReactPaginate from "react-paginate";
import chevronRight from "assets/images/chevronRight.svg";
import chevronLeft from "assets/images/chevronLeft.svg";
import { Filter } from "components/Filter";
import { GenreContext } from "../../GenreContext";
import { joinClassNames } from "../../helpers/className";
import { Loading } from "../../components/Loading/index";
import { ErrorMessage } from "components/ErrorMessage";
interface MovieListProps {
  genreList: Genre[];
}

export function MovieList({ genreList }: MovieListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayFilter, setDisplayFilter] = useState(false);
  const { selectedGenres, setSelectedGenres } = useContext(GenreContext);

  const { respData: movies, error, loading } = useFetch<PaginatedData<Movie>>(
    `https://api.themoviedb.org/3/movie/popular?api_key=${
      process.env.REACT_APP_API_KEY
    }&language=en-US&page=${currentPage}&with_genres=${(
      selectedGenres ?? []
    ).join("|")}`,
    [currentPage, selectedGenres]
  );

  function getMovieGenres(genreIds: number[]) {
    return genreIds.map(
      (id) => genreList.find((genre) => genre.id === id)?.name ?? ""
    );
  }

  function handlePageChange(page: { selected: number }) {
    setCurrentPage(page.selected + 1);
  }

  function renderContent() {
    if (loading) {
      return <Loading />;
    }
    if (error) {
      return <ErrorMessage message="Error to fetch movies" />;
    }
    return (
      <>
        <div className={s.movieListContainer}>
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
        </div>
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
      </>
    );
  }

  return (
    <section className={s.movieList}>
      <h1>Today's Popular</h1>
      <button
        className={joinClassNames([
          s.btnFilter,
          displayFilter ? s.filterActive : "",
        ])}
        onClick={() => setDisplayFilter((state) => !state)}
      >
        Filter
      </button>
      {displayFilter && (
        <Filter
          genres={genreList}
          filter={(filtersSelected) => {
            setSelectedGenres?.(filtersSelected);
            setDisplayFilter(false);
          }}
          defaultSelected={selectedGenres ?? []}
        />
      )}
      {renderContent()}
    </section>
  );
}
