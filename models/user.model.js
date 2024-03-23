const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  P5: {
    type: Number,
    required: true,
  },
  Reward: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("user", userSchema);
