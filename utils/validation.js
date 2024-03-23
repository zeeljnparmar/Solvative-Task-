const Joi = require("joi");

const userAuth = Joi.object({
  name: Joi.string().required(),
  P5: Joi.number().max(100).required(),
});

module.exports = {
  userAuth,
};
