const Joi = require("joi");

const appointmentSchema = Joi.object({
  doctorId: Joi.string().hex().length(24).required(),
  appointmentAt: Joi.date().greater("now").required(),
  comments: Joi.string().max(500).allow("", null),
  status: Joi.string().valid("booked", "pending").default("booked"),
});

module.exports = { appointmentSchema };
