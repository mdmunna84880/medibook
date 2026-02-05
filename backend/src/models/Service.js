const { model, Schema } = require("mongoose");

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

// Model for the Service Collection
const Service = model("Service", serviceSchema);

module.exports = Service;