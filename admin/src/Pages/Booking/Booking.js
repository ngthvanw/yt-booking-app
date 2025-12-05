import { useEffect, useState } from "react";
import "./booking.styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import {
  confirmBooking,
  deleteBooking,
  reset,
} from "../../features/booking/bookingSlice";
import { useDispatch } from "react-redux";

const Booking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  // Lấy thông tin đơn đặt phòng theo ID
  useEffect(() => {
    dispatch(reset());
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${id}`);
        const data = await res.json();
        setBooking(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBooking();
  }, [id, dispatch]);

  const handleConfirm = async () => {
    await dispatch(confirmBooking(id));
    navigate("/dashboard");
  };

  const handleDelete = async () => {
    await dispatch(deleteBooking(id));
    navigate("/dashboard");
  };

  if (!booking) return <h3>Đang tải...</h3>;

  return (
    <div id="booking">
      <h1 className="heading center">Chi tiết đặt phòng</h1>

      <div className="content-wrapper">
        <div className="text-wrapper">
          <h2>{booking?.fullName}</h2>
          <p>Email: {booking?.email}</p>
          <p>Phòng: {booking?.roomId?.name}</p>
          <p>Ngày nhận phòng: {booking?.checkInDate}</p>
          <p>Ngày trả phòng: {booking?.checkOutDate}</p>
        </div>

        <div className="cta-wrapper">
          <button onClick={handleConfirm}>Xác nhận</button>
          <button className="danger" onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
