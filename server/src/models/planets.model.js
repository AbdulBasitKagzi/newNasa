const { rejects } = require("assert");
const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");

const result = [];

function ishabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
function loadPlanets() {
  new Promise((resolve, reject) => {
    return fs
      .createReadStream(
        path.join(__dirname, "..", "..", "data", "kepler_data.csv")
      )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (ishabitablePlanet(data)) {
          result.push(data);
        }
      })
      .on("error", (err) => {
        console.log("error", err);
        reject(err);
      })
      .on("end", () => {
        console.log("Total planets", result.length);
        resolve();
      });
  });
}

module.exports = {
  loadPlanets,
  planets: result,
};
