import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar__inner">

        {/* LOGO */}
        <div className="navbar__logo">
          <Link to="/">LaVila.</Link>
        </div>

        {/* MENU */}
        <nav className="navbar__links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/rooms">Rooms</NavLink>
          <NavLink to="/dining">Dining</NavLink>
          <NavLink to="/spa">Spa</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {/* CTA BUTTONS */}
        <div className="navbar__cta">
          <Link to="/rooms" className="btn-outline">Explore</Link>
          <Link to="/rooms" className="btn-primary">Book Now</Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;
