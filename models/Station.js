const mongoose = require("mongoose");

const Station = mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  plate: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  counties: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Station", Station);
