import "./header.styles.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="lux-header">
      <div className="container">
        <Link to="/" className="lux-logo">
          Royal Hotel
        </Link>

        <nav className="lux-nav">
          <Link to="/">Trang Chủ</Link>
          <Link to="/rooms">Danh Sách Phòng</Link>
          <Link to="/dining">Ẩm Thực</Link>
          <Link to="/spa">Spa & Thư Giãn</Link>
          <Link to="/about">Giới Thiệu</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
