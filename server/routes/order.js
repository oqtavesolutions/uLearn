const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order");
const { requiresAuth } = require("../middlewares/authentication");

router.post("/create/:courseSlug", requiresAuth, orderControllers.create);

module.exports = router;
