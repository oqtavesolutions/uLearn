const express = require("express");
const router = express.Router();
const authorController = require("../controllers/author");

router.post("/", authorController.updateAuthor);

module.exports = router;
