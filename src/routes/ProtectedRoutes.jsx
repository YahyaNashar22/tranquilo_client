import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const ProtectedRoute = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (!user || user === null) {
      navigate("/"); // Redirect to home if not authenticated
    } else {
      setLoading(false); // Set loading to false when user is authenticated
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> {/* Spinner design */}
        {/* Optionally, you can show a message as well */}
        <p>Checking authentication...</p>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
