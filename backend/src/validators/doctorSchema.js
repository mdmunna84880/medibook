const Joi = require('joi');

const doctorSchema = Joi.object({
    name: Joi.string().required(),
    specialization: Joi.string().required(),
    department: Joi.string().required(),
    experience: Joi.number().required(),
    rating: Joi.number().min(0).max(5)
});

module.exports = {doctorSchema};