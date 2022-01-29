const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  seatNumber: {
    type: Number,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  ticketCreationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
