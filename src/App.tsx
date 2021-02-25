import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function fetchGenres() {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_genres=27#28&page=200`
      );
      const popular = await data.json();
      console.log(popular);
    }
    fetchGenres();
  }, []);

  return <main></main>;
}

export default App;
