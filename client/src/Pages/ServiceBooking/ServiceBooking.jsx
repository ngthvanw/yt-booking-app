import { useState } from "react";
import "./service-booking.styles.scss";

const ServiceBooking = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const type = "Nhà hàng";
  const serviceName = "Skyline Bar & Lounge";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/service-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          serviceName,
          date,
          timeSlot,
          note,
          customerName,
          phoneNumber,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Có lỗi xảy ra!");
        setLoading(false);
        return;
      }

      setSuccess("Đặt dịch vụ thành công!");
      setCustomerName("");
      setPhoneNumber("");
      setDate("");
      setTimeSlot("");
      setNote("");
    } catch (err) {
      setError("Không thể kết nối máy chủ!");
    }

    setLoading(false);
  };

  return (
    <div className="service-booking-page">
      <div className="service-booking-card">

        <h1>Đặt dịch vụ</h1>

        <p><strong>Loại dịch vụ:</strong> {type}</p>
        <p><strong>Tên dịch vụ:</strong> {serviceName}</p>

        <form className="service-booking-form" onSubmit={handleSubmit}>
          <label>Họ và tên *</label>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />

          <label>Số điện thoại *</label>
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <label>Ngày sử dụng dịch vụ *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Khung giờ *</label>
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
            <option value="">-- Chọn khung giờ --</option>
            <option value="08:00 - 10:00">08:00 - 10:00</option>
            <option value="11:00 - 14:00">11:00 - 14:00</option>
            <option value="17:00 - 22:00">17:00 - 22:00</option>
          </select>

          <label>Ghi chú (tuỳ chọn)</label>
          <textarea
            placeholder="Vd: Bàn gần cửa sổ, massage cặp đôi..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Đang xử lý..." : "Xác nhận đặt dịch vụ"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default ServiceBooking;
