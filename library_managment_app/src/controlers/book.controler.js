const Book = require("../models/book.model"); 
const Author = require("../models/auther.model"); 

// POST /api/books - Add a new book
const createBook = async (req, res) => {
  try {
    const {
      title,
      ISBN,
      summary,
      publicationDate,
      genres,
      copiesAvailable,
      authorId,
    } = req.body;

    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newBook = new Book({
      title,
      ISBN,
      summary,
      publicationDate,
      genres,
      copiesAvailable,
      author: authorId,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/books - Retrieve all books
const getAllBooks = async (req, res) => {
  try {
    const { author, genre, title, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (author) filter.author = author;
    if (genre) filter.genres = { $in: [genre] };
    if (title) filter.title = { $regex: title, $options: "i" };

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("author");

    const totalBooks = await Book.countDocuments(filter);

    res.status(200).json({
      books,
      pagination: {
        page,
        limit,
        totalBooks,
        totalPages: Math.ceil(totalBooks / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/books/:id - Retrieve book by ID
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id).populate("author");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/books/:id - Update book information
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, publicationDate, genres, copiesAvailable } =
      req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, summary, publicationDate, genres, copiesAvailable },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/books/:id - Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
