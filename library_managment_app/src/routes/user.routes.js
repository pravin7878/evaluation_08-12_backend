const express = require("express");
// middelwares
const chackAuth = require("../middelware/chackAuth")
const chackRole = require("../middelware/chackRole")
// controlers
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser, getUserById } = require("../controlers/user.controler");

const {roles} = require("../utils/contants")
const userRouter = express.Router()

// register user
userRouter.post("/auth/register"  , registerUser );

// login user
userRouter.post("/auth/login" , loginUser);

// get all user (admin only)
userRouter.get("/users" ,chackAuth , chackRole(roles.admin) , getAllUsers);

// get user by id (admin and self)
userRouter.get("/users/:id" , chackAuth , getUserById)

// update user (admin and self)
userRouter.put("/users/:id", chackAuth,  updateUser);

// delete a user (admin only)
userRouter.delete("/users/:id", chackAuth, chackRole(roles.admin) , deleteUser);

module.exports = userRouter