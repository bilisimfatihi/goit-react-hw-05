import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMovieCredits } from "../../services/tmdbAPI";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMovieCredits(movieId);
        setCast(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Oyuncu bilgileri alınırken hata oluştu.");
        console.error("Oyuncu bilgileri alınamadı:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (cast.length === 0) return <p>Oyuncu bilgisi bulunamadı.</p>;

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
          <div className={styles.info}>
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
