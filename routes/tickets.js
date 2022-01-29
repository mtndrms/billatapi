const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

router.get("/", async (req, res) => {
  try {
    const allTickets = await Ticket.find();
    res.json(allTickets);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const ticket = new Ticket({
    seatNumber: req.body.seatNumber,
    owner: req.body.owner,
  });
  try {
    const newTicket = await ticket.save();
    res.json(newTicket);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
