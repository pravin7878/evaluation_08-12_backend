const express = require("express");
const borrowRouter = express.Router();
const  checkAuth  = require("../middelware/chackAuth");
const  checkRole = require("../middelware/chackRole");
const {
  borrowBook,
  getAllBorrowingTransactions,
  getMyBorrowingHistory,
  returnBook,
} = require("../controlers/borrowingBook");
const { roles } = require("../utils/contants");

// borrow a book
borrowRouter.post("/", checkAuth, checkRole(roles.menber), borrowBook);

// retrieve all borrowing transactions (Admin only)
borrowRouter.get("/", checkAuth, checkRole(roles.admin), getAllBorrowingTransactions);

// retrieve borrowing history of the logged-in member
borrowRouter.get("/my", checkAuth, checkRole(roles.menber), getMyBorrowingHistory);

// PUT return a borrowed book
borrowRouter.put("/:id/return", checkAuth, checkRole(roles.admin, roles.menber), returnBook);

module.exports = borrowRouter;
