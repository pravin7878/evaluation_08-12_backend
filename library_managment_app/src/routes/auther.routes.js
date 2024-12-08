const express = require("express");

// middelwares
const chackAuth = require("../middelware/chackAuth")
const chackRole = require("../middelware/chackRole");
const { roles } = require("../utils/contants");
const { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor } = require("../controlers/auther.controler");

const autherRouter = express.Router()

// create a new auther (admin only)
autherRouter.post("/" , chackAuth , chackRole(roles.admin) , createAuthor)

// get all authers (all)
autherRouter.get("/" , getAllAuthors)

// get auther by id
autherRouter.get("/:id" , getAuthorById)

// update auther by id (admin only)
autherRouter.put("/:id" ,chackAuth , chackRole(roles.admin), updateAuthor)

// delete auther (admin only)
autherRouter.delete("/:id" ,chackAuth , chackRole(roles.admin), deleteAuthor )


module.exports = autherRouter