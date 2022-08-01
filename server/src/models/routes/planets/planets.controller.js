// making imports
const { getAllPlanets } = require("../../planets.model");

// setting up function to get planets
async function httpgetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
}

// exporting functions
module.exports = {
  httpgetAllPlanets,
};
