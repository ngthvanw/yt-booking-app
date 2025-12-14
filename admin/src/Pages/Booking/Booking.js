import { useEffect, useState } from "react";
import "./booking.styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../../features/booking/bookingSlice";

const Booking = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Hàm format ngày (xóa T00:00:00.000Z)
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("vi-VN");
  };

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

  // Xác nhận booking
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmed: true }),
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  // Xóa booking
  const handleDelete = async () => {
    setLoading(true);
    try {
      await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };

  if (!booking) return <h3>Đang tải...</h3>;

  return (
    <div id="booking">
      <h1 className="heading center">Chi tiết đặt phòng</h1>

      <div className="content-wrapper">
        <div className="text-wrapper">
          <h2>{booking.fullName}</h2>
          <p>Email: {booking.email}</p>
          <p>Phòng: {booking.roomId?.name}</p>

          {/* ✅ ĐÃ FORMAT NGÀY */}
          <p>Ngày nhận phòng: {formatDate(booking.checkInDate)}</p>
          <p>Ngày trả phòng: {formatDate(booking.checkOutDate)}</p>
        </div>

        <div className="cta-wrapper">
          {!booking.confirmed && (
            <button onClick={handleConfirm} disabled={loading}>
              {loading ? "Đang xử lý..." : "Xác nhận"}
            </button>
          )}

          <button className="danger" onClick={handleDelete} disabled={loading}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
