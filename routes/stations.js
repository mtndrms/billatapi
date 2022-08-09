const express = require("express");
const Station = require("../models/Station");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allStations = await Station.find();
    res.json(allStations);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const stations = req.body;
  let newStation;
  let isErrorOccured;
  for (let index = 0; index < stations.length; index++) {
    let current = req.body[index];
    const station = new Station({
      city: current.city,
      code: current.code,
      plate: current.plate,
      name: `${current.city}-${current.plate}-${current.code}`,
      latitude: current.latitude,
      longitude: current.longitude,
      counties: current.counties,
    });
    try {
      newStation = await station.save();
    } catch (err) {
      isErrorOccured = 1;
    }
  }
  isErrorOccured
    ? res.status(400).json({ message: newStation })
    : res.status(200).json({ message: "success" });
});

module.exports = router;
