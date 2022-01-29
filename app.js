const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// IMPORT ROUTES
const customersRoute = require("./routes/customers");
app.use("/customers", customersRoute);

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// CONNECT TO DATABASE
mongoose.connect("mongodb://127.0.0.1:27017", () => {
  console.log("Successfully connected!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
