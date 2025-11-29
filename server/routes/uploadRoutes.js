const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// nơi lưu ảnh
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads")); 
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  console.log("UPLOAD FILE:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "Upload failed! req.file = null" });
  }

  res.json({
    image: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;
