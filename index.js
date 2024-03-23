//? all the requires to get the neccessary packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoFunction = require("./config/mongodb");
const env = process.env.NODE_ENV || "environment";

//? Importing routers
const userRouter = require("./router/use.route");

if (env === "environment") {
  require("dotenv/config");
}

const app = express();

//?intializing body-Parser to send data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//? connecting database
mongoFunction.connectMongo();

//?redirecting URL to user Router
app.use("/user", userRouter);

//? Making server listen to incoming requests
let port = process.env.PORT || 8088;
app.listen(port, () => {
  console.log("server running at", process.env.PORT);
});
