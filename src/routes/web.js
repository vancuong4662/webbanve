const express = require("express");
const {
    getHomepage, 
    getAdminpage,
    getTicketList,
    postDatVe,
    postHuyVe,
    postXuatVe,
    postTestThu,
    postTest
} = require("../controllers/homeCtrler.js")
const router = express.Router();

// Pages :
router.get("/", getHomepage);
router.get("/home", getHomepage);
router.get("/admin", getAdminpage);

// APIs :
router.post("/datve", postDatVe);
router.post("/huyve", postHuyVe);
router.post("/xuatve", postXuatVe);
router.post("/testz", postTestThu);
router.get("/laydanhsachve", getTicketList);
router.get("/sua", postTest);

module.exports = router