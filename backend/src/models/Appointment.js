const {Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    appointmentAt: {
      type: Date,
      required: true
    },
    
    comments: {
      type: String
    },

    report: {
      fileUrl: String,
      fileType: String,
      uploadedAt: Date
    },

    status: {
      type: String,
      enum: ["booked", "pending"],
      default: "booked"
    }
  },
  { timestamps: true }
);

// Model for the Appointment Collection
const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;