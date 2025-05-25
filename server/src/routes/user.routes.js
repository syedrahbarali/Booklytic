const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller.js");
const auth = require("../middlewares/auth.middleware.js");

router.get("/", auth, getUserProfile);
router.put("/", auth, updateUserProfile);

module.exports = router;
