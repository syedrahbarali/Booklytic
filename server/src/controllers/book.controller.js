const Book = require("../models/book.model");

// Get all books with pagination
exports.getAllBooks = async (req, res) => {
  try {
    console.log(req.query);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments();

    res.status(200).json({
      books,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific book
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("addedBy");
    if (!book) return res.status(404).json({ message: "Book not found" });

    return res.status(200).json({ message: "Book found", book, ok: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new book (admin only)
exports.createBook = async (req, res) => {
  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      publishedYear: req.body.publishedYear,
      isbn: req.body.isbn,
      addedBy: req.body._id,
      genre: req.body.genre,
    });

    const newBook = await book.save();
    if (newBook?._id) {
      return res.status(201).json({
        message: "Book created successfully",
        book: newBook,
        ok: true,
      });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
