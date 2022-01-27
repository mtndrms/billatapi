const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.get("/", (req, res) => {
  res.send("CUSTOMERS");
});

router.post("/", (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    citizenshipNumber: req.body.citizenshipNumber,
    birthDate: req.body.birthDate,
  });
  customer
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

module.exports = router;
