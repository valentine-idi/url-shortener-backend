const express = require("express");
const cors = require("cors");
const linksRoute = require("../routes/links");
const redirectRoute = require("../routes/redirect");
const usersRoute = require("../routes/users");
const errors = require("../middlewares/errors");

function routes(app) {
  const allowedOrigins = ["http://localhost:5173"];
  //json body parser
  app.use(express.json());

  //allow cors from frontend
  app.use(cors({ origin: allowedOrigins }));

  //routes
  app.use("/api/links", linksRoute);
  app.use("/api/users", usersRoute);
  app.use("/", redirectRoute);

  //error handler
  app.use(errors);
}

module.exports = routes;
