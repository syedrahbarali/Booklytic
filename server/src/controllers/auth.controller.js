const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateAccessToken } = require("../utils/generateAccessToken");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email, password, role });
    await user.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", ok: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = { _id: user.id, role: user.role };
    const token = generateAccessToken(payload);

    // Set cookie
    res.cookie("accessToken", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(201).json({ message: "Login Success", token, ok: true });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
