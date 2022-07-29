// using maps for passing of data
const launches = new Map();

// for flight number to change for each launch
let latestflightNumber = 100;
// creating data for launch
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration x",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

// setting object as map
launches.set(launch.flightNumber, launch);

// to check if launch with id exist
function existLaunchwithID(launchId) {
  return launches.has(launchId);
}
// to add new launch to launches map
function addNewLaunch(launch) {
  latestflightNumber++;
  launches.set(
    latestflightNumber,
    Object.assign(launch, {
      success: true,
      upcoming: true,
      customer: ["Zero to M", "NASA"],
      flightNumber: latestflightNumber,
    })
  );
}
// to set upcoming and success false
function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}
// exproting
module.exports = {
  launches,
  addNewLaunch,
  existLaunchwithID,
  abortLaunchById,
};
