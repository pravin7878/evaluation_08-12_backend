const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    ISBN: {
      type: String,
      unique: true,
      required: [true, "ISBN is required"],
    },
    summary: {
      type: String,
    },
    publicationDate: {
      type: Date,
    },
    genres: [
      {
        type: String,
      },
    ],
    copiesAvailable: {
      type: Number,
      default: 1,
      min: [0, "Copies available cannot be less than 0"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: [true, "Author is required"],
    },
    borrowedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
