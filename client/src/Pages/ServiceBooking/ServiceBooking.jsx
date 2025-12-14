import { useState } from "react";
import "./service-booking.styles.scss";
import { SERVICES } from "../../constants/services";

const ServiceBooking = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const selectedService = SERVICES.find(
    (s) => s.type === serviceType
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedService) {
      setError("Vui lòng chọn dịch vụ!");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/service-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedService.category,
          serviceName: selectedService.name,
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
      setServiceType("");
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

        <form className="service-booking-form" onSubmit={handleSubmit}>
          <label>Họ và tên *</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />

          <label>Số điện thoại *</label>
          <input
            type="text"
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

          <label>Chọn dịch vụ *</label>
          <select
            value={serviceType}
            onChange={(e) => {
              setServiceType(e.target.value);
              setTimeSlot("");
            }}
            required
          >
            <option value="">-- Chọn dịch vụ --</option>

            <optgroup label="DINING">
              {SERVICES.filter(s => s.category === "DINING").map(s => (
                <option key={s.type} value={s.type}>{s.name}</option>
              ))}
            </optgroup>

            <optgroup label="SPA">
              {SERVICES.filter(s => s.category === "SPA").map(s => (
                <option key={s.type} value={s.type}>{s.name}</option>
              ))}
            </optgroup>
          </select>

          <label>Khung giờ *</label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            disabled={!selectedService}
            required
          >
            <option value="">-- Chọn khung giờ --</option>
            {selectedService?.timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>

          <label>Ghi chú (tuỳ chọn)</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận đặt dịch vụ"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ServiceBooking;
