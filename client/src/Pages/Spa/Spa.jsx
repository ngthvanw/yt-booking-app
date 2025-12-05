import "./spa.styles.scss";
import { Link } from "react-router-dom";

const Spa = () => {
  return (
    <div id="spa">
      <div className="spa-banner">
        <img src="/images/spa-banner.jpg" alt="Spa" />
        <div className="overlay">
          <h1 className="title">Royal Wellness Spa</h1>
          <p className="subtitle">
            Không gian thư giãn hoàn hảo dành cho bạn.
          </p>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">Liệu trình của chúng tôi</h2>

        <div className="spa-grid">
          <Link to="/spa/chuyen-sau" className="card">
            <img src="/images/spa1.jpg" alt="Liệu pháp thư giãn chuyên sâu" />
            <h3>Liệu pháp thư giãn chuyên sâu</h3>
            <p>Giảm căng thẳng, phục hồi năng lượng.</p>
          </Link>

          <Link to="/spa/huong-thom" className="card">
            <img src="/images/spa2.jpg" alt="Liệu pháp hương thơm" />
            <h3>Liệu pháp hương thơm</h3>
            <p>Thư giãn với tinh dầu thiên nhiên.</p>
          </Link>

          <Link to="/spa/da-nong" className="card">
            <img src="/images/spa3.jpg" alt="Massage đá nóng" />
            <h3>Massage đá nóng</h3>
            <p>Lưu thông khí huyết & giảm đau.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Spa;
