// src/Pages/Header/Header.jsx (hoặc đường dẫn cũ của bạn)
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
          <Link to="/">Home</Link>
          <Link to="/rooms">Rooms</Link>
           <Link to="/dining">Dining</Link>
          <Link to="/spa">Spa</Link>
          <Link to="/about">About</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
