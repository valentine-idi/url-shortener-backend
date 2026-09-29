const mongoose = require("mongoose");

function dbConnect() {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
}

module.exports = dbConnect;
