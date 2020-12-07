const express = require("express");
const router = express.Router();
const courseControllers = require("../controllers/course");

router.post("/create", courseControllers.create);
router.get("/:id", courseControllers.find);
router.put("/edit/:id", courseControllers.update);
module.exports = router;
