// imports
const express = require("express");
const { planetRoutes } = require("./models/routes/planets/planets.route");
const cors = require("cors");
const path = require("path");
const { launchesRouter } = require("./models/routes/launches/launches.route");

// setting up express
const app = express();

// setting up middleware
// to allow localhost 3000 to make request to localhost 8000 as our server is running on 8000
// cors is a part of middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
// using routes as middlewares
app.use(planetRoutes);
app.use(launchesRouter);

// serving index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
// exporting
module.exports = app;
