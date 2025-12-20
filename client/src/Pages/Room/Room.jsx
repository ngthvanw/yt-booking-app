import "./room.styles.scss";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Room = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await fetch(`/api/rooms/${id}`);
      const data = await res.json();
      setRoom(data);
    };
    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (!room) return;

    const popup = document.getElementById("imgPopup");
    const popupImg = document.getElementById("zoomedImg");
    const closeBtn = document.querySelector(".close-zoom");
    const nextBtn = document.querySelector(".zoom-next");
    const prevBtn = document.querySelector(".zoom-prev");

    const openPopup = (index) => {
      setCurrentIndex(index);
      popupImg.src = room.img[index];
      popup.classList.add("show");
    };

    document.querySelectorAll(".carousel img").forEach((img, index) => {
      img.onclick = () => openPopup(index);
    });

    closeBtn.onclick = () => popup.classList.remove("show");

    popup.onclick = (e) => {
      if (e.target === popup) popup.classList.remove("show");
    };

    nextBtn.onclick = () => {
      const nextIndex = (currentIndex + 1) % room.img.length;
      setCurrentIndex(nextIndex);
      popupImg.src = room.img[nextIndex];
    };

    prevBtn.onclick = () => {
      const prevIndex =
        (currentIndex - 1 + room.img.length) % room.img.length;
      setCurrentIndex(prevIndex);
      popupImg.src = room.img[prevIndex];
    };
  }, [room, currentIndex]);

  if (!room) return <div className="room-loading">Đang tải...</div>;

  return (
    <div id="room-detail">
      <div className="container">
        <div className="carousel">
          {room.img.map((src, i) => (
            <img key={i} src={src} alt={room.name} />
          ))}
        </div>

        <div className="info-box">
          <h1 className="title">{room.name}</h1>
          <p className="desc">{room.desc}</p>

          <div className="price-box">
            <span className="price">{room.price}₫</span>
            <span className="night">/đêm</span>
          </div>

          {/* ✅ TRUYỀN roomId QUA STATE */}
          <Link
            to="/bookings"
            state={{ roomId: room._id }}
            className="book-btn"
          >
            Đặt phòng
          </Link>
        </div>
      </div>

      <div id="imgPopup" className="zoom-popup">
        <span className="close-zoom">×</span>
        <span className="zoom-prev">❮</span>
        <img id="zoomedImg" src="" alt="zoomed" />
        <span className="zoom-next">❯</span>
      </div>
    </div>
  );
};

export default Room;
