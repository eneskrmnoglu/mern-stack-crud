const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: false,
  },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
