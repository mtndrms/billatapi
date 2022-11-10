const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// IMPORT ROUTES
const customersRoute = require("./routes/customers");
const ticketsRoute = require("./routes/tickets");
const tripsRoute = require("./routes/trips");
const stationsRoute = require("./routes/stations");
const routesRoute = require("./routes/routes");
const carriersRoute = require("./routes/carriers");
const vehiclesRoute = require("./routes/vehicles");

// ROUTES
app.use("/customers", customersRoute);
app.use("/tickets", ticketsRoute);
app.use("/trips", tripsRoute);
app.use("/stations", stationsRoute);
app.use("/routes", routesRoute);
app.use("/carriers", carriersRoute);
app.use("/vehicles", vehiclesRoute);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

let DB_USERNAME = process.env.DB_USERNAME;
let DB_PASSWORD = process.env.DB_PASSWORD;
let DB_NAME = process.env.DB_NAME;

// CONNECT TO DATABASE
mongoose.connect(
  "mongodb+srv://" +
    DB_USERNAME +
    ":" +
    DB_PASSWORD +
    "@billat.qwvjsk3.mongodb.net/" +
    DB_NAME +
    "?retryWrites=true&w=majority",
  () => {
    console.log("Successfully connected!");
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
