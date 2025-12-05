import "../../styles/service-detail.scss";
import { useNavigate } from "react-router-dom";
import Carousel from "../../component/Carousel/Carousel";

const RoyalSignature = () => {
  const navigate = useNavigate();

  const images = [
    "/images/dining1.jpg",
    "/images/dining1.jpg",
    "/images/dining1.jpg",
  ];

  const handleBooking = () => {
    navigate(
      "/service-booking?type=restaurant&name=Royal%20Signature"
    );
  };

  return (
    <div className="service-detail-page">
      <div className="service-slider">
        <Carousel data={images} />
      </div>

      <div className="service-content">
        <h1 className="service-title">Nhà hàng Royal Signature</h1>
        <div className="title-underline"></div>

        <p>
          Royal Signature mang phong cách Á – Âu tinh tế, nơi nghệ thuật ẩm thực
          hòa quyện cùng không gian sang trọng. Mỗi món ăn được chế biến bởi
          đầu bếp tài năng với nguyên liệu tươi ngon, mang đến trải nghiệm đẳng cấp.
        </p>

        <h2>Điểm nổi bật</h2>
        <ul>
          <li>Thực đơn Á – Âu thay đổi theo mùa.</li>
          <li>Không gian sang trọng phù hợp tiệc & gặp mặt.</li>
          <li>Nguyên liệu cao cấp – tiêu chuẩn 5 sao.</li>
          <li>Phục vụ tận tâm, chuyên nghiệp.</li>
        </ul>

        <h2>Giờ phục vụ</h2>
        <p>Sáng 6:00–10:00 • Trưa 11:00–14:00 • Tối 17:30–22:00</p>

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

export default RoyalSignature;
