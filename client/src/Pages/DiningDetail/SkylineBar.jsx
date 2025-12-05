import "../../styles/service-detail.scss";
import { useNavigate } from "react-router-dom";
import Carousel from "../../component/Carousel/Carousel";

const SkylineBar = () => {
  const navigate = useNavigate();

  // Danh sách hình cho slider (có thể thêm hình thật tuỳ bạn)
  const images = [
    "/images/dining2.jpg",
    "/images/dining2.jpg",
    "/images/dining2.jpg",
  ];

  // Khi nhấn nút đặt dịch vụ → chuyển đến form đặt lịch
  const handleBooking = () => {
    navigate(
      "/service-booking?type=restaurant&name=Skyline%20Bar%20%26%20Lounge"
    );
  };

  return (
    <div className="service-detail-page">

      {/* SLIDER BÊN TRÁI */}
      <div className="service-slider">
        <Carousel data={images} />
      </div>

      {/* NỘI DUNG BÊN PHẢI */}
      <div className="service-content">
        <h1 className="service-title">Skyline Bar & Lounge</h1>
        <div className="title-underline"></div>

        <p>
          Skyline Bar & Lounge sở hữu tầm nhìn toàn cảnh thành phố lộng lẫy.
          Nơi đây mang đến trải nghiệm cocktail sang trọng, âm nhạc nhẹ nhàng
          và không khí thư giãn tuyệt vời. Là sự lựa chọn hoàn hảo để thư giãn
          sau một ngày dài hoặc hẹn hò cùng người thân yêu.
        </p>

        <h2>Điểm nổi bật</h2>
        <ul>
          <li>Tầm nhìn skyline tuyệt đẹp.</li>
          <li>Hơn 30 loại cocktail signature độc quyền.</li>
          <li>Nhạc acoustic và DJ cuối tuần.</li>
          <li>Không gian lãng mạn, lý tưởng cho các cặp đôi.</li>
        </ul>

        <h2>Giờ phục vụ</h2>
        <p>17:00 – 01:00 hằng ngày</p>

        {/* NÚT ĐẶT BÀN */}
        <button className="book-btn" onClick={handleBooking}>
          Đặt bàn ngay
        </button>

        {/* NÚT QUAY LẠI */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default SkylineBar;
