const Service = require("../models/Service");
const uploadToCloudinary = require("../utils/cloudUpload");

// Get all services
const getAllServices = async (req, res) => {
  try {
    // Find all services
    const services = await Service.find({});

    // Response with the service even with empty array
    res.status(200).json({ success: true, services });
  } catch (err) {
    console.log("Error found in the get all services", err);
    res
      .status(500)
      .json({ success: false, msg: "Error occured inside the server" });
  }
};

// Add one service at time
const addService = async (req, res) => {
  try {
    // Get the service name, desciption and image(icon)
    const { name, description } = req.body;
    // Check the file exist or not
    if (!req.file) {
      return res.status(400).json({
        success: false,
        msg: "Service icon is required",
      });
    }
    // Upload image to cloudinary
    const uploaded = await uploadToCloudinary(req.file.path, "services/icons");
    // Create one service based on the name, service and icon
    const service = await Service.create({
      name,
      description,
      icon: uploaded.fileUrl,
    });

    res
      .status(201)
      .json({
        success: true,
        msg: "Services is created successfully",
        service,
      });
  } catch (err) {
    console.log("Error occured while adding the service", err);
    res
      .status(500)
      .json({ success: false, msg: "Error occured inside server" });
  }
};

module.exports = { addService, getAllServices };