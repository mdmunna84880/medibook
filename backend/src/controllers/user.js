const User = require("../models/User");

// Get patient details.
const getPatientDetails = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      res
        .status(404)
        .json({ success: false, msg: "Patient details not found." });
      return;
    }

    res
      .status(200)
      .json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          address: user.address,
        },
      });
  } catch (err) {
    console.log("Error is found in the Get Patients Details");
    res
      .status(500)
      .json({ success: false, msg: "Error occured in the server" });
  }
};

// Edit address only
const editPatientInfo = async (req, res) => {
  try {
    // Get the user id
    const userId = req.user.userId;
    // Get phone and address from the body
    const { phone, address } = req.body;

    // Find the patient with the login user id and update there address only
    const user = await User.findByIdAndUpdate(userId, {
      phone: phone,
      address: { addressLine1: address.addressLine1, addressLine2: address.addressLine2, city: address.city, state: address.state, nationality: address.nationality, zipCode: address.zipCode},
      runValidators: true,
      new: true
    });

    // Response wiht the updated data
    res
      .status(200)
      .json({
        status: true,
        user: {
          id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          address: user.address,
        },
      });
  } catch (err) {
    console.log("Error found in the Edit address");
    res.status(500).json({ status: false, msg: "Error occured in the server" });
  }
};

module.exports = { getPatientDetails, editPatientInfo };
