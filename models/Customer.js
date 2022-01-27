const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
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
  dateAccountCreated: {
    type: Date,
    default: Date.now,
  },
  isAccountActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
