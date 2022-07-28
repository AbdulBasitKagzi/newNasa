async function httpGetPlanets() {
  // TODO: Once API is ready.
  const response = await fetch("http://localhost:8000/planets");
  return await response.json();
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  const response = await fetch("http://localhost:8000/launches");
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.fligtNumber - b.fligtNumber;
  });
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
