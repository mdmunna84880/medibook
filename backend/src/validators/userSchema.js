const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(6)
    .max(128)
    .when("authProvider", {
      is: "local",
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  googleId: Joi.string().when("authProvider", {
    is: "google",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  phone: Joi.string()
    .pattern(/^[0-9+\-\s()]+$/)
    .min(7)
    .max(20)
    .optional(),
  address: Joi.object({
    addressLine1: Joi.string().max(255).optional(),
    addressLine2: Joi.string().max(255).optional(),
    city: Joi.string().max(100).optional(),
    state: Joi.string().max(100).optional(),
    nationality: Joi.string().max(100).optional(),
    zipCode: Joi.string().max(20).optional(),
  }).optional()
});

module.exports = {userSchema};