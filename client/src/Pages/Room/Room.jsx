import "./room.styles.scss";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Gallery from "../../component/Gallery/Gallery";

const Room = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetch(`/api/rooms/${id}`)
      .then(res => res.json())
      .then(data => setRoom(data));
  }, [id]);

  if (!room) return <p>Đang tải...</p>;

  return (
    <div id="room-page">

      <div className="room-header">
        <h1>{room.name}</h1>
        <p className="room-desc">{room.desc}</p>
      </div>

      <div className="room-layout">

        {/* Cột trái - Hình ảnh chính */}
        <div className="room-gallery">
          <Gallery images={room.img} />
        </div>

        {/* Cột phải - Box giá */}
        <aside className="room-price-box">
          <h3>Giá phòng</h3>
          <p className="price">${room.price}</p>

          <Link to={`/bookings/${room._id}`} className="btn-book">
            Đặt phòng ngay
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Room;
