import "./paymentSuccess.scss";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="payment-success-page">
        <div className="success-card">
          <h2>⚠️ Không có dữ liệu đặt phòng</h2>
          <button onClick={() => navigate("/")}>Về trang chủ</button>
        </div>
      </div>
    );
  }

  const {
    name,
    email,
    roomName,
    roomPrice,       // ✅ GIÁ TỪ BACKEND
    checkInDate,
    checkOutDate,
    paymentMethod,
    bookingCode,
  } = state;

  /* ===== TÍNH SỐ ĐÊM ===== */
  const inDate = new Date(checkInDate);
  let outDate = new Date(checkOutDate);

  if (outDate <= inDate) {
    outDate = new Date(inDate);
    outDate.setDate(inDate.getDate() + 1);
  }

  const nights = Math.ceil(
    (outDate - inDate) / (1000 * 60 * 60 * 24)
  );

  /* ===== TỔNG TIỀN = GIÁ PHÒNG * SỐ ĐÊM ===== */
  const totalAmount = roomPrice * nights;

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("vi-VN");

  return (
    <div className="payment-success-page">
      <div className="success-card">
        <h1 className="success-title">🎉 Đặt phòng thành công</h1>

        <p className="email-notice">
          📧 Email xác nhận <b>(mô phỏng)</b> đã được gửi tới
          <span> {email}</span>
        </p>

        <div className="email-box">
          <h3>Royal Hotel</h3>

          <p>Xin chào <b>{name}</b>,</p>
          <p>Dưới đây là thông tin xác nhận đặt phòng của bạn:</p>

          <div className="info-grid">
            <div>
              <span>Mã đặt phòng</span>
              <b>{bookingCode}</b>
            </div>

            <div>
              <span>Phòng</span>
              <b>{roomName}</b>
            </div>

            <div>
              <span>Giá / đêm</span>
              <b>{roomPrice.toLocaleString("vi-VN")} ₫</b>
            </div>

            <div>
              <span>Số đêm</span>
              <b>{nights}</b>
            </div>

            <div>
              <span>Ngày nhận</span>
              <b>{formatDate(inDate)}</b>
            </div>

            <div>
              <span>Ngày trả</span>
              <b>{formatDate(outDate)}</b>
            </div>

            <div>
              <span>Thanh toán</span>
              <b>{paymentMethod === "momo" ? "MoMo" : "Tiền mặt"}</b>
            </div>

            <div className="total">
              <span>Tổng tiền</span>
              <b>{totalAmount.toLocaleString("vi-VN")} ₫</b>
            </div>
          </div>

          <p className="footer-text">
            Trân trọng,
            <br />
            <b>Royal Hotel</b>
          </p>
        </div>

        <button className="back-btn" onClick={() => navigate("/")}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
