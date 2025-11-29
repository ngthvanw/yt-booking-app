import "./rooms.styles.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms, reset } from "../../features/room/roomSlice";
import { Link } from "react-router-dom";

const Rooms = () => {
  const dispatch = useDispatch();
  const { rooms, isLoading } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getRooms());
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="rooms-page">
      <div className="container">
        <h1 className="page-title">Danh sách phòng</h1>

        {isLoading && <p className="loading">Đang tải phòng...</p>}

        {!isLoading && rooms.length === 0 && (
          <p className="loading">Hiện không có phòng nào.</p>
        )}

        <div className="rooms-grid">
          {rooms.map((room) => (
            <Link key={room._id} to={`/room/${room._id}`} className="room-card">
              <div className="img-wrapper">
                <img
                  src={
                    room.img && room.img.length > 0
                      ? room.img[0]
                      : "/images/room1.jpg"
                  }
                  alt=""
                />
              </div>

              <div className="room-info">
                <h3>{room.name}</h3>

                <p className="desc">
                  {room.desc ? room.desc.slice(0, 70) + "..." : ""}
                </p>

                <div className="price-row">
                  <span className="price">{room.price}₫</span>
                  <span className="night">/đêm</span>
                </div>

                <button className="view-btn">Xem chi tiết</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
