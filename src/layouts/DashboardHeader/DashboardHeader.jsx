import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./DashboardHeader.module.css";
import { UserContext } from "../../context/UserContext";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const { setUser } = useContext(UserContext);

  const backHome = () => {
    navigate("/");
  };

  const handleSignout = async () => {
    await axios
      .get(`${backendUrl}/users/logout`)
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
      })
      .catch((error) => console.log(error));
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title} onClick={backHome}>
        Dashboard
      </h1>

      <Link to="/" className={styles.signout} onClick={handleSignout}>
        Sign Out
      </Link>
    </header>
  );
};

export default DashboardHeader;
