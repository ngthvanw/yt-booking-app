const express = require("express");
const router = express.Router();

const { askBot } = require("../controllers/chat.controller");

router.post("/", askBot);

module.exports = router;
