import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/tmdbAPI";
import MovieList from "../../components/MovieList/MovieList";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendFilms = async () => {
      const data = await getTrendingMovies();
      setMovies(data);
    };
    getTrendFilms();
  }, []);
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Trending Today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default HomePage;
