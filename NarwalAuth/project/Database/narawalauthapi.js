const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process"); //library to integrate python script with nodejs
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function runPythonScript(scriptPath, args, callback) {
  const pythonProcess = spawn("python", [scriptPath].concat(args));

  let data = "";
  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString(); // Collect data from Python script
  });

  pythonProcess.stderr.on("data", (error) => {
    console.error(`stderr: ${error}`);
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.log(`Python script exited with code ${code}`);
      callback(`Error: Script exited with code ${code}`, null);
    } else {
      console.log("Python script executed successfully");
      callback(null, data);
    }
  });
}

const challenges = new Map();
console.log("narwalauth api.js is starting...");

app.get("/generate-challenge", (req, res) => {
  console.log("In generate-challenge API");

  // Extract email from query parameters
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  runPythonScript(
    "zkp_operations.py",
    ["generate_challenge"],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const challenge = results[0];
      challenges.set(email, challenge);
      res.json({ challenge: challenge.toString() });
    }
  );
});

app.get("/verify", (req, res) => {
  const { email, publicKey, c, z } = req.query;

  const challenge = challenges.get(email);
  if (!challenge || !email || !publicKey || !c || !z) {
    return res.status(400).json({ error: "Limited Information" });
  }

  console.log(req.query);
  console.log("challenge", challenge.toString());

  runPythonScript(
    "zkp_operations.py",
    ["verify", publicKey, c, z, challenge.toString()],
    (err, results) => {
      if (err) {
        console.error("Error running Python script:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Log the raw output from the Python script
      const rawOutput = results.split("python verification script")[1].trim();
      console.log("Processed output from Python script:", rawOutput);

      try {
        const resultsArray = rawOutput
          .slice(1, -1)
          .split(",")
          .map((item) => item.trim());
        const firstElement = parseInt(resultsArray[0], 10);
        console.log("First element from Python script output:", firstElement);
        if (firstElement === 1) {
          console.log("isSuccess: is true here");
          res.json({ success: true });
        } else {
          console.log("isSuccess: is false here");
          res.json({ success: false });
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        res
          .status(500)
          .json({ error: "Invalid response from verification process" });
      }
    }
  );
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
