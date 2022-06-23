const express = require("express");
const router = express.Router();

let product = require("./productRouter");
let info = require("./infoRouter");
let login = require("./indexLogin");

router.use("/info", info);
router.use("/api", product);
router.use("/", login);

module.exports = router;
