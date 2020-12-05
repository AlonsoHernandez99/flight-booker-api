//Requires
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { DATABASE } = require("./utils/constants");

//Init variables
const APP = express();

APP.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT,GET,DELETE, OPTIONS");
  next();
});

//Body Parser
APP.use(bodyParser.urlencoded({ extended: false }));
APP.use(bodyParser.json());

//DB Connection
mongoose
  .connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connection to MongoDB was succesfull!"))
  .catch((err) => console.error("Error in connection to MongoDB" + err));

//Routes
const flightRoutes = require("./routes/flight");

//Listen Request
APP.listen(3030, () => {
  console.log("Express Server Live Now On Port: 3030");
});

APP.use("/flight", flightRoutes);
