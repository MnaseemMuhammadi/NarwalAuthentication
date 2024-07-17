const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes");
const path = require("path");
// const narawalauthapi = require('./api'); // Import the api.js

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017";
const databaseName = "Eventmanaged01";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use("/api", router);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
