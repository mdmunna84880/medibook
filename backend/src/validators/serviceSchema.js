const Joi = require("Joi");

const serviceSchema = Joi.object({
  name: Joi.string().required().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(5).max(1000).required(),
  icon: Joi.string().uri().required(),
});

module.exports = {serviceSchema};