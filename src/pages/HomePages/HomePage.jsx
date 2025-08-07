import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/tmdbAPI";
import MovieList from "../../components/MovieList/MovieList";

import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendFilms = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getTrendingMovies();
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Filmler yüklenirken bir hata oluştu.");
        console.error("Trend Movie hatası:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getTrendFilms();
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Trending Today</h1>
      {isLoading && <p>Yükleniyor...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default HomePage;
