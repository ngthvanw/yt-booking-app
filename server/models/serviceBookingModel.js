const mongoose = require("mongoose");

const serviceBookingSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    serviceName: { type: String, required: true },

    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },

    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceBooking", serviceBookingSchema);
