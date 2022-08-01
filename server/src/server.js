// imports
const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");
const { loadPlanets } = require("./models/planets.model");
// setting up port
const PORT = 8000;

// setting up server
const server = http.createServer(app);

// to check if connection is established or not
mongoose.connection.once("open", () => {
  console.log("Connect to mongo is established");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

// setting up the connections
async function startServer() {
  // setting up mongodb connection
  await mongoose.connect(
    "mongodb+srv://nasa-api:STtAB2xHnlqE8OIu@nasacluster.255y8m1.mongodb.net/nasa?retryWrites=true&w=majority"
  ),
    {
      // we need to specify 4 properties, and if error is there remove the properties
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
  await loadPlanets();

  // listening
  server.listen(PORT, () => {
    console.log(`${PORT} is Listening`);
  });
}
// starting the server
startServer();
