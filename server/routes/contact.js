const express = require("express");
const contactRateLimiter = require("../middleware/contactRateLimiter");
const { submitContactMessage } = require("../controllers/contactController");

const router = express.Router();

router.post("/", contactRateLimiter, submitContactMessage);

module.exports = router;
