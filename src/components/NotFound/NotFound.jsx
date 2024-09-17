import React from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.not_found_container}>
      <div className={styles.not_found_animation}>
        <div className={styles.not_found_404}>404</div>
        <div className={styles.not_found_text}>Oops! Page not found</div>
      </div>
      <div className={styles.not_found_message}>
        It looks like the page you're looking for doesn't exist.
        <br />
        Don't worry, you can head back to the homepage.
      </div>
      <a href="/" className={styles.not_found_button}>
        Go to Homepage
      </a>
    </div>
  );
};

export default NotFound;
