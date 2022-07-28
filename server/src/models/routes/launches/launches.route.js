const express = require("express");
const { httpgetAllLaunches } = require("./launches.controller");

// setting up routes
const launchesRouter = express.Router();
launchesRouter.get("/launches", httpgetAllLaunches);

launchesRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello" });
});

module.exports = { launchesRouter };
