const express = require("express");
const router = express.Router();
const courseControllers = require("../controllers/course");
const { requiresAuth } = require("../middlewares/authentication");

router.post("/create", requiresAuth, courseControllers.create);
router.get("/:id", courseControllers.find);
router.put("/edit/:id", courseControllers.update);
module.exports = router;
