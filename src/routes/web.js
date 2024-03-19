const express = require("express");
const {getHomepage, getTest} = require("../controllers/homeCtrler.js")
const router = express.Router();

router.get("/", getHomepage);

router.get("/test", getTest);

module.exports = router