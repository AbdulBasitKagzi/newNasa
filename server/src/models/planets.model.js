const { rejects } = require("assert");
const { parse } = require("csv-parse");
const path = require("path");
const fs = require("fs");
const planets = require("./planets.mongo");
// const result = [];

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
      .on("data", async (data) => {
        if (ishabitablePlanet(data)) {
          // using upsert to make docs in the collection
          await savePlanets(data);
        }
      })
      .on("error", (err) => {
        console.log("error", err);
        reject(err);
      })
      .on("end", async () => {
        console.log("Total planets", (await getAllPlanets()).length);
        resolve();
      });
  });
}

// function to save planets to collection in mongo
async function savePlanets(data) {
  try {
    // done with the help of upsert operation
    await planets.updateOne(
      {
        kepler_name: data.kepler_name,
      },
      { kepler_name: data.kepler_name },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log("error is there", err);
  }
}

// to get all planets from mongo
async function getAllPlanets() {
  return await planets.find(
    {},
    // to remove version and id from our response
    { __v: 0, _id: 0 }
  );
}

module.exports = {
  loadPlanets,
  getAllPlanets,
};
