import s from "./styles.module.scss";

interface PaginationProps {
  pages: number[];
  currentPage: number;
  onPageClick(currentPage: number): void;
}

export function Pagination({
  currentPage,
  pages,
  onPageClick,
}: PaginationProps) {
  const pageElements = pages.map((page) => (
    <p className={s.page} onClick={() => onPageClick(page)}>
      {page}
    </p>
  ));

  return <div className={s.paginationContainer}>{pageElements}</div>;
}
