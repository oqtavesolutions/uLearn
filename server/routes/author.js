const express = require("express");
const router = express.Router();
const authorControllers = require("../controllers/author");
const { requiresAuth } = require("../middlewares/authentication");

router.post("/", requiresAuth, authorControllers.createUpdate);
router.get("/", authorControllers.find);

module.exports = router;
