const express = require("express");
const router = express.Router();
const lectureControllers = require("../controllers/lecture");

router.post("/create", lectureControllers.create);

module.exports = router;
