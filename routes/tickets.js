const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const Customer = require("../models/Customer");

router.get("/", async (req, res) => {
  try {
    const allTickets = await Ticket.find().populate("owner");
    res.json(allTickets);
  } catch (err) {
    res.json(err);
  }
});

// TODO: UPDATE CUSTOMER DATA WHEN TICKET SOLD!
router.post("/", async (req, res) => {
  const ticket = new Ticket({
    seatNumber: req.body.seatNumber,
    owner: req.body.owner,
  });
  const customerWhoBoughtTheTicket = await Customer.findById(ticket.owner);
  customerWhoBoughtTheTicket.ticketsOwned.push(ticket);
  await customerWhoBoughtTheTicket.updateOne({
    ticketsOwned: customerWhoBoughtTheTicket.ticketsOwned,
  });
  try {
    const newTicket = await ticket.save();
    res.json(newTicket);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.body.deleteThis);
    res.json(deleted);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
