import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../layouts/Header/Header";
import Footer from "../layouts/Footer/Footer";

const Container = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Container;
