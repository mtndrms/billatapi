const mongoose = require("mongoose");

const Vehicle = mongoose.Schema({
  capacity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Vehicle", Vehicle);
