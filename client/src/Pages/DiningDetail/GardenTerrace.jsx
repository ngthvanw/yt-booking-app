import "../../styles/service-detail.scss";
import { useNavigate } from "react-router-dom";
import Carousel from "../../component/Carousel/Carousel";

const GardenTerrace = () => {
  const navigate = useNavigate();

  const images = [
    "/images/dining3.jpg",
    "/images/dining3.jpg",
    "/images/dining3.jpg",
  ];

  const handleBooking = () => {
    navigate(
      "/service-booking?type=restaurant&name=Garden%20Terrace%20Café"
    );
  };

  return (
    <div className="service-detail-page">
      <div className="service-slider">
        <Carousel data={images} />
      </div>

      <div className="service-content">
        <h1 className="service-title">Garden Terrace Café</h1>
        <div className="title-underline"></div>

        <p>
          Garden Terrace Café mang đến bầu không khí xanh mát và nhẹ nhàng.
          Đây là nơi hoàn hảo để thưởng thức cà phê, bánh ngọt hoặc bữa sáng
          trong khung cảnh thiên nhiên thư thái.
        </p>

        <h2>Điểm nổi bật</h2>
        <ul>
          <li>Không gian ngoài trời thoáng đãng.</li>
          <li>Bánh ngọt homemade chuẩn Âu.</li>
          <li>Thức uống đa dạng: trà – cà phê – nước ép.</li>
          <li>Lý tưởng để làm việc hoặc gặp gỡ.</li>
        </ul>

        <h2>Giờ phục vụ</h2>
        <p>6:00 – 20:00</p>

        <button className="book-btn" onClick={handleBooking}>
          Đặt bàn ngay
        </button>

        <button className="back-btn" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default GardenTerrace;
