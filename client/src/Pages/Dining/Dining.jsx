import "./dining.styles.scss";
import { Link } from "react-router-dom";

const Dining = () => {
  return (
    <div id="dining">
      {/* Banner */}
      <div className="dining-banner">
        <img src="/images/dining-banner.jpg" alt="Nhà hàng" />

        <div className="overlay">
          <h1 className="title">Ẩm thực đẳng cấp</h1>
          <p className="subtitle">
            Thưởng thức tinh hoa ẩm thực trong không gian sang trọng.
          </p>
        </div>
      </div>

      {/* Nội dung */}
      <div className="container">
        <h2 className="section-title">Nhà hàng của chúng tôi</h2>

        <div className="dining-grid">
          <Link to="/dining/royal-signature" className="card">
            <img src="/images/dining1.jpg" alt="Nhà hàng Royal Signature" />
            <h3>Nhà hàng Royal Signature</h3>
            <p>Ẩm thực Á – Âu tinh tế, phong cách sang trọng.</p>
          </Link>

          <Link to="/dining/skyline-bar" className="card">
            <img src="/images/dining2.jpg" alt="Skyline Bar & Lounge" />
            <h3>Skyline Bar & Lounge</h3>
            <p>Cocktail thượng hạng & view thành phố tuyệt đẹp.</p>
          </Link>

          <Link to="/dining/garden-terrace" className="card">
            <img src="/images/dining3.jpg" alt="Garden Terrace Café" />
            <h3>Garden Terrace Café</h3>
            <p>Không gian xanh mát, thư giãn nhẹ nhàng.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dining;
