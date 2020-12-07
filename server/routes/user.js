const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");

router.post("/", userControllers.create);
router.get("/", userControllers.find);

module.exports = router;
