import React, { useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleDownload = (type) => {
    const fileId = "1nogYKyxL2XF3CAqM7WHt_hSeZ7lUeR2m";
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.target = "_blank";
    link.download = `${type}.js`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log(`Download initiated for ${type}`);
    console.log("Download initiated");
  };

  const text =
    "https://drive.usercontent.google.com/download?id=1nogYKyxL2XF3CAqM7WHt_hSeZ7lUeR2m&export=download&authuser=0";

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className={`dashboard ${isDarkTheme ? "dark-theme" : ""}`}>
      <div className="app-bar">
        <h1>API Dashboard</h1>
      </div>
      <div className="container">
        <div className="section">
          <div className="paper">
            <h2>API Integration Guide</h2>
            <p>
              To integrate this API into your existing website, follow these
              steps:
            </p>
            <ol>
              <li>Install the required dependencies:</li>
              <pre className="codeBlock">
                <code>npm install axios</code>
              </pre>
              <li>Generate a challenge:</li>
              <pre className="codeBlock">
                <code>{`
const response = await axios.get("https://narawalauthapi.onrender.com/generate-challenge", {
  params: { email: email }
});
const challenge = response.data.challenge;
                  `}</code>
              </pre>
              <li>Verify the authentication:</li>
              <pre className="codeBlock">
                <code>{`
const response = await axios.get("https://narawalauthapi.onrender.com/verify", {
  params: { email: email, publicKey: publicKey, c: c, z: z }
});
const isSuccess = response.data.success;
                  `}</code>
              </pre>
            </ol>
          </div>
        </div>
        <div className="section">
          <div className="paper">
            <h2>Library Integration Guide</h2>
            <p>
              To integrate the Narwal Auth library into your existing website,
              follow these steps:
            </p>
            <ol>
              <li>Import the NarwalAuth library:</li>
              <pre className="codeBlock">
                <code>import NarwalAuth from "NarwalAuth";</code>
              </pre>
              <li>Generate a public key:</li>
              <pre className="codeBlock">
                <code>{`
const narwalAuth = await NarwalAuth();
const publicKey = await narwalAuth.GetPublicKey(userPassword);
                `}</code>
              </pre>
              <p>
                Store this `publicKey` in place of the password in your
                database.
              </p>
              <br></br>
              <li>Solve the challenge for authentication at login:</li>
              <pre className="codeBlock">
                <code>{`
const { c, z } = await narwalAuth.SolveChallenge(userPassword, challenge);
                  `}</code>
              </pre>
              <p>Retrieve the public key stored in the database.</p>
            </ol>
          </div>
        </div>
      </div>
      <div className="download-box">
        <div className="paper">
          <h2>Download JS Library File</h2>
          <p>Download our complete JS File for successful API integration.</p>
          <button
            className="download-button"
            onClick={() => handleDownload("API Package")}
          >
            Download
          </button>
          <button
            className="download-button copy-button"
            onClick={() => handleCopy(text)}
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
