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
      <h1>{room.name}</h1>
      <p>{room.desc}</p>

      <Gallery images={room.img} />

      <div className="room-info-box">
        <h2>Giá phòng</h2>
        <p className="price">${room.price}</p>

        <Link to={`/bookings/${room._id}`} className="btn-primary">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default Room;
