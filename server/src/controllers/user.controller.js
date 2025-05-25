const User = require("../models/user.model");

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findById(_id).select("-password");
    console.log(user);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Only allow users to view their own profile or admin to view any
    if (user._id !== _id && user.role !== req.body.role) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    console.log("Updating user profile");

    const { _id } = req.body;
    const user = await User.findById(_id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user._id != _id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    user.name = req.body?.name || user.name;
    user.email = req.body?.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    console.log(user);

    const updatedUser = await User.updateOne({ _id }, { $set: user }).select(
      "-password"
    );
    console.log(updatedUser);

    if (updatedUser.matchedCount > 0) {
      return res
        .status(200)
        .json({ message: "User updated successfully", user, ok: true });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
