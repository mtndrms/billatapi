const mongoose = require("mongoose");

const Route = mongoose.Schema({
  route: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Station",
    },
  ],
});

module.exports = mongoose.model("Route", Route);
