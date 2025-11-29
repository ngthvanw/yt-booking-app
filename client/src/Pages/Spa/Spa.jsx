import "./spa.styles.scss";

const Spa = () => {
  return (
    <div id="spa">
      <div className="spa-banner">
        <img src="/images/spa-banner.jpg" alt="Spa" />
        <div className="overlay">
          <h1 className="title">Royal Wellness Spa</h1>
          <p className="subtitle">
            Không gian thư giãn hoàn hảo dành cho bạn.
          </p>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">Liệu trình của chúng tôi</h2>

        <div className="spa-grid">
          <div className="card">
            <img src="/images/spa1.jpg" alt="Liệu pháp thư giãn chuyên sâu" />
            <h3>Liệu pháp thư giãn chuyên sâu</h3>
            <p>
              Giúp giải tỏa căng thẳng, xua tan mệt mỏi và phục hồi năng lượng.
            </p>
          </div>

          <div className="card">
            <img src="/images/spa2.jpg" alt="Liệu pháp hương thơm" />
            <h3>Liệu pháp hương thơm</h3>
            <p>
              Trải nghiệm tinh dầu thiên nhiên trong không gian thư giãn nhẹ nhàng.
            </p>
          </div>

          <div className="card">
            <img src="/images/spa3.jpg" alt="Massage đá nóng" />
            <h3>Massage đá nóng</h3>
            <p>
              Thư giãn sâu với liệu trình đá nóng truyền thống, giúp lưu thông tuần hoàn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spa;
