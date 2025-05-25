const Review = require("../models/review.model");
const Book = require("../models/book.model");

// Get reviews for a book
exports.getReviews = async (req, res) => {
  try {
    console.log(req.query.bookId);
    const bookId = req.query.bookId;

    if (!bookId)
      return res.status(400).json({ message: "Book ID is required" });

    const reviews = await Review.find({ bookId })
      .populate("bookId")
      .populate("userId")
      .sort({ createdAt: -1 });

    console.log(reviews);
    if (reviews.length > 0) {
      return res.status(200).json({
        message: "Reviews found",
        reviews,
        ok: true,
      });
    } else {
      return res.status(200).json({ message: "No reviews found", ok: true });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit a new review
exports.createReview = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const review = new Review({
      bookId: req.body.bookId,
      userId: req.body._id,
      rating: req.body.rating,
      text: req.body.text,
    });

    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
