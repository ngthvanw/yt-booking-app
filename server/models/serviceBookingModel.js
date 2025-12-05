const mongoose = require("mongoose");

const serviceBookingSchema = new mongoose.Schema(
  {
    serviceType: String,
    serviceName: String,
    date: String,
    timeSlot: String,
    note: String,

    // 👉 THÊM MỚI
    customerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ServiceBooking",
  serviceBookingSchema
);
