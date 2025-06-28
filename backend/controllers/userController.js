import validator from "validator";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Function to create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(409)
        .json({ success: false, message: "User does not exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: " Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if any field is missing
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password length (minimum 6 characters for example)
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, adminLogin, loginUser };
