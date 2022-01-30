const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Ticket = require("../models/Ticket");

// Find all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get customer's tickets
router.get("/tickets", async (req, res) => {
  try {
    const customer = await Customer.findOne({
      citizenshipNumber: req.body.citizenshipNumber,
    }).populate("ticketsOwned");
    res.json(customer);
  } catch (err) {
    res.json(err);
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
