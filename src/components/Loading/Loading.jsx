import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading_spinner_container}>
      <div className={styles.loading_spinner}></div>
    </div>
  );
};

export default Loading;
