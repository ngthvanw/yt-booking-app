const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking);


router.get(
  "/disabled-dates/:roomId",
  bookingController.getDisabledDates
);

router.get("/", bookingController.getBookings);
router.get("/:id", bookingController.getBookingById);

router.patch(
  "/:id/confirm-momo",
  bookingController.confirmMoMoFake
);

router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
