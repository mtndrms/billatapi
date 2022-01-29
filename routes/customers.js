const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// Find all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.json({ message: err });
  }
});

// Create customer
router.post("/", async (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    citizenshipNumber: req.body.citizenshipNumber,
    birthDate: req.body.birthDate,
  });
  try {
    const newCustomer = await customer.save();
    res.json(newCustomer);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
