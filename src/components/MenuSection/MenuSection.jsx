import React, { useEffect, useState } from "react";
import styles from "./MenuSection.module.css";

import Loading from "../Loading/Loading.jsx";

import axios from "axios";

const MenuSection = ({ category, backendUrl }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchItemsPerCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/products/get`, {
        categoryId: category._id,
      });
      setProducts(response.data.payload);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemsPerCategory();
  }, []);

  return (
    <section
      id={category.name}
      className={styles.menuSection}
      style={{ backgroundImage: `url(${backendUrl}/${category.image})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.contentContainer}>
        <h1 className={styles.sectionHeader}>{category.name}</h1>
        {loading ? (
          <Loading />
        ) : (
          <ul className={styles.productList}>
            {products.map((product) => {
              return (
                <li key={product._id} className={styles.product}>
                  <span className={styles.productName}>{product.name}</span>{" "}
                  <span className={styles.productPrice}>{product.price}$</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
