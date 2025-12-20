const Booking = require("../models/bookingModel");

/**
 * TẠO BOOKING
 * POST /api/bookings
 */
const createBooking = async (req, res) => {
  try {
    const {
      roomId,
      name,
      email,
      checkInDate,
      checkOutDate,
      paymentMethod = "cash",
    } = req.body;

    if (!roomId || !name || !email || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Thiếu thông tin đặt phòng" });
    }

    // ✅ GIỮ NGUYÊN LOGIC CỦA BẠN – CHỈ THÊM bookingCode
    const booking = await Booking.create({
      roomId,
      name,
      email,
      checkInDate,
      checkOutDate,
      paymentMethod,
      bookingCode: `RH-${Date.now().toString().slice(-6)}`,
    });

    // ✅ TRẢ BOOKING + THÔNG TIN PHÒNG THẬT
    const bookingWithRoom = await Booking.findById(booking._id).populate(
      "roomId",
      "name price"
    );

    // 🔥 FIX QUAN TRỌNG: price đang là STRING → ÉP SANG NUMBER
    if (
      bookingWithRoom?.roomId?.price &&
      typeof bookingWithRoom.roomId.price === "string"
    ) {
      bookingWithRoom.roomId.price = Number(
        bookingWithRoom.roomId.price.replace(/\./g, "")
      );
    }

    res.status(201).json(bookingWithRoom);
  } catch (error) {
    console.error("createBooking error:", error);
    res.status(500).json({ message: "Đặt phòng thất bại" });
  }
};

/**
 * XÁC NHẬN MOMO GIẢ
 * PATCH /api/bookings/:id/confirm-momo
 */
const confirmMoMoFake = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id).populate(
      "roomId",
      "name price"
    );

    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy booking" });
    }

    // 🔥 ÉP KIỂU price STRING → NUMBER (để frontend luôn đúng)
    if (
      booking?.roomId?.price &&
      typeof booking.roomId.price === "string"
    ) {
      booking.roomId.price = Number(
        booking.roomId.price.replace(/\./g, "")
      );
    }

    booking.paymentMethod = "momo";
    booking.paymentStatus = "paid";
    booking.confirmed = true;
    booking.transactionId = `MOMO-${Date.now()}`;

    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Lỗi xác nhận MoMo" });
  }
};

/**
 * ADMIN – LẤY DANH SÁCH
 */
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("roomId", "name price")
      .sort({ createdAt: -1 });

    // 🔥 ÉP KIỂU TOÀN BỘ price STRING → NUMBER
    bookings.forEach((b) => {
      if (b?.roomId?.price && typeof b.roomId.price === "string") {
        b.roomId.price = Number(b.roomId.price.replace(/\./g, ""));
      }
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy booking" });
  }
};

/**
 * ADMIN – CHI TIẾT
 */
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "roomId",
      "name price"
    );

    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy booking" });
    }

    // 🔥 ÉP KIỂU price STRING → NUMBER
    if (
      booking?.roomId?.price &&
      typeof booking.roomId.price === "string"
    ) {
      booking.roomId.price = Number(
        booking.roomId.price.replace(/\./g, "")
      );
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy booking" });
  }
};

/**
 * ADMIN – XÓA
 */
const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa booking" });
  } catch (error) {
    res.status(500).json({ message: "Xóa thất bại" });
  }
};

const getDisabledDates = async (req, res) => {
  try {
    const { roomId } = req.params;

    const bookings = await Booking.find({ roomId });

    const disabledDates = [];

    bookings.forEach((b) => {
      const start = new Date(b.checkInDate);
      const end = new Date(b.checkOutDate);

      for (
        let d = new Date(start);
        d < end;
        d.setDate(d.getDate() + 1)
      ) {
        disabledDates.push(d.toISOString().split("T")[0]); // yyyy-mm-dd
      }
    });

    res.json(disabledDates);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy lịch phòng" });
  }
};

module.exports = {
  createBooking,
  confirmMoMoFake,
  getBookings,
  getBookingById,
  deleteBooking,
  getDisabledDates,
};
