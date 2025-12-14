const ServiceBooking = require("../models/serviceBookingModel");

// Tạo đặt dịch vụ
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

// Lấy danh sách đặt dịch vụ
const getServiceBookings = async (req, res) => {
  try {
    const bookings = await ServiceBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❗❗❗ XÓA ĐẶT DỊCH VỤ (CỰC KỲ QUAN TRỌNG)
const deleteServiceBooking = async (req, res) => {
  try {
    const booking = await ServiceBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Không tìm thấy đặt dịch vụ",
      });
    }

    await booking.deleteOne(); // ✅ XÓA THẬT TRONG DB

    res.json({ message: "Đã xóa đặt dịch vụ" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createServiceBooking,
  getServiceBookings,
  deleteServiceBooking, // 👈 NHỚ EXPORT
};
