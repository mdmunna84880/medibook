const {Schema, model} = require('mongoose');

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      select: false,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    googleId: {
      type: String,
      index: true,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
    address: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      nationality: String,
      zipCode: String,
    },
  },
  { timestamps: true },
);

// Model for the User Collection
const User = model("User", userSchema);

module.exports = User;