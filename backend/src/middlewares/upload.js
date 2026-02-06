const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create temporary file to handle file uploading
const uploadDir = "uploads/tmp";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const filename =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;

    cb(null, filename);
  },
});

// Validate file
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Set limit to 10 mb for file
const limits = {
  fileSize: 10 * 1024 * 1024,
};

// Create a multer instance to upload image first in server
const upload = multer({
  storage,
  fileFilter,
  limits,
});


module.exports = {
  uploadAvatar: upload.single("avatar"),
  uploadServiceIcon: upload.single("icon"),
  uploadReport: upload.single("report"),
};
