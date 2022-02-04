const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Customer = require("../models/Customer");

// Get all tickets
router.get("/", async (req, res) => {
  try {
    const allTickets = await Ticket.find();
    res.json(allTickets);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Create ticket and update customer data
router.post("/", async (req, res) => {
  const ticket = new Ticket({
    seatNumber: req.body.seatNumber,
    owner: req.body.owner,
    trip: req.body.trip,
  });
  const customerWhoBoughtTheTicket = await Customer.findById(ticket.owner);
  customerWhoBoughtTheTicket.ticketsBought.push(ticket);
  await customerWhoBoughtTheTicket.updateOne({
    ticketsBought: customerWhoBoughtTheTicket.ticketsBought,
  });
  try {
    const newTicket = await ticket.save();
    res.json(newTicket);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Delete ticket by it's ID
router.delete("/", async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.query.ticketId);
    res.json(deletedTicket);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
