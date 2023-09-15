import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";

export const Login = ({ currentUser, setCurrentUser, loading, setLoading }) => {
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
        toast.warn("Incorect Email or Password!");
        return;
      }

      setErr();
      setLoading(true);
      setCurrentUser(response.data);
      setFormData({
        email: "",
        password: "",
      });

      console.log("User logged in:", response.data);
      setTimeout(() => {
        setLoading(false);
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
            <p style={{ textAlign: "center", color: "#d65757" }}>
              You are already signed in!
            </p>
          )}
          <span>
            New to <b>B</b>Social?{" "}
            <a href="/register">
              <b style={{ color: "#007bff" }}>Sign up now.</b>
            </a>
          </span>
          <small>
            This page is protecte by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
        <ClipLoader
        color="red"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      
      {err && <ToastContainer />}
    </div>
  );
};
