const express = require("express");
const router = express.Router();
const lectureControllers = require("../controllers/lecture");

router.post("/course/:id/create", lectureControllers.create);
router.get("/course/:id", lectureControllers.findAllByCourse);
router.get("/:id", lectureControllers.find);
router.put("/edit/:id", lectureControllers.update);

module.exports = router;
