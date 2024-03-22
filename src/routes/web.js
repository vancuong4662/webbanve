const express = require("express");
const {
    getHomepage, 
    postDatVe
} = require("../controllers/homeCtrler.js")
const router = express.Router();

router.get("/", getHomepage);

router.post("/datve", postDatVe);

module.exports = router