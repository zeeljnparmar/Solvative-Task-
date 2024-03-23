const User = require("../models/user.model");
const { userAuth } = require("../utils/validation");
const response = require("../utils/response");

const updateUser = async (req, res, next) => {
  try {
    let data = req.body.name;
    let user = await User.findOne({ name: data });
    if (user) {
      return response.unauthorizedResponse(res);
    } else {
      next();
    }
  } catch (error) {
    return response.badRequestResponse(res, "Bad request Body");
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    if (user) {
      next();
    } else {
      return response.unauthorizedResponse(res);
    }
  } catch (error) {
    return response.badRequestResponse(res, "Bad request Body");
  }
};

const createUserValidation = async (req, res, next) => {
  try {
    const result = await userAuth.validateAsync(req.body);
    let data = await User.findOne({ name: req.body.name });
    if (data == null || data.length == 0) {
      next();
    } else {
      return res.status(201).json({
        message: "User Already Exists",
      });
    }
  } catch (error) {
    return response.badRequestResponse(res, "P5 should not be more than 100");
  }
};

module.exports = {
  createUserValidation,
  authenticateUser,
  updateUser,
};
