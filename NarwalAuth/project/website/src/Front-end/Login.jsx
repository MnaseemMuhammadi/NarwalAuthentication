import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import NarwalAuth from "../../NarwalAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const generateChallenge = async () => {
    console.log("In generateChallenge");
    try {
      console.log("Email being sent:", email); // Ensure email is what you expect
      const response = await axios.get(
        "https://narawalauthapi.onrender.com/generate-challenge",
        {
          params: {
            email: email,
          },
        }
      );

      console.log("Response received:", response.data); // Check response structure
      return response.data.challenge;
    } catch (error) {
      console.error("Error generating challenge:", error);
    } finally {
      console.log("Request finished"); // Check if this gets logged
    }
  };

  const Verification = async (email, publicKey, c, z) => {
    console.log("In Verification");
    try {
      const response = await axios.get(
        "https://narawalauthapi.onrender.com/verify",
        {
          params: {
            email: email,
            publicKey: publicKey,
            c: c,
            z: z,
          },
        }
      );
      console.log("response in verification", response.data.success);
      return response.data.success;
    } catch (error) {
      console.error("Error verifying authentication:", error);
    }
  };

  const handleLogin = async (event) => {
    console.log("here");
    event.preventDefault();
    var challenge = await generateChallenge();
    console.log("challenge", challenge);
    //convert string challenge to BigInt
    const narwalAuth = await NarwalAuth();
    const { c, z } = await narwalAuth.SolveChallenge(password, challenge);

    console.log("c", c);
    console.log("z", z);
    try {
      const response = await axios.post("http://localhost:8081/api/login", {
        email,
        password,
      });
      const publicKey = response.data.publickey;
      const { user } = response.data;
      // Store the user data in the local storage
      localStorage.setItem("user", JSON.stringify(user));

      console.log("public key :", response.data);
      if (await Verification(email, publicKey, c, z)) {
        console.log("Login successful! Redirecting to Homepage");
        alert("Login successful! Redirecting to Homepage");
        navigate("/dashboard"); // Navigate to the DASHBOARD after successful login
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error("Invalid Email", error.response.data);
      alert("Invalid Email");
    }
  };

  return (
    <div className="login">
      <div className="form-container">
        <p className="title">Login</p>
        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="forgot">
              <a rel="noopener noreferrer" href="/signup">
                Don't have an account? Sign up
              </a>
            </div>
          </div>
          <button className="sign" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
