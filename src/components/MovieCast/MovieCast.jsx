import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../services/tmdbAPI";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieCredits(movieId)
      .then(setCast)
      .catch((err) => setError("Oyuncu bilgileri alınamadı"));
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>Oyuncu bilgisi bulunamadı.</p>;

  return (
    <ul className={styles.list}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={styles.item}>
          {profile_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
              className={styles.image}
            />
          )}
          <div>
            <p>
              <strong>{name}</strong>
            </p>
            <p>as {character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
