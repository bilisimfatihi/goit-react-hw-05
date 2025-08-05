import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router";
import { getMovieDetails } from "../../services/tmdbAPI";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId)
      .then(setMovie)
      .catch((err) => console.error("Detay alınamadı:", err));
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <main className={styles.main}>
      <Link to={backLinkRef.current}>Go back</Link>
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={250}
        />
      </div>

      <div className={styles.links}>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>

      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
