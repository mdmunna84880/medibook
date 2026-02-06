const Joi = require("Joi");

const appointmentSchema = Joi.object({
  doctorId: Joi.string().hex().length(24),
  appointmentAt: Joi.date().greater("now").required(),
  comments: Joi.string().max(500).allow("", null),
  report: Joi.object({
    fileUrl: Joi.string()
      .uri({ scheme: ["http", "https"] })
      .required(),
    fileType: Joi.string().lowercase().valid("pdf").required(),
    uploadedAt: Joi.date().required(),
  })
    .and("fileUrl", "fileType", "uploadedAt")
    .optional(),

  status: Joi.string().valid("booked", "pending").default("booked"),
});

module.exports = { appointmentSchema };
