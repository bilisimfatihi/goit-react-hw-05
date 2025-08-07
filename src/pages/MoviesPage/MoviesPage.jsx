import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { searchMovies } from "../../services/tmdbAPI";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";
  useEffect(() => {
    if (!query) return;

    const fetchSearchedMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchMovies(query);
        setMovies(Array.isArray(results) ? results : []);
      } catch (err) {
        setError("Filmler aranırken bir hata oluştu.");
        console.error("Arama hatası:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchedMovies();
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
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Yükleniyor...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!isLoading && !error && movies.length === 0 && query && (
        <p>Aramanıza uygun film bulunamadı.</p>
      )}
    </main>
  );
};

export default MoviesPage;
