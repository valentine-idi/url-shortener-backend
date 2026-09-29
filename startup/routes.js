const express = require("express");
const linksRoute = require("../routes/links");
const redirectRoute = require("../routes/redirect");
const usersRoute = require("../routes/users");

function routes(app) {
  //json body parser
  app.use(express.json());

  //routes
  app.use("/api/links", linksRoute);
  app.use("/api/users", usersRoute);
  app.use("/", redirectRoute);
}

module.exports = routes;
