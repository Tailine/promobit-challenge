import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface GenreContextType {
  selectedGenres: number[];
  setSelectedGenres: Dispatch<SetStateAction<number[]>>;
}

export const GenreContext = createContext<Partial<GenreContextType>>({});

export function GenreProvider({ children }: { children: ReactNode }) {
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  return (
    <GenreContext.Provider value={{ selectedGenres, setSelectedGenres }}>
      {children}
    </GenreContext.Provider>
  );
}
