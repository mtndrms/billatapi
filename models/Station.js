const mongoose = require("mongoose");

const Station = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Station", Station);
