require("dotenv").config();
const express = require("express");
const connectToDB = require("./src/config/db");
const userRouter = require("./src/routes/user.routes");
const autherRouter = require("./src/routes/auther.routes");
const bookRouter = require("./src/routes/book.routes");
const borrowRouter = require("./src/routes/borrowBook.routes");
const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("wellcome to server");
}) 
  
 
app.use(express.json())
app.use("/api" , userRouter)
app.use("/api/authors" , autherRouter);
app.use("/api/books" , bookRouter);
app.use("/api/borrowings" , borrowRouter);

app.listen(port , async()=>{
console.log(`server is runing on http://localhost:${port}`);
try {
    await connectToDB()
    console.log("DB Connected Success");
} catch (error) {
    console.log("DB connection failld",error);
}
})