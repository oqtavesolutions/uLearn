const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const { requiresAuthRegistration } = require("../middlewares/authentication");

router.post("/", requiresAuthRegistration, userControllers.create);
router.get("/", userControllers.find);

module.exports = router;
