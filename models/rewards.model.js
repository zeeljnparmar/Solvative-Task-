const { Schema, model, Types } = require("mongoose");
const User = require("./user.model");
const { number } = require("joi");

const rewardSchema = new Schema(
  {
    reward: {
      default: 0,
      type: Number,
      required: true,
    },
    GivenBy: {
      type: Types.ObjectId,
      ref: "user",
    },
    GivenTo: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
module.exports = model("Reward", rewardSchema);
