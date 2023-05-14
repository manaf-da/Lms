const express = require("express");
const dbConnect = require("./config/dbConnect");
const { notFound, handleError } = require("./middlewares/errorHandler");

const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

app.use(notFound);
app.use(handleError);
app.use(morgan("dev"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
