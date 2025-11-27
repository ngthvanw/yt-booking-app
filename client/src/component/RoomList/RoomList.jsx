import "./roomList.styles.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../../features/room/roomSlice";

const RoomList = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const fallbackImg = "/images/room_default.jpg";  // ảnh mặc định

  return (
    <div className="room-list">
      {rooms.map((room) => {
        const image = room.img?.[0] ? room.img[0] : fallbackImg;

        return (
          <div className="room-card" key={room._id}>
            <div className="room-img">
              <img src={image} alt={room.name} />
            </div>

            <div className="room-info">
              <h3>{room.name}</h3>
              <p>${room.price}</p>

              <Link to={`/rooms/${room._id}`} className="btn-primary">
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RoomList;
