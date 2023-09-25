const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  User_id: {
    type: String,
    index: true,
    required: true,
  },
  User_password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", usersSchema);
