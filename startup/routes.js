const express = require("express");
const linksRoute = require("../routes/links");
const redirectRoute = require("../routes/redirect");

function routes(app) {
  //json body parser
  app.use(express.json());

  //routes
  app.use("/api/links", linksRoute);
  app.use("/", redirectRoute);
}

module.exports = routes;
