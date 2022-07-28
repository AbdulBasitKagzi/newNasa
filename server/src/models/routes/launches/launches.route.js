const express = require("express");
const { getAllLaunches } = require("./launches.controller");

// setting up routes
const launchesRouter = express.Router();
launchesRouter.get("/launches", getAllLaunches);

launchesRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello" });
});

module.exports = { launchesRouter };
