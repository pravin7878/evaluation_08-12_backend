const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { username, password, name, email, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "email already register" });
    const hashPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND)
    );
    const newUser = new User({
      username,
      password: hashPassword,
      name,
      email,
      role,
    });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "registeration success",
      user: {
        username: savedUser.username,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "registeration failed" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "user not found" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res.status(404).json({ message: "password is wrong!" });
    const token = jwt.sign(
      {
        username: user.username,
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(201).json({
      message: "Login success",
      user: { username, userId: user._id, role: user.role, token },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "login failed" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// Controller to retrieve a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the requester is the user themselves or an Admin
    if (req.user.role !== "Admin" && req.user.userId !== id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to update a user's information
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    // Check if the requester is the user themselves or an Admin
    if (req.user.role !== "Admin" && req.user.userId !== id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUND)
    );

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller to delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Only Admin can delete a user
    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
