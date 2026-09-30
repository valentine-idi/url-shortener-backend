const logger = require("./logger/logger");
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});
