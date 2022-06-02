const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    default: 0,
  },
  CurrentGame: {
    type: Object,
    default: 0,
  },
  Games: {
    type: Array,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;