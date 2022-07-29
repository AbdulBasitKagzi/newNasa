const express = require("express");
const {
  httpgetAllLaunches,
  httppostAllLaunches,
  httpAbortLaunch,
} = require("./launches.controller");

// setting up routes
const launchesRouter = express.Router();
launchesRouter.get("/launches", httpgetAllLaunches);
launchesRouter.post("/launches", httppostAllLaunches);
launchesRouter.delete("/launches/:id", httpAbortLaunch);
// this route is for testing
launchesRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello" });
});

module.exports = { launchesRouter };
