const { launches } = require("../../launches.model");

// function to handle launches
function httpgetAllLaunches(req, res) {
  res.status(200).json(Array.from(launches.values()));
}

module.exports = {
  httpgetAllLaunches,
};
