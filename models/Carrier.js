const mongoose = require("mongoose");

const Carrier = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Carrier", Carrier);
