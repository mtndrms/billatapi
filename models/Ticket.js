const mongoose = require("mongoose");

const Ticket = mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
  },
  ticketCreationDate: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  trip: {
    type: mongoose.Types.ObjectId,
    ref: "Trip",
    required: true,
  },
});

module.exports = mongoose.model("Ticket", Ticket);
