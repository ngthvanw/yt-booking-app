const express = require("express");
const {
  createMoMoPayment,
  handleMoMoCallback,
} = require("../controllers/paymentController");

const router = express.Router();

router.post("/momo/create", createMoMoPayment);
router.post("/momo/callback", handleMoMoCallback);

module.exports = router;
