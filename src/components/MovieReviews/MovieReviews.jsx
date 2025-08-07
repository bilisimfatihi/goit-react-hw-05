import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMovieReviews } from "../../services/tmdbAPI";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMovieReviews(movieId);
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("İncelemeler alınırken hata oluştu.");
        console.error("İncelemeler alınamadı:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (reviews.length === 0) return <p>İnceleme bulunamadı.</p>;

  return (
    <ul className={styles.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={styles.item}>
          <h4>{author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
