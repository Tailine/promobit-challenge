import { useState } from "react";
import { Genre } from "types";
import s from "./styles.module.scss";
import { joinClassNames } from "../../helpers/className";
interface FilterProps {
  genres: Genre[];
  defaultSelected: number[];
  filter(number: number[]): void;
}

export function Filter({ genres, filter, defaultSelected }: FilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<number[]>(
    defaultSelected
  );

  function handleFilterSelection(filterSelected: number) {
    if (selectedFilters.includes(filterSelected)) {
      return setSelectedFilters(
        selectedFilters.filter((genre) => genre !== filterSelected)
      );
    }
    setSelectedFilters([...selectedFilters, filterSelected]);
  }

  return (
    <div className={s.filterSection}>
      <ul>
        {genres.map((genre) => (
          <li
            className={joinClassNames([
              s.genreTag,
              selectedFilters.includes(genre.id) ? s.active : "",
            ])}
            onClick={() => handleFilterSelection(genre.id)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
      <div className={s.buttonContainer}>
        <button onClick={() => filter(selectedFilters)}>Apply</button>
      </div>
    </div>
  );
}
