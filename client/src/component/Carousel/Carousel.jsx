import { useState } from "react";
import "./carousel.scss";

const Carousel = ({ data }) => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((index - 1 + data.length) % data.length);
  };

  const next = () => {
    setIndex((index + 1) % data.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={prev}>❮</button>

      <img src={data[index]} alt="room" className="carousel-img" />

      <button className="carousel-btn right" onClick={next}>❯</button>
    </div>
  );
};

export default Carousel;
