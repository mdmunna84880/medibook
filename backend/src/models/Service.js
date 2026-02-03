const { model } = require("mongoose");

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    icon: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Service = model("Service", serviceSchema);

module.exports = Service;