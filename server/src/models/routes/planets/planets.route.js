const express = require("express");
const { getAllPlanets } = require("./planets.controller");

// setting up routes
const planetRoutes = express.Router();
planetRoutes.get("/planets", getAllPlanets);

planetRoutes.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello" });
});

module.exports = { planetRoutes };
