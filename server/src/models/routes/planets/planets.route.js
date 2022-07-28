const express = require("express");
const { httpgetAllPlanets } = require("./planets.controller");

// setting up routes
const planetRoutes = express.Router();
planetRoutes.get("/planets", httpgetAllPlanets);

planetRoutes.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello" });
});

module.exports = { planetRoutes };
