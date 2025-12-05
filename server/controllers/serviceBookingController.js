const ServiceBooking = require("../models/serviceBookingModel");

const createServiceBooking = async (req, res) => {
  try {
    const {
      serviceType,
      serviceName,
      date,
      timeSlot,
      note,
      customerName,
      phoneNumber,
    } = req.body;

    if (!serviceType || !serviceName || !date || !timeSlot || !customerName || !phoneNumber) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
    }

    const booking = await ServiceBooking.create({
      serviceType,
      serviceName,
      date,
      timeSlot,
      note,
      customerName,
      phoneNumber,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getServiceBookings = async (req, res) => {
  try {
    const bookings = await ServiceBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createServiceBooking,
  getServiceBookings,
};
