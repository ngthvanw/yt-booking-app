import "./booking.styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createBooking, reset } from "../../features/booking/bookingSlice";

const Booking = () => {
  const { id: roomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state.booking);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/success");
      dispatch(reset());
    }
  }, [isSuccess, navigate, dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBooking({ roomId, ...formData }));
  };

  return (
    <div id="booking-page">
      <div className="container">
        <h1 className="title">Đặt phòng</h1>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Họ và tên</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nhập họ tên của bạn"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="checkInDate">Ngày nhận phòng</label>
              <input
                id="checkInDate"
                name="checkInDate"
                type="date"
                value={formData.checkInDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="checkOutDate">Ngày trả phòng</label>
              <input
                id="checkOutDate"
                name="checkOutDate"
                type="date"
                value={formData.checkOutDate}
                onChange={handleChange}
                required
              />
            </div>
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
