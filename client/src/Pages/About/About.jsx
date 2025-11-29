import "./about.styles.scss";

const About = () => {
  return (
    <div id="about">
      <div className="about-banner">
        <img src="/images/about-banner.jpg" alt="Giới thiệu" />
        <div className="overlay">
          <h1>Giới thiệu về Royal Hotel</h1>
        </div>
      </div>

      <div className="container">
        <section className="about-section">
          <h2>Câu chuyện của chúng tôi</h2>
          <p>
            Royal Hotel là điểm đến nghỉ dưỡng cao cấp với dịch vụ đẳng cấp 5 sao,
            mang đến sự tinh tế, sang trọng và trải nghiệm khó quên cho mỗi khách hàng.
            Chúng tôi luôn nỗ lực để tạo nên không gian lưu trú hoàn hảo nhất.
          </p>
        </section>

        <section className="about-section">
          <h2>Tại sao chọn chúng tôi?</h2>

          <div className="why-grid">
            <div className="why-item">
              <h3>⭐ Khách sạn 5 sao</h3>
              <p>Dịch vụ chuyên nghiệp, đội ngũ nhân viên tận tâm và chu đáo.</p>
            </div>

            <div className="why-item">
              <h3>🥂 Ẩm thực cao cấp</h3>
              <p>Hệ thống nhà hàng quốc tế với thực đơn phong phú, tinh tế.</p>
            </div>

            <div className="why-item">
              <h3>🌿 Spa &amp; Wellness</h3>
              <p>Không gian thư giãn với các liệu trình chăm sóc sức khỏe chuyên sâu.</p>
            </div>

            <div className="why-item">
              <h3>🏊 Tiện nghi hiện đại</h3>
              <p>Hồ bơi, phòng gym, trung tâm hội nghị và nhiều tiện ích khác.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
