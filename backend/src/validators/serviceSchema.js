const Joi = require("joi");

const serviceSchema = Joi.object({
  name: Joi.string().required().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(5).max(1000).required(),
});

module.exports = {serviceSchema};