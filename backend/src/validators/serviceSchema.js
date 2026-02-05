const Joi = require("Joi");

const serviceSchema = Joi.object({
  name: Joi.string().required().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(5).max(1000).required(),
  icon: Joi.object({
    fileUrl: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required(),
    fileType: Joi.string().lowercase().valid("png", "jpeg", "jpg").required(),
    uploadedAt: Joi.date().required(),
  }).required(),
});

module.exports = {serviceSchema};