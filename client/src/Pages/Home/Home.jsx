import "./home.styles.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../../features/room/roomSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const featuredRooms = rooms.slice(0, 3);

  return (
    <div id="home">
      <section className="hero-banner">
        <img src="/images/banner.jpg" alt="Banner" className="banner-img" />

        <div className="hero-content">
          <h1 className="hero-title">Trải nghiệm sự sang trọng & thoải mái</h1>
          <p className="hero-subtitle">
            Khám phá những căn phòng được thiết kế tinh tế cùng dịch vụ đẳng cấp.
          </p>

          <Link to="/rooms" className="hero-btn">Xem phòng</Link>
        </div>
      </section>

      <section className="home-section">
        <h2 className="section-title">Phòng nổi bật</h2>

        <div className="rooms-preview">
          {featuredRooms.map((room) => (
            <Link key={room._id} to={`/rooms/${room._id}`} className="room-card">
              <img
                src={
                  room.img && room.img.length > 0
                    ? room.img[0]
                    : "/images/room1.jpg"
                }
                alt=""
              />
              <h3>{room.name}</h3>
              {room.price && (
                <p className="price">{room.price}₫ / đêm</p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
