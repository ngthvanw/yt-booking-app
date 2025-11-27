import "./success.styles.scss";
import { Link, useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const state = location.state || {};
  const roomName = state.roomName || "your room";

  return (
    <div id="success-page">
      <div className="success-card container">
        <div className="success-icon">✓</div>
        <h1>Đặt phòng thành công!</h1>
        <p>
          Bạn đã đặt phòng <strong>{roomName}</strong> thành công.
          Vui lòng kiểm tra email để xem chi tiết và xác nhận thời gian.
        </p>

        <div className="success-actions">
          <Link to="/" className="btn-outline">
            Về trang Home
          </Link>
          <Link to="/profile" className="btn-primary">
            Xem hồ sơ / lịch đặt
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
