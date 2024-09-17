import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import EditCategories from "../components/EditCategories/EditCategories";
import EditProducts from "../components/EditProducts/EditProducts";

const Dashboard = () => {
  const [view, setView] = useState("categories"); // Default view is 'categories'

  return (
    <>
      <Helmet>
        <title>Dashboard - Tranquilo</title>
        <meta
          name="description"
          content="Edit the different categories, foods and beverages."
        />
        <meta
          name="keywords"
          content="dashboard, categories, foods, beverages, Tranquilo"
        />
        <meta name="author" content="Yahya Nashar" />
        <meta property="og:title" content="Dashboard - Tranquilo" />
        <meta
          property="og:description"
          content="Edit the different categories, foods and beverages."
        />
        <meta property="og:image" content="../assets/logo_noBackground.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <main>
        <div className="dashboard-controls">
          <button
            onClick={() => setView("categories")}
            className={`dashboard-btn ${view === "categories" ? "active" : ""}`}
          >
            Manage Categories
          </button>
          <button
            onClick={() => setView("products")}
            className={`dashboard-btn ${view === "products" ? "active" : ""}`}
          >
            Manage Products
          </button>
        </div>

        <div className="dashboard-content">
          {view === "categories" && <EditCategories />}
          {view === "products" && <EditProducts />}
        </div>
      </main>
    </>
  );
};

export default Dashboard;
