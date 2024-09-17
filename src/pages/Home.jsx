import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar/NavBar";
import MenuSection from "../components/MenuSection/MenuSection";
import Divider from "../components/Divider/Divider";

const Home = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/categories/get`);
      setCategories(response.data.payload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <main>
      <NavBar categories={categories} />
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
    </main>
  );
};

export default Home;
