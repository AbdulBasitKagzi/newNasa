const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  kepler_name: {
    type: String,
    required: true,
  },
});

// creating model from schema
// Planet is the collection name and it will become "planets" in mongodb
module.exports = mongoose.model("Planet", planetsSchema);
