const express = require("express");
const router = express.Router();

const home = require("./modules/home");
const download = require("./modules/download");
const upload = require("./modules/upload");

router.use("/", home);
router.use("/download", download);
router.use("/upload", upload);

module.exports = router;
