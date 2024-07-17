import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Back-end/Header";
import Footer from "./Back-end/Footer";
import Login from "./Front-end/Login.jsx";
import Signup from "./Front-end/Signup.jsx";
import "./App.css";
import Dashboard from "./Front-end/dashboard.jsx";

//created a routing path into the application
//calling the header which uses the link to navigate to the different pages through route paths
//calling the routes

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
