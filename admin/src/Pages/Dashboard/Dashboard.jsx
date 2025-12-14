import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getBookings } from "../../features/booking/bookingSlice";

import BookingList from "../../component/BookingList/BookingList";
import ServiceBookingList from "../../component/ServiceBookingList/ServiceBookingList";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { bookings } = useSelector((state) => state.booking);

  const [serviceBookings, setServiceBookings] = useState([]);
  const [tab, setTab] = useState("rooms");

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Lấy danh sách đặt phòng
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  // Lấy danh sách đặt dịch vụ
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/service-bookings");
        const data = await res.json();
        setServiceBookings(data);
      } catch (err) {
        console.error("Lỗi:", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h1 className="heading center">Bảng Quản Lý</h1>

      {/* TAB */}
      <div
        style={{
          display: "flex",
          gap: "14px",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button onClick={() => setTab("rooms")}>Đặt phòng</button>
        <button onClick={() => setTab("services")}>Đặt dịch vụ</button>
      </div>

      {/* HIỂN THỊ BẢNG */}
      {tab === "rooms" && <BookingList data={bookings} />}

      {tab === "services" && (
        <ServiceBookingList
          data={serviceBookings}
          setData={setServiceBookings} // 👈 QUAN TRỌNG
        />
      )}
    </div>
  );
};

export default Dashboard;
