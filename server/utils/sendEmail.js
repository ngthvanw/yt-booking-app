const nodemailer = require("nodemailer");

const sendBookingEmail = async (to, booking) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Xác nhận đặt phòng thành công",
    html: `
      <h3>Đặt phòng thành công</h3>
      <p>Tên khách hàng: ${booking.name}</p>
      <p>Ngày nhận phòng: ${booking.checkInDate}</p>
      <p>Ngày trả phòng: ${booking.checkOutDate}</p>
      <p>Thanh toán: MoMo</p>
      <p>Trạng thái: Đã thanh toán</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendBookingEmail;
