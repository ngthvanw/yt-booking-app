import "./about.styles.scss";

const About = () => {
  return (
    <div id="about-page">

      {/* HEADER */}
      <div className="about-header">
        <h1>About LaVila Hotel</h1>
        <p>Your comfort is our priority.</p>
      </div>

      {/* SECTION 1 – HERO */}
      <section className="about-section">
        <div className="about-img">
          <img src="/images/about_hero.jpg" alt="Hotel Lobby" />
        </div>

        <div className="about-text">
          <h2>Welcome to LaVila</h2>
          <p>
            LaVila Hotel mang đến không gian nghỉ dưỡng sang trọng, dịch vụ hoàn hảo
            và trải nghiệm đẳng cấp dành cho mọi khách hàng. Chúng tôi tự hào mang đến
            sự thoải mái, tiện nghi và dịch vụ tận tâm trong suốt thời gian lưu trú.
          </p>
        </div>
      </section>

      {/* SECTION 2 – INTERIOR */}
      <section className="about-section reverse">
        <div className="about-img">
          <img src="/images/about_interior.jpg" alt="Hotel Interior" />
        </div>

        <div className="about-text">
          <h2>Modern & Luxury Space</h2>
          <p>
            Hệ thống phòng được thiết kế hiện đại, nội thất cao cấp, nhiều lựa chọn
            phù hợp cho cả gia đình, nhóm bạn và khách công tác. LaVila luôn chú trọng
            tạo ra không gian thoải mái giúp bạn thư giãn tối đa.
          </p>
        </div>
      </section>

      {/* SECTION 3 – TEAM */}
      <section className="about-section">
        <div className="about-img">
          <img src="/images/about_team.jpg" alt="Staff Team" />
        </div>

        <div className="about-text">
          <h2>Professional Staff</h2>
          <p>
            Đội ngũ nhân viên chuyên nghiệp, thân thiện và tận tâm sẽ đồng hành cùng
            bạn trong suốt kỳ nghỉ. Chúng tôi sẵn sàng hỗ trợ 24/7 để mang đến trải
            nghiệm tuyệt vời nhất.
          </p>
        </div>
      </section>

      {/* SECTION 4 – HOTEL */}
      <div className="about-footer-img">
        <img src="/images/about_hotel.jpg" alt="Hotel View" />
      </div>

    </div>
  );
};

export default About;
