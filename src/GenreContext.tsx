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

  function updateSelectedGenres(filters: number[]) {
    setSelectedGenres(filters);
  }

  return (
    <GenreContext.Provider value={{ selectedGenres, setSelectedGenres }}>
      {children}
    </GenreContext.Provider>
  );
}

// import { createContext, Dispatch, ReactNode, useState } from "react";

// interface GenreContextType {
//   selectedGenres: number[];
//   updateSelectedGenres(filters: number[]): void;
// }

// export const GenreContext = createContext<Partial<GenreContextType>>({});

// export function GenreProvider({ children }: { children: ReactNode }) {
//   const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

//   function updateSelectedGenres(filters: number[]) {
//     setSelectedGenres(filters);
//   }

//   return (
//     <GenreContext.Provider value={{ selectedGenres, updateSelectedGenres }}>
//       {children}
//     </GenreContext.Provider>
//   );
// }
