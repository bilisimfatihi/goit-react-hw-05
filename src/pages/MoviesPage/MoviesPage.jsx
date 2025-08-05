import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { searchMovies } from "../../services/tmdbAPI";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    searchMovies(query)
      .then(setMovies)
      .catch((err) => console.error("Arama hatası:", err));
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.query.value.trim();
    if (input) {
      setSearchParams({ query: input });
    }
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default MoviesPage;
