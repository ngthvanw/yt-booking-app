// server/routes/serviceBookingRoutes.js
const express = require("express");
const router = express.Router();

const {
  createServiceBooking,
  getServiceBookings,
} = require("../controllers/serviceBookingController");

router.post("/", createServiceBooking);
router.get("/", getServiceBookings);

module.exports = router;
