import { useState } from "react";
import "./carousel.styles.scss";

const Carousel = ({ data, height = 300 }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current === data.length - 1 ? 0 : current + 1);
  };

  const prev = () => {
    setCurrent(current === 0 ? data.length - 1 : current - 1);
  };

  return (
    <div
      className="carousel-wrapper"
      style={{ height: `${height}px` }}
    >
      <img
        src={`http://localhost:5000${data[current]}`}
        className="carousel-img"
        alt=""
      />

      <button className="carousel-btn left" onClick={prev}>❮</button>
      <button className="carousel-btn right" onClick={next}>❯</button>

      <div className="carousel-dots">
        {data.map((_, i) => (
          <div
            key={i}
            className={`dot ${current === i ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
