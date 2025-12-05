import "./header.styles.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser, reset } from "../../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutUser());
    dispatch(reset());
  };
  return (
    <header className="main-header">
      <div className="container">
        <Link to="/">
          <h1 className="logo">Royal Hotel</h1>
        </Link>

        <nav>
          <Link to="/rooms">Danh Sách Phòng</Link>
          {user ? (
            <>
              <Link to="/dashboard">Bảng Quản Lý</Link>
              <Link to="/rooms/create">Tạo Phòng</Link>
              <button onClick={handleLogout}>Đăng Xuất</button>
            </>
          ) : (
            <>
              <Link to="/login">Đăng Nhập</Link>
              <Link to="/register">Đăng ký</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
