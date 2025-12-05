import "../../styles/service-detail.scss";
import { useNavigate } from "react-router-dom";
import Carousel from "../../component/Carousel/Carousel";

const HuongThom = () => {
  const navigate = useNavigate();

  const images = [
    "/images/spa2.jpg",
    "/images/spa2.jpg",
    "/images/spa2.jpg",
  ];

  const handleBooking = () => {
    navigate(
      "/service-booking?type=spa&name=Liệu%20pháp%20hương%20thơm"
    );
  };

  return (
    <div className="service-detail-page">
      <div className="service-slider">
        <Carousel data={images} />
      </div>

      <div className="service-content">
        <h1 className="service-title">Liệu pháp hương thơm</h1>
        <div className="title-underline"></div>

        <p>
          Tinh dầu thiên nhiên cao cấp giúp thư giãn hệ thần kinh, giảm căng thẳng
          và tái tạo sự cân bằng trong cơ thể. Đây là liệu trình nhẹ nhàng nhưng
          mang lại hiệu quả rất rõ rệt.
        </p>

        <h2>Lợi ích</h2>
        <ul>
          <li>Giảm stress, an thần.</li>
          <li>Thanh lọc cơ thể.</li>
          <li>Cải thiện tinh thần & cảm xúc.</li>
          <li>Mùi hương giúp dễ ngủ hơn.</li>
        </ul>

        <h2>Thời gian liệu trình</h2>
        <p>45 – 60 phút</p>

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

export default HuongThom;
