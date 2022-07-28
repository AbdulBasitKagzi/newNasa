// imports
const { stat } = require("fs");
const http = require("http");
const app = require("./app");
const { loadPlanets } = require("./models/planets.model");
// setting up port
const PORT = 8000;

// setting up server
const server = http.createServer(app);

async function startServer() {
  await loadPlanets();

  // listening
  server.listen(PORT, () => {
    console.log(`${PORT} is Listening`);
  });
}
startServer();
