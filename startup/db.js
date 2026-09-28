const mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("Connected to database"));
}

module.exports = dbConnect;
