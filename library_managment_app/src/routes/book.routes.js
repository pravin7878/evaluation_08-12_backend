const express = require("express");
const bookRouter = express.Router();
const { checkAuth } = require("../middelware/chackAuth");
const { checkRole } = require("../middelware/checkRole");
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controlers/book.controler");
const { roles } = require("../utils/contants");

// create a new book (admin only)
bookRouter.post("/", checkAuth, checkRole(roles.admin), createBook);

// retrieve all books with optional filters and pagination
bookRouter.get("/", getAllBooks);

// retrieve book by ID
bookRouter.get("/:id", getBookById);

// update book details (admin only)
bookRouter.put("/:id", checkAuth, checkRole("Admin"), updateBook);

// delete a book (admin only)
bookRouter.delete("/:id", checkAuth, checkRole("Admin"), deleteBook);

module.exports = bookRouter;
