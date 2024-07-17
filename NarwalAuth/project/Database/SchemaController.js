const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { User } = require("./Schema");

const imageDir = path.join(__dirname, "Cardsimages");
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

// Multer configuration for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDir);
  },
  filename: function (req, file, cb) {
    const title = req.body.title; // Get the title from the request body
    const organizerId = req.body.organizerId; // Get the organizerId from the request body
    const filename = `${title}_${organizerId}.png`;
    cb(null, filename);
  },
});

//creating a upload object
const upload = multer({ storage: storage });

// Display all users
const displayUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found return an error
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    var publickey = user.password;
    res.json({ message: "Public Key ", publickey });
  } catch (err) {
    next(err);
  }
};

const SignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log("Signup:", name, email, password);

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Create a new user
    const user = new User({ name, email, password });
    const savedUser = await user.save();

    // Log the saved user to check the userId field
    console.log("Saved User:", savedUser);

    // Store the user data in the local storage
    const userData = {
      userId: savedUser.userId,
      name: savedUser.name,
      email: savedUser.email,
    };
    res.json({ message: "Signup successful", user: userData });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  displayUsers,
  Login,
  SignUp,
};
