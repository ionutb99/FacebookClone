import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [err, setErr] = useState();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { firstName, lastName, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`api/users`, formData);
      if (response.data.error) {
        setErr("Email already used!");
        console.log("Email already used!");
        return;
      }

      setErr();
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 500);

      console.log("User created:", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          {err && <p style={{ textAlign: "center", color: "red" }}>{err}</p>}
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            required
          />
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
          <button className="registerButton" type="submit">
            Sign Up
          </button>
          <span>
            Already have an account? <a href="/login">Sign in</a>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
};
