import { connect } from "http2";
import { app } from "./app";
import connectDatabase from "./utils/database";
require("dotenv").config();

/* create server */
app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
  connectDatabase();
});
