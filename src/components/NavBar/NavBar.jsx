import React from "react";

import styles from "./NavBar.module.css";
import { Link } from "react-scroll";

const NavBar = ({ categories }) => {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.navItemsContainer}>
        {categories.map((category) => {
          return (
            <li key={category._id} className={styles.navItem}>
              <Link
                to={category.name} // Matches the id of the section
                smooth={true} // Smooth scroll effect
                duration={500} // Scroll duration in ms
                offset={-70} // Optional: Adjust for any fixed header
                className={styles.categoryNavItem}
              >
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
