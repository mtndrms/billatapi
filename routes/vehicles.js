const express = require("express");
const Vehicle = require("../models/Vehicle");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/vehicle", async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.query.vehicleId,
    });
    res.json(vehicle);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const vehicle = new Vehicle({
      capacity: req.body.capacity,
    });
    const newVehicle = await vehicle.save();
    res.json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/", async (req, res) => {
  try {
    const deleted = Vehicle.findByIdAndDelete(req.params.vehicleId);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
