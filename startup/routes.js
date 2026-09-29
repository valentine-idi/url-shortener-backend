const express = require("express");
const linksRoute = require("../routes/links");
const redirectRoute = require("../routes/redirect");
const usersRoute = require("../routes/users");
const errors = require("../middlewares/errors");

function routes(app) {
  //json body parser
  app.use(express.json());

  //routes
  app.use("/api/links", linksRoute);
  app.use("/api/users", usersRoute);
  app.use("/", redirectRoute);

  //error handler
  app.use(errors);
}

module.exports = routes;
