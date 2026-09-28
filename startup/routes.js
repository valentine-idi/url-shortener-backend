const express = require("express");
const linksRoute = require("../routes/links");

function routes(app) {
  //json body parser
  app.use(express.json());

  //routes
  app.use("/api/links", linksRoute);
}

module.exports = routes;
