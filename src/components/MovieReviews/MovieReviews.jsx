import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMovieReviews } from "../../services/tmdbAPI";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovieReviews(movieId)
      .then(setReviews)
      .catch((err) => setError("Yorumlar alınamadı"));
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>Yorum bulunamadı.</p>;

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
