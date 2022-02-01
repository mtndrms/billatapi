const express = require("express");
const Trip = require("../models/Trip");
const router = express.Router();

// Get all trips
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get trip by it's ID
router.get("/:tripId", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId);
    res.json(trip);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get trip(s) by it's (their) departure locations and destination locations
router.get("/loc", async (req, res) => {
  try {
    const result = await Trip.find({
      dep: req.query.departureLocation,
      des: req.query.destinationLocation,
    });
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Create trip
router.post("/", async (req, res) => {
  const trip = new Trip({
    departureDate: req.body.departureDate,
    arrivalDate: req.body.arrivalDate,
    departureLocation: req.body.departureLocation,
    destinationLocation: req.body.destinationLocation,
    // travelTime: arrivalDate - departureDate,
    route: req.body.route,
    price: req.body.price,
  });
  try {
    const newTrip = await trip.save();
    res.json(newTrip);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Delete trip by it's ID
router.delete("/", async (req, res) => {
  try {
    const deletedTrip = await Trip.findByIdAndDelete(req.query.tripId);
    res.json(deletedTrip);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// TODO: Delete trip(s) by it's (their) ID's
