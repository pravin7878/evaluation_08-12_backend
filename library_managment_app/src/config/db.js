const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const connectToDB = ()=>{
     const connection = mongoose.connect(`${MONGO_URI}/library_managment`)
     return connection
}


module.exports = connectToDB