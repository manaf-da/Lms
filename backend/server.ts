import { connect } from "http2";
import { app } from "./app";
import connectDatabase from "./utils/database";
require("dotenv").config();
import { v2 as cloudinary } from "cloudinary";

/* cloudinary config */

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

/* create server */
app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
  connectDatabase();
});
