const express = require("express");
const router = express.Router();
const orderControllers = require("../controllers/order");

router.post("/create", orderControllers.create);

module.exports = router;
