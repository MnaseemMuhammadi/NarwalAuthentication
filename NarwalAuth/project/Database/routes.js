const express = require("express");
const router = express.Router();
const SchemaController = require("./SchemaController");

//displaying the routes
router.get("/users", SchemaController.displayUsers);

router.post("/login", SchemaController.Login);

router.post("/signup", SchemaController.SignUp);

module.exports = router;
