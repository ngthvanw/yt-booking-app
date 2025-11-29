import "./success.styles.scss";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="success-page">
      <div className="card">
        <div className="icon">✓</div>
        <h1 className="success-text">Đặt phòng thành công!</h1>
        <p>
          Chúng tôi đã ghi nhận thông tin đặt phòng của bạn. 
          Xin cảm ơn và hẹn gặp bạn tại Royal Hotel.
        </p>

        <Link to="/" className="back-btn">
          Quay về trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Success;
