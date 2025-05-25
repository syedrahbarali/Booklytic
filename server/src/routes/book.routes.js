const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
} = require("../controllers/book.controller.js");
const auth = require("../middlewares/auth.middleware.js");

const admin = require("../middlewares/admin.middleware.js");

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", [auth, admin], createBook);

module.exports = router;
