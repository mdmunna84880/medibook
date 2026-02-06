const cloudinary = require("../config/cloudinary");
const fs = require("fs");

// Upload file to cloudinary
const uploadToCloudinary = async (
  filePath,
  folder = "general",
  options = {},
) => {
  try {
    // Options to change something in file
    const uploadOptions = {
      folder,
      resource_type: "auto",
      ...options,
    };

    const result = await cloudinary.uploader.upload(filePath, uploadOptions);

    // Delete the temporary file after uploading
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Return the url, file type and pulic id
    return {
      fileUrl: result.secure_url,
      fileType: result.format,
      publicId: result.public_id,
      uploadedAt: new Date(),
    };
  } catch (error) {
    // Delete the temporary file if exist before throwing error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw error;
  }
};

module.exports = uploadToCloudinary;
