const {Schema, model} = require('mongoose');

const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    specialization: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    experience: {
      type: Number,
      required: true
    },

    rating: {
      type: Number,
      min: 0,
      max: 5
    }
  },
  { timestamps: true }
);


// Model for the Doctor Collection
const Doctor = model("Doctor", doctorSchema);

module.exports = Doctor;