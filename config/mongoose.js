const mongoose = require("mongoose");

if (process.env.NODE.ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => console.log("Mongodb error!"));

db.once("open", () => console.log("Mongodb connect!"));

module.exports = db;
