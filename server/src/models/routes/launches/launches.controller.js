const {
  launches,
  addNewLaunch,
  existLaunchwithID,
  abortLaunchById,
} = require("../../launches.model");

// function to handle launches
function httpgetAllLaunches(req, res) {
  res.status(200).json(Array.from(launches.values()));
}
function httppostAllLaunches(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.launchDate ||
    !launch.rocket ||
    !launch.target
  ) {
    res.status(400).json({
      error: "Required fields are missing",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "launch not found",
    });
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;
  if (!existLaunchwithID(launchId)) {
    return res.status(400).json({
      error: "Not valid",
    });
  }
  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}
module.exports = {
  httpgetAllLaunches,
  httppostAllLaunches,
  httpAbortLaunch,
};
