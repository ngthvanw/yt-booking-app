const ServiceBooking = require("../models/serviceBookingModel");

const createServiceBooking = async (req, res) => {
  try {
    const {
      type,
      serviceName,
      customerName,
      phoneNumber,
      date,
      timeSlot,
      note,
    } = req.body;

    if (
      !type ||
      !serviceName ||
      !customerName ||
      !phoneNumber ||
      !date ||
      !timeSlot
    ) {
      return res.status(400).json({
        message: "Thiếu thông tin bắt buộc!",
      });
    }

    const booking = await ServiceBooking.create({
      type,
      serviceName,
      customerName,
      phoneNumber,
      date,
      timeSlot,
      note,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getServiceBookings = async (req, res) => {
  const bookings = await ServiceBooking.find().sort({ createdAt: -1 });
  res.json(bookings);
};

module.exports = {
  createServiceBooking,
  getServiceBookings,
};
