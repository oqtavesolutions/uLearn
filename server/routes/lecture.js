const express = require("express");
const router = express.Router();
const lectureControllers = require("../controllers/lecture");

router.post("/create", lectureControllers.create);
router.get("/:id", lectureControllers.find);
router.put("/edit/:id", lectureControllers.update);

module.exports = router;
