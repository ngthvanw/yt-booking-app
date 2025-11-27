import "./spa.styles.scss";

const Spa = () => {
  return (
    <div id="spa-page">

      <div className="spa-header">
        <h1>Spa & Wellness</h1>
        <p>Không gian thư giãn – phục hồi năng lượng.</p>
      </div>

      <div className="spa-gallery">
        <img src="/spa/s1.jpg" alt="spa" />
        <img src="/spa/s2.jpg" alt="spa" />
        <img src="/spa/s3.jpg" alt="spa" />
      </div>

      <div className="spa-info">
        <h2>Liệu trình đặc biệt</h2>
        <p>
          Chúng tôi mang đến trải nghiệm Spa chuyên nghiệp với các liệu pháp massage, xông hơi 
          và chăm sóc sức khỏe toàn diện.
        </p>
      </div>

    </div>
  );
};

export default Spa;
