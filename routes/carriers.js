const express = require("express");
const Carrier = require("../models/Carrier");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Not Accepted"), false);
    }
  },
});

router.get("/", async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.json(carriers);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/carrier", async (req, res) => {
  try {
    const carrier = await Carrier.find({
      name: req.query.name,
    });
    res.json(carrier);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/", upload.single("companyLogo"), async (req, res, next) => {
  try {
    const carrier = new Carrier({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      companyLogo: req.file.path,
    });
    const newCarrier = await carrier.save();
    res.json(newCarrier);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.delete("/", async (req, res) => {
  try {
    const deleted = Carrier.findByIdAndDelete(req.params.carrierId);
    res.json(deleted);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
