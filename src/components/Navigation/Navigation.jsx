import { NavLink } from "react-router";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const activeFunc = ({ isActive }) => {
    return isActive ? styles.active : "";
  };
  return (
    <nav className={styles.nav}>
      <NavLink className={activeFunc} to="/">
        Home
      </NavLink>
      <NavLink className={activeFunc} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
