import React from "react";
import { Outlet } from "react-router-dom";

import DashboardHeader from "../layouts/DashboardHeader/DashboardHeader";

const Container = () => {
  return (
    <main>
      <DashboardHeader />
      <Outlet />
    </main>
  );
};

export default Container;
