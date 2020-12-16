const express = require("express");
const router = express.Router();
const courseControllers = require("../controllers/course");
const { requiresAuth } = require("../middlewares/authentication");

router.post("/create", requiresAuth, courseControllers.create);
router.get("/explore", courseControllers.findAllNonAuth);
router.get("/explore/:category", courseControllers.findByCategoryNonAuth);
router.get("/courses", requiresAuth, courseControllers.findAllByUser);
router.get("/content/:courseSlug", courseControllers.findBySlug);
router.get(
  "/content/validation/:courseSlug",
  courseControllers.findSingleBySlug
);
router.get(
  "/auth/content/:courseSlug",
  requiresAuth,
  courseControllers.findBySlugAuth
);
router.get("/:id", courseControllers.find);
router.put("/edit/:id", courseControllers.update);
module.exports = router;
