const User = require("../models/user.model");
const response = require("../utils/response");
const Reward = require("../models/rewards.model");
const validate = require("../utils/validation");

//? This controller is to create a new user
const createUser = async (req, res) => {
  try {
    const { name, P5 } = req.body;
    let data = new User({
      name: name,
      P5: P5,
    });
    await data.save();
    return response.successfullyCreatedResponse(res, data);
  } catch (error) {
    res.json(error);
  }
};

//? This controller will return list of all the transaction and user balance
const readAllUser = async (req, res) => {
  try {
    let users = await Reward.find().populate(["GivenTo", "GivenBy"]);
    if (users.length == 0) {
      return response.notFoundResponse(res);
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//? this controller will return data of a specific user
const readAnUser = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await Reward.find({
      $or: [{ GivenTo: id }, { GivenBy: id }],
    }).populate(["GivenTo", "GivenBy"]);
    if (data.length == 0) {
      return response.notFoundResponse(res);
    }
    return response.successResponse(res, data);
  } catch (error) {
    return response.badRequestResponse(res, "Somethings Missing");
  }
};

//? this controller will revert the reward of the reward id
const rewardRevert = async (req, res) => {
  try {
    let data = await Reward.findById(req.params.id);
    let to = await User.findById(data.GivenBy);
    to.P5 += data.reward;
    let from = await User.findById(data.GivenTo);
    from.Reward -= data.reward;
    await from.save();
    await to.save();
    await data.deleteOne();
    res.json(data);
  } catch (error) {
    return response.badRequestResponse(res, "Somethings Missing");
  }
};

//? this controller managed the transfer of rewards
const updateReward = async (req, res) => {
  try {
    let giveby = req.params.id;
    let giveto = req.body.to_id;
    let P5 = req.body.P5;
    if (P5 > 100) {
      return response.badRequestResponse(res, "P5 should not be more than 100");
    }
    let data = new Reward({
      GivenBy: giveby,
      GivenTo: giveto,
      reward: P5,
    });
    await data.save();
    let from = await User.findById(giveby);
    if (P5 > from.P5) {
      return response.badRequestResponse(res, "Insufficient Blance");
    }
    from.P5 -= P5;
    from.save();
    let to = await User.findById(giveto);
    to.Reward += P5;
    to.save();
    return response.successResponse(res, data);
  } catch (error) {
    return response.badRequestResponse(res, "P5 should not be more than 100");
  }
};

//? this controller will update the user
const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await User.findById(id);
    data.name = req.body.name;
    await data.save();
    res.status(200).json({ mesasage: data });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  rewardRevert,
  updateReward,
  createUser,
  readAnUser,
  readAllUser,
  updateUser,
};
