const express = require("express");
const Route = require("../models/Route");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allRoutes = await Route.find();
    res.json(allRoutes);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/:routeId", async (req, res) => {
  try {
    const route = await Route.findById(req.params.routeId).populate("route");
    res.json(route);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const route = new Route({
    route: req.body.route,
  });
  try {
    const newRoute = await route.save();
    res.json(newRoute);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
