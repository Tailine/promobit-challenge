import s from "./styles.module.scss";

export interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className={s.message}>{message}</p>;
}
