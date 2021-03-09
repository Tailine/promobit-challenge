import { Link } from "react-router-dom";
import s from "./styles.module.scss";

export function NotFound() {
  return (
    <div className={s.notFound}>
      <h1>Page not found</h1>
      <Link to="/">Go to home</Link>
    </div>
  );
}
