const express = require("express");
const router = express.Router();
const authorControllers = require("../controllers/author");

router.post("/", authorControllers.createUpdate);

module.exports = router;
