const express = require("express");
const Trip = require("../models/Trip");
const router = express.Router();

// a and b are javascript Date objects
function calculateTravelTime(a, b) {
  const aDate = new Date(a);
  const bDate = new Date(b);

  // Discard the time and time-zone information.
  const utc1 = Date.UTC(
    aDate.getFullYear(),
    aDate.getMonth(),
    aDate.getDate(),
    aDate.getHours(),
    aDate.getMinutes()
  );
  const utc2 = Date.UTC(
    bDate.getFullYear(),
    bDate.getMonth(),
    bDate.getDate(),
    bDate.getHours(),
    bDate.getMinutes()
  );

  return Math.floor((utc2 - utc1) / (1000 * 60));
}

// Get all trips
router.get("/", async (req, res) => {
  try {
    const trips = await Trip.find().populate(
      "departureLocation destinationLocation carrier route vehicle"
    );
    res.json(trips);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get trip by it's ID
router.get("/:tripId", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.tripId).populate(
      "route departureLocation destinationLocation carrier vehicle"
    );
    res.json(trip);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Get trip(s) by it's (their) departure locations and destination locations
router.get("/loc", async (req, res) => {
  console.log(req.query);
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
    travelTime: calculateTravelTime(
      req.body.departureDate,
      req.body.arrivalDate
    ),
    carrier: req.body.carrier,
    route: req.body.route,
    vehicle: req.body.vehicle,
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

module.exports = router;
