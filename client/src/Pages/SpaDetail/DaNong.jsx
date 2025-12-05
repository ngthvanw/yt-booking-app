import "../../styles/service-detail.scss";
import { useNavigate } from "react-router-dom";
import Carousel from "../../component/Carousel/Carousel";

const DaNong = () => {
  const navigate = useNavigate();

  const images = [
    "/images/spa3.jpg",
    "/images/spa3.jpg",
    "/images/spa3.jpg",
  ];

  const handleBooking = () => {
    navigate(
      "/service-booking?type=spa&name=Massage%20đá%20nóng"
    );
  };

  return (
    <div className="service-detail-page">
      <div className="service-slider">
        <Carousel data={images} />
      </div>

      <div className="service-content">
        <h1 className="service-title">Massage đá nóng</h1>
        <div className="title-underline"></div>

        <p>
          Massage đá nóng giúp kích hoạt năng lượng cơ thể, giảm đau nhức,
          tăng tuần hoàn máu và tạo cảm giác thư giãn sâu. Đây là liệu pháp
          rất được yêu thích tại Royal Spa.
        </p>

        <h2>Công dụng</h2>
        <ul>
          <li>Giảm mỏi vai gáy – lưng.</li>
          <li>Làm ấm cơ thể, giảm căng cơ.</li>
          <li>Thải độc tố và lưu thông huyết mạch.</li>
          <li>Thư giãn tinh thần toàn diện.</li>
        </ul>

        <h2>Thời gian liệu trình</h2>
        <p>60 – 90 phút</p>

        <button className="book-btn" onClick={handleBooking}>
          Đặt lịch ngay
        </button>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default DaNong;
