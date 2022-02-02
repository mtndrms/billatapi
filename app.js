const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// IMPORT ROUTES
const customersRoute = require("./routes/customers");
const ticketsRoute = require("./routes/tickets");
const tripsRoute = require("./routes/trips");
const stationsRoute = require("./routes/stations");

// ROUTES
app.use("/customers", customersRoute);
app.use("/tickets", ticketsRoute);
app.use("/trips", tripsRoute);
app.use("/stations", stationsRoute);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// CONNECT TO DATABASE
mongoose.connect("mongodb://127.0.0.1:27017/billatdb", () => {
  console.log("Successfully connected!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
