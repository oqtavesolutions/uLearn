const express = require("express");
const router = express.Router();
const lectureController = require("../controllers/lecture");

router.post("/create", lectureController.createLecture);

module.exports = router;
