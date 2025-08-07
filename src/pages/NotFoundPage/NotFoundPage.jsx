import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <main className={styles.main}>
      <h2>Oops! Page Not Found</h2>
      <Link to="/">Go to Home</Link>
    </main>
  );
};

export default NotFoundPage;
