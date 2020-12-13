const express = require("express");

const router = express.Router();
const lectureControllers = require("../controllers/lecture");
const { requiresAuth } = require("../middlewares/authentication");

router.post("/course/:id/create", requiresAuth, lectureControllers.create);
router.get("/course/:id", requiresAuth, lectureControllers.findAllByCourse);
router.get(
  "/course/:courseId/:lectureId",
  requiresAuth,
  lectureControllers.findByCourseAndLectureId
);
router.get("/:id", requiresAuth, lectureControllers.find);
router.get(
  "/auth/content/:lectureSlug",
  requiresAuth,
  lectureControllers.findBySlugAuth
);
router.put(
  "/edit/course/:courseId/:lectureId",
  requiresAuth,
  lectureControllers.update
);

module.exports = router;
