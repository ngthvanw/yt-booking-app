const axios = require("axios");
const crypto = require("crypto");
const Booking = require("../models/bookingModel");
const sendBookingEmail = require("../utils/sendEmail");

/**
 * Tạo link thanh toán MoMo
 */
const createMoMoPayment = async (req, res, next) => {
  try {
    const { bookingId, amount } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;

    // 🔥 GẮN orderId = bookingId
    const requestId = partnerCode + Date.now();
    const orderId = booking._id.toString();

    const orderInfo = "Thanh toán đặt phòng khách sạn";
    const redirectUrl = "http://localhost:3000/payment-success";
    const ipnUrl = "http://localhost:5000/api/payment/momo/callback";
    const requestType = "captureWallet";
    const extraData = "";

    const rawSignature =
      `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}` +
      `&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}` +
      `&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const response = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      {
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang: "vi",
      }
    );

    booking.paymentMethod = "momo";
    booking.paymentStatus = "pending";
    await booking.save();

    return res.status(200).json({ payUrl: response.data.payUrl });
  } catch (error) {
    next(error);
  }
};

/**
 * Callback từ MoMo
 */
const handleMoMoCallback = async (req, res, next) => {
  try {
    const { orderId, resultCode, transId } = req.body;

    // 🔥 orderId = bookingId
    const booking = await Booking.findById(orderId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (resultCode === 0) {
      booking.paymentStatus = "paid";
      booking.confirmed = true;
      booking.transactionId = transId;
      await booking.save();

      // 🔥 GỬI EMAIL XÁC NHẬN
      await sendBookingEmail(booking.email, booking);

      return res.status(200).json({
        message: "Payment success",
        booking,
      });
    } else {
      booking.paymentStatus = "failed";
      await booking.save();

      return res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMoMoPayment,
  handleMoMoCallback,
};
