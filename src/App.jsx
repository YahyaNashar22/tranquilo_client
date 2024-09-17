import { useContext, useEffect, useState } from "react";
import "./App.css";

import AppRoutes from "./routes/AppRoutes";
import { UserContext } from "./context/UserContext";

function App() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const refetchUser = () => {
    const localUser = localStorage.getItem("user");

    if (!localUser) setUser(null);
    else setUser(JSON.parse(localUser));
  };

  console.log(user);

  useEffect(() => {
    refetchUser();
    setLoading(false);
  }, []);

  if (loading) {
    // Render a loading state while checking the user
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
