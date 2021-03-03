import s from "./styles.module.scss";

export interface TagGenreProps {
  name: string;
}

export function TagGenre({ name }: TagGenreProps) {
  return <p className={s.tag}>{name}</p>;
}
