import "./gallery.scss";
import { useState } from "react";

const Gallery = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current + 1) % images.length);
  };

  const prev = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={images[current]} alt="room" />
        <button className="prev" onClick={prev}>‹</button>
        <button className="next" onClick={next}>›</button>
      </div>

      <div className="gallery-thumbs">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={current === index ? "active" : ""}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
