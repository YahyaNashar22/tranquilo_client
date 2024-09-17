import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Signin = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/users/login`, formData);
      setUser(response.data.payload.data);
      localStorage.setItem("user", JSON.stringify(response.data.payload.data));
      navigate("/dashboard/manage");
    } catch (error) {
      alert("problem signing in, try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user !== null) navigate("/dashboard/manage");
  }, [user]);

  return (
    <div className="form-container">
      <form method="POST" onSubmit={handleSubmit} className="form-wrapper">
        <label className="form-labels">
          username
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            className="form-inputs"
            onChange={handleChange}
          />
        </label>

        <label className="form-labels">
          password
          <input
            type="password"
            name="password"
            placeholder="password"
            value={formData.password}
            className="form-inputs"
            onChange={handleChange}
          />
        </label>

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "please wait..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Signin;
