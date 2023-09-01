import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = ({ currentUser, setCurrentUser }) => {
  const [err, setErr] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", formData);

      if (response.data.error) {
        setErr("Incorect Email or Password!");
        return;
      }

      setErr();
      setCurrentUser(response.data);
      setFormData({
        email: "",
        password: "",
      });

      console.log("User logged in:", response.data);
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <div className="login">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {err && (
            <h2 style={{ textAlign: "center", fontSize: "15px", color: "red" }}>
              {err}
            </h2>
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />

          {!currentUser ? (
            <button className="loginButton" type="submit">
              Sign In
            </button>
          ) : (
            <p>You are already signed in!</p>
          )}
          <span>
            New to <b>B</b>Social?{" "}
            <a href="/register">
              <b>Sign up now.</b>
            </a>
          </span>
          <small>
            This page is protecte by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
};
