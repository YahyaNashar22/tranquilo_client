import React from "react";
import EditCategories from "../components/EditCategories/EditCategories";
import EditProducts from "../components/EditProducts/EditProducts";

const Dashboard = () => {
  return (
    <main>
      <EditCategories />
      <EditProducts />
    </main>
  );
};

export default Dashboard;
