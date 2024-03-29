const mongoose = require("mongoose");

const Trip = mongoose.Schema({
  departureDate: {
    type: Date,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  departureLocation: {
    type: mongoose.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  destinationLocation: {
    type: mongoose.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  travelTime: {
    type: Number,
    default: 0,
  },
  carrier: {
    type: mongoose.Types.ObjectId,
    ref: "Carrier",
    required: true,
  },
  route: {
    type: mongoose.Types.ObjectId,
    ref: "Route",
    required: true,
  },
  vehicle: {
    type: mongoose.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Trip", Trip);
