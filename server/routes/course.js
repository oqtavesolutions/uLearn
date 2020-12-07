const express = require("express");
const router = express.Router();
const courseControllers = require("../controllers/course");

router.post("/create", courseControllers.create);

module.exports = router;
