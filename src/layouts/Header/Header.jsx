import React, { useContext } from "react";
import styles from "./Header.module.css";

import logo from "../../assets/logo_noBackground.png";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className={styles.wrapper}>
      <img src={logo} alt="logo" className={styles.logo} />
      {user && (
        <Link to="/dashboard/manage" className={styles.dashboard}>
          Dashboard
        </Link>
      )}
    </header>
  );
};

export default Header;
