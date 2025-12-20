import "./booking.styles.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state?.roomId;

  const [disabledDates, setDisabledDates] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkInDate: null,
    checkOutDate: null,
    paymentMethod: "cash",
  });

  /* ===== LOAD NGÀY ĐÃ BOOK ===== */
  useEffect(() => {
    if (!roomId) return;

    axios
      .get(`http://localhost:5000/api/bookings/disabled-dates/${roomId}`)
      .then((res) => {
        // convert yyyy-mm-dd → Date
        const dates = res.data.map((d) => new Date(d));
        setDisabledDates(dates);
      })
      .catch(console.error);
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomId) {
      alert("Vui lòng chọn phòng");
      navigate("/rooms");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        roomId,
        name: formData.name,
        email: formData.email,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        paymentMethod: formData.paymentMethod,
      });

      const booking = res.data;

      const bookingState = {
        bookingId: booking._id,
        bookingCode: booking.bookingCode,
        roomName: booking.roomId?.name,
        roomPrice: Number(booking.roomId?.price || 0),
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        paymentMethod: booking.paymentMethod,
        name: booking.name,
        email: booking.email,
      };

      if (formData.paymentMethod === "momo") {
        navigate("/momo-processing", { state: bookingState });
      } else {
        navigate("/payment-success", { state: bookingState });
      }
    } catch (err) {
      if (err.response?.status === 409) {
        alert(err.response.data.message);
      } else {
        alert("Đặt phòng thất bại");
      }
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h1>Đặt phòng</h1>

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Họ và tên</label>
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ngày nhận phòng</label>
              <DatePicker
                selected={formData.checkInDate}
                onChange={(date) =>
                  setFormData({
                    ...formData,
                    checkInDate: date,
                    checkOutDate: null,
                  })
                }
                excludeDates={disabledDates}
                minDate={new Date()}
                placeholderText="Chọn ngày"
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>

            <div className="form-group">
              <label>Ngày trả phòng</label>
              <DatePicker
                selected={formData.checkOutDate}
                onChange={(date) =>
                  setFormData({ ...formData, checkOutDate: date })
                }
                excludeDates={disabledDates}
                minDate={formData.checkInDate}
                placeholderText="Chọn ngày"
                dateFormat="dd/MM/yyyy"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Phương thức thanh toán</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentMethod: e.target.value,
                })
              }
            >
              <option value="cash">💵 Tiền mặt</option>
              <option value="momo">📱 MoMo</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Xác nhận đặt phòng
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
