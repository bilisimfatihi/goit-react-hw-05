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
      <div className={styles.movie}>
        <div className={styles.poster}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={250}
          />
        </div>
        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <span>User Score : </span>
            {movie.vote_average}
          </p>
          <p>
            <span>Release Year: </span>
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "Unknown"}
          </p>

          <p className={styles.genres}>
            {movie.genres?.map((genre) => (
              <span key={genre.id} className={styles.genreBadge}>
                {genre.name}
              </span>
            ))}
          </p>
        </div>
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
