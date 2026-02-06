const User = require("../models/User");
const uploadToCloudinary = require("../utils/cloudUpload");

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

    res.status(200).json({
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
      address: {
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        nationality: address.nationality,
        zipCode: address.zipCode,
      },
      runValidators: true,
      new: true,
    });

    // Response wiht the updated data
    res.status(200).json({
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

// Update profile image means avatar
const updateAvatar = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check file whether exist or not
    if (!req.file) {
      return res.status(400).json({
        success: false,
        msg: "Profile image is required",
      });
    }

    // Upload to cloudinary and transform in way that face will be there and crop if larger than 200*200
    const uploaded = await uploadToCloudinary(req.file.path, "users/avatars", {
      transformation: [
        {
          width: 200,
          height: 200,
          crop: "fill",
          gravity: "face",
        },
        {
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    });

    // Update user profile
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar: uploaded.fileUrl },
      { new: true },
    );

    // check if user is there
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User is not available",
      });
    }

    res.status(200).json({
      success: true,
      avatar: user.avatar,
    });
  } catch (err) {
    console.error("Error occured inside the update profile/avatar:", err);

    res
      .status(500)
      .json({ success: false, msg: "Error occured inside server" });
  }
};

module.exports = { getPatientDetails, editPatientInfo, updateAvatar };
