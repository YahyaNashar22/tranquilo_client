import React from "react";
import styles from "./Footer.module.css";

import logo from "../../assets/logo_noBackground.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="logo" className={styles.logo} />
      </div>

      <div className={styles.contact}>
        <h2 className={styles.header}>Contact us</h2>
        <Link
          className={styles.subheader}
          to="mailto:info@tranquilocoffee.shop"
        >
          info@tranquilocoffee.shop
        </Link>
      </div>

      <div className={styles.contact}>
        <h2 className={styles.header}>Find us</h2>
        <p className={styles.subheader}>
          Mina Road, Messayke Building Near Bank Audi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
