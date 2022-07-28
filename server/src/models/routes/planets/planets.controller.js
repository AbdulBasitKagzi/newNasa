// making imports
const { planets } = require("../../planets.model");

// setting up function to get planets
function getAllPlanets(req, res) {
  return res.status(200).json(planets);
}

// exporting functions
module.exports = {
  getAllPlanets,
};
