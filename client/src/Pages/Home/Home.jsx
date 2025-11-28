import "./home.styles.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch("/api/rooms");
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div id="home">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="overlay"></div>
        <div className="container hero-content">
          <h1>Welcome to Luxury Hotel</h1>
          <p>Experience comfort and innovation with our smart booking system.</p>

          <Link to="/rooms" className="btn-primary">
            View Rooms
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why">
        <div className="container">
          <h2>Why Choose Us</h2>

          <div className="why-grid">
            <div className="card">
              <img src="/icons/wifi.png" alt="wifi" />
              <h3>Free Wifi</h3>
              <p>High speed internet for all your needs.</p>
            </div>

            <div className="card">
              <img src="/icons/room.png" alt="room" />
              <h3>Luxury Rooms</h3>
              <p>Modern rooms designed for comfort.</p>
            </div>

            <div className="card">
              <img src="/icons/service.png" alt="service" />
              <h3>24/7 Service</h3>
              <p>Always available to support you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ROOMS */}
      <section className="featured">
        <div className="container">
          <h2>Featured Rooms</h2>

          <div className="room-grid">
            {rooms.slice(0, 3).map((room) => (
              <div className="room-card" key={room._id}>
                <img src={room.img[0]} alt="" />
                <h3>{room.name}</h3>
                <p>${room.price}</p>

                <Link className="btn-outline" to={`/rooms/${room._id}`}>
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery">
        <div className="container">
          <img src="/gallery/g1.jpg" alt="" />
          <img src="/gallery/g2.jpg" alt="" />
          <img src="/gallery/g3.jpg" alt="" />
          <img src="/gallery/g4.jpg" alt="" />
          <img src="/gallery/g5.jpg" alt="" />
          <img src="/gallery/g6.jpg" alt="" />
          
        </div>
      </section>
    </div>
  );
};

export default Home;
