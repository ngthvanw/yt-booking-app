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

  // Format ngày
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  // Lấy booking theo ID
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

  // Xác nhận booking (tiền mặt)
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

  // ✅ XÁC NHẬN MOMO GIẢ
  const handleConfirmMoMo = async () => {
    setLoading(true);
    try {
      await fetch(`/api/bookings/${id}/confirm-momo`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionId: `MOMO-${Date.now()}`,
        }),
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
          <h2>{booking.name || booking.fullName}</h2>
          <p>Email: {booking.email}</p>
          <p>Phòng: {booking.roomId?.name}</p>

          <p>Ngày nhận phòng: {formatDate(booking.checkInDate)}</p>
          <p>Ngày trả phòng: {formatDate(booking.checkOutDate)}</p>

          <hr />

          {/* ===== THANH TOÁN ===== */}
          <p>
            Hình thức thanh toán:{" "}
            <b>{booking.paymentMethod?.toUpperCase()}</b>
          </p>

          <p>
            Trạng thái thanh toán:{" "}
            <b
              style={{
                color:
                  booking.paymentStatus === "paid" ? "green" : "orange",
              }}
            >
              {booking.paymentStatus}
            </b>
          </p>

          {booking.transactionId && (
            <p>
              Mã giao dịch: <b>{booking.transactionId}</b>
            </p>
          )}

          {booking.totalAmount && (
            <p>
              Tổng tiền:{" "}
              <b>{booking.totalAmount.toLocaleString()} ₫</b>
            </p>
          )}
        </div>

        <div className="cta-wrapper">
          {/* CASH */}
          {booking.paymentMethod === "cash" && !booking.confirmed && (
            <button onClick={handleConfirm} disabled={loading}>
              {loading ? "Đang xử lý..." : "Xác nhận"}
            </button>
          )}

          {/* MOMO */}
          {booking.paymentMethod === "momo" &&
            booking.paymentStatus !== "paid" && (
              <button onClick={handleConfirmMoMo} disabled={loading}>
                {loading ? "Đang xử lý..." : "Xác nhận MoMo"}
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
