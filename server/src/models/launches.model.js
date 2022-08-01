// import
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
// const hello = require("./launches.mongo");
// using maps for passing of data
const launches = new Map();

// for flight number to change for each launch
let latestflightNumber = 100;
const defaultFlightNumber = 100;
// creating data for launch
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration x",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// setting object as map
// launches.set(launch.flightNumber, launch);
saveLaunches(launch);

// function to get latest flight number
async function getFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return defaultFlightNumber;
  }
  return latestLaunch.flightNumber;
}
// to check if launch with id exist
async function existLaunchwithID(launchId) {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
}

// function to save launches
async function saveLaunches(launch) {
  const planet = await planets.findOne({ kepler_name: launch.target });

  if (!planet) {
    throw new Error("Error is there");
  }
  return await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}

// function to convert launches map into array
async function getAllLaunches(launch) {
  return await launchesDatabase.find({}, { __v: 0, _id: 0 });
}

async function scheduleNewLaunch(launch) {
  const newflightNumber = (await getFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to M", "NASA"],
    flightNumber: newflightNumber,
  });
  await saveLaunches(newLaunch);
}
// to add new launch to launches map
// function addNewLaunch(launch) {
// latestflightNumber++;
// launches.set(
//   latestflightNumber,
//   Object.assign(launch, {
//     success: true,
//     upcoming: true,
//     customer: ["Zero to M", "NASA"],
//     flightNumber: latestflightNumber,
//   })
// );
// }
// to set upcoming and success false
async function abortLaunchById(launchId) {
  // const aborted = launches.get(launchId);
  // aborted.upcoming = false;
  // aborted.success = false;
  // return aborted;
  return await launchesDatabase.updateOne(
    { flightNumber: launchId },
    { upcoming: false, success: false }
  );
}
// exproting
module.exports = {
  launches,

  existLaunchwithID,
  abortLaunchById,
  getAllLaunches,
  scheduleNewLaunch,
};
