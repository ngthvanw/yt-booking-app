import "./booking.styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Booking = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
  });

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await fetch(`/api/rooms/${id}`);
      const data = await res.json();
      setRoom(data);
    };
    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      roomId: id,
      ...form,
    };

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      alert("Đặt phòng thất bại!");
      return;
    }

    alert("Đặt phòng thành công!");
    navigate("/");
  };

  if (!room) return <p className="loading">Đang tải...</p>;

  return (
    <div id="booking-page">
      <div className="booking-banner" />

      <div className="container">
        <h1 className="title">Booking: {room.name}</h1>
        <p className="price">Giá: ${room.price}</p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label>Họ tên</label>
          <input name="name" onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />

          <label>Ngày nhận phòng</label>
          <input type="date" name="checkInDate" onChange={handleChange} required />

          <label>Ngày trả phòng</label>
          <input type="date" name="checkOutDate" onChange={handleChange} required />

          <button type="submit" className="btn-primary">Đặt phòng ngay</button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
