import "../../styles/service-detail.scss";
import { useNavigate } from "react-router-dom";
import Carousel from "../../component/Carousel/Carousel";

const ChuyenSau = () => {
  const navigate = useNavigate();

  const images = [
    "/images/spa1.jpg",
    "/images/spa1.jpg",
    "/images/spa1.jpg",
  ];

  const handleBooking = () => {
    navigate(
      "/service-booking?type=spa&name=Liệu%20pháp%20thư%20giãn%20chuyên%20sâu"
    );
  };

  return (
    <div className="service-detail-page">
      <div className="service-slider">
        <Carousel data={images} />
      </div>

      <div className="service-content">
        <h1 className="service-title">Liệu pháp thư giãn chuyên sâu</h1>
        <div className="title-underline"></div>

        <p>
          Liệu pháp massage chuyên sâu giúp thả lỏng cơ bắp, giảm đau nhức và
          phục hồi năng lượng. Đây là phương pháp hoàn hảo cho người bị căng thẳng
          hoặc phải ngồi làm việc nhiều.
        </p>

        <h2>Tác dụng</h2>
        <ul>
          <li>Giảm căng cơ – cổ – vai – lưng.</li>
          <li>Cải thiện tuần hoàn máu.</li>
          <li>Giảm stress, tăng chất lượng giấc ngủ.</li>
          <li>Hỗ trợ phục hồi thể lực.</li>
        </ul>

        <h2>Thời gian liệu trình</h2>
        <p>60 – 90 – 120 phút</p>

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

export default ChuyenSau;
