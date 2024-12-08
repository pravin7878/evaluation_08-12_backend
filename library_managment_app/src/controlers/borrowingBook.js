const BorrowingTransaction = require("../models/borrowTransition.model");
const Book = require("../models/book.model"); 
const User = require("../models/user.model"); 

// POST /api/borrowings - Borrow a book
const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = req.user; 

    // Find the book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if there are available copies
    if (book.copiesAvailable < 1) {
      return res.status(400).json({ message: "No copies available" });
    }

    // Decrease available copies of the book
    book.copiesAvailable -= 1;
    await book.save();

    // Create a new borrowing transaction
    const newTransaction = new BorrowingTransaction({
      book: bookId,
      user: user._id,
      borrowDate: new Date(),
      status: "borrowed",
    });
    const savedTransaction = await newTransaction.save();

    // Add book to the user's borrowedBooks
    user.borrowedBooks.push(bookId);
    await user.save();

    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/borrowings - Retrieve all borrowing transactions (Admin only)
const getAllBorrowingTransactions = async (req, res) => {
  try {
    const transactions = await BorrowingTransaction.find()
      .populate("book")
      .populate("user");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/borrowings/my - Retrieve borrowing history of the logged-in member
const getMyBorrowingHistory = async (req, res) => {
  try {
    const user = req.user;
    const transactions = await BorrowingTransaction.find({ user: user._id })
      .populate("book")
      .populate("user");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/borrowings/:id/return - Return a borrowed book
const returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user; 

    // Find the borrowing transaction
    const transaction = await BorrowingTransaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if the transaction is already returned
    if (transaction.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    // Update transaction status and returnDate
    transaction.status = "returned";
    transaction.returnDate = new Date();
    await transaction.save();

    // Find the book and increase the available copies
    const book = await Book.findById(transaction.book);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.copiesAvailable += 1;
    await book.save();

    // Remove book from the user's borrowedBooks
    user.borrowedBooks.pull(book._id);
    await user.save();

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  borrowBook,
  getAllBorrowingTransactions,
  getMyBorrowingHistory,
  returnBook,
};
