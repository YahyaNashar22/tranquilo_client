import React, { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

import NavBar from "../components/NavBar/NavBar";
import MenuSection from "../components/MenuSection/MenuSection";
import Divider from "../components/Divider/Divider";
import Loading from "../components/Loading/Loading";

const Home = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/categories/get`);
      const sortedCategories = response.data.payload.sort(
        (a, b) => a.order - b.order
      );
      setCategories(sortedCategories);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Tranquilo</title>
        <meta
          name="description"
          content="Browse our categories and discover a wide range of foods and beverages."
        />
        <meta
          name="keywords"
          content="home, categories, foods, beverages, Tranquilo"
        />
        <meta name="author" content="Yahya Nashar" />
        <meta property="og:title" content="Home - Tranquilo" />
        <meta
          property="og:description"
          content="Browse our categories and discover a wide range of foods and beverages."
        />
        <meta property="og:image" content="../assets/logo_noBackground.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <main>
        <NavBar categories={categories} />
        {loading ? (
          <Loading />
        ) : (
          <>
            {categories.map((category) => {
              return (
                <div key={category.name}>
                  <MenuSection
                    key={category._id}
                    category={category}
                    backendUrl={backendUrl}
                  />
                  <Divider />
                </div>
              );
            })}
          </>
        )}
      </main>

      {/* Back to Top Button */}
      <button className="back-to-top" onClick={scrollToTop}>
        &#8593;
      </button>
    </>
  );
};

export default Home;
