const mongoose = require("mongoose");
const logger = require("../logger/logger");

function dbConnect() {
  mongoose
    .connect(process.env.DB)
    .then(() => logger.info("Connected to database"))
    .catch((err) =>
      logger.error("Error Connecting to MongoDB", {
        message: err.message,
        stack: err.stack,
      }),
    );
}

module.exports = dbConnect;
