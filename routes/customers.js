const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// Get all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get customer by it's citizenship number
router.get("/customer", async (req, res) => {
  try {
    const customer = await Customer.findOne({
      cn: req.query.citizenshipNumber,
    });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Create customer
router.post("/", async (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    citizenshipNumber: req.body.citizenshipNumber,
    birthDate: req.body.birthDate,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  });
  try {
    const newCustomer = await customer.save();
    res.json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/", async (req, res) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({
      citizenshipNumber: req.query.citizenshipNumber,
    });
    res.json(deletedCustomer);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
