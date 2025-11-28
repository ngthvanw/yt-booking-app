import "./gallery.scss";
import { useState } from "react";

const Gallery = ({ images }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={images[active]} alt="room" />
      </div>

      <div className="gallery-thumbs">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
