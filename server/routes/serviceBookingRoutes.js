// server/routes/serviceBookingRoutes.js
const express = require("express");
const router = express.Router();

const {
  createServiceBooking,
  getServiceBookings,
  deleteServiceBooking, 
} = require("../controllers/serviceBookingController");

router.post("/", createServiceBooking);
router.get("/", getServiceBookings);
router.delete("/:id", deleteServiceBooking); 

module.exports = router;
