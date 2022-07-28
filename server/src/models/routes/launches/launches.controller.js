const { launches } = require("../../launches.model");

// function to handle launches
function getAllLaunches(req, res) {
  res.status(200).json(Array.from(launches.values()));
}

module.exports = {
  getAllLaunches,
};
