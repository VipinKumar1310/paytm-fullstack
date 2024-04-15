const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vk22914916:3FyuHh8WZSKwnI55@cluster0.pseyjhr.mongodb.net/"
);

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
