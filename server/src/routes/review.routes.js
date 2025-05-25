const express = require("express");
const router = express.Router();
const {
  getReviews,
  createReview,
} = require("../controllers/review.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/", getReviews);
router.post("/", auth, createReview);

module.exports = router;
