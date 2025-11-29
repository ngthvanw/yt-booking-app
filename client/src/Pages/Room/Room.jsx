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

  // ==========================
  // ZOOM + NEXT PREV
  // ==========================
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

    // click ảnh để mở popup
    document.querySelectorAll(".carousel img").forEach((img, index) => {
      img.onclick = () => openPopup(index);
    });

    // đóng popup
    closeBtn.onclick = () => popup.classList.remove("show");

    // click ra ngoài
    popup.onclick = (e) => {
      if (e.target === popup) popup.classList.remove("show");
    };

    // next
    nextBtn.onclick = () => {
      const nextIndex = (currentIndex + 1) % room.img.length;
      setCurrentIndex(nextIndex);
      popupImg.src = room.img[nextIndex];
    };

    // prev
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
        {/* GALLERY */}
        <div className="carousel">
          {room.img.map((src, i) => (
            <img key={i} src={src} alt={room.name} />
          ))}
        </div>

        {/* INFO BOX */}
        <div className="info-box">
          <h1 className="title">{room.name}</h1>
          <p className="desc">{room.desc}</p>

          <div className="price-box">
            <span className="price">{room.price}₫</span>
            <span className="night">/đêm</span>
          </div>

          <Link to={`/bookings/${room._id}`} className="book-btn">
            Đặt phòng
          </Link>
        </div>
      </div>

      {/* POPUP ZOOM */}
      <div id="imgPopup" className="zoom-popup">
        <span className="close-zoom">×</span>

        {/* Prev */}
        <span className="zoom-prev">❮</span>

        <img id="zoomedImg" src="" alt="zoomed" />

        {/* Next */}
        <span className="zoom-next">❯</span>
      </div>
    </div>
  );
};

export default Room;
