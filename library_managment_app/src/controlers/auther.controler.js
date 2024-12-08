const Author = require("../models/auther.model"); 
const Book = require("../models/book.model"); 

// POST /api/authors - Create a new author
const createAuthor = async (req, res) => {
  try {
    const { name, biography, dateOfBirth, nationality } = req.body;

    const newAuthor = new Author({
      name,
      biography,
      dateOfBirth,
      nationality,
    });

    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/authors - Retrieve all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/authors/:id - Retrieve author by ID
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await Author.findById(id).populate("books");
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/authors/:id - Update author information
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, biography, dateOfBirth, nationality } = req.body;

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { name, biography, dateOfBirth, nationality },
      { new: true, runValidators: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/authors/:id - Delete an author
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
