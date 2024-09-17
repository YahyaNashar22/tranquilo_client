import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import HeaderFooterOutlet from "./HeaderFooterOutlet.jsx";
import DashboardOutlet from "./DashboardOutlet.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import Loading from "../components/Loading/Loading.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";

// pages imports -- lazy
const LazyHome = lazy(() => import("../pages/Home.jsx"));
const LazySignin = lazy(() => import("../pages/Signin.jsx"));
const LazyDashboard = lazy(() => import("../pages/Dashboard.jsx"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HeaderFooterOutlet />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <LazyHome />
            </Suspense>
          }
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loading />}>
            <LazySignin />
          </Suspense>
        }
      />

      {/* Dashboard Protected Route */}
      <Route element={<ProtectedRoute />}>
        <Route exact path="/dashboard/*" element={<DashboardOutlet />}>
          <Route
            path="manage"
            element={
              <Suspense fallback={<Loading />}>
                <LazyDashboard />
              </Suspense>
            }
          />
        </Route>
      </Route>
      {/* Not Found Route */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
