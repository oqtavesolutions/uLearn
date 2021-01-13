const express = require("express");
const router = express.Router();
const multer = require("multer");
const Upload = require("../library/s3");
const { requiresAuth } = require("../middlewares/authentication");

const upload = multer({});

router.post("/", requiresAuth, upload.single("thumbnail"), async (req, res) => {
  try {
    const response = await Upload(req.file);
    res
      .status(200)
      .json({
        message: "file uploaded successfully",
        file_url: response.Location,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "bad" });
  }
});
module.exports = router;
