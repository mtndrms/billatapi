const mongoose = require("mongoose");

const Customer = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  citizenshipNumber: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateAccountCreated: {
    type: Date,
    default: Date.now,
  },
  isAccountActive: {
    type: Boolean,
    default: true,
  },
  ticketsBought: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
    },
  ],
});

module.exports = mongoose.model("Customer", Customer);
