import "./dining.styles.scss";

const Dining = () => {
  return (
    <div id="dining">
      {/* Banner */}
      <div className="dining-banner">
        <img src="/images/dining-banner.jpg" alt="Nhà hàng" />

        <div className="overlay">
          <h1 className="title">Ẩm thực đẳng cấp</h1>
          <p className="subtitle">
            Thưởng thức tinh hoa ẩm thực trong không gian sang trọng.
          </p>
        </div>
      </div>

      {/* Nội dung */}
      <div className="container">
        <h2 className="section-title">Nhà hàng của chúng tôi</h2>

        <div className="dining-grid">
          <div className="card">
            <img src="/images/dining1.jpg" alt="Nhà hàng Royal Signature" />
            <h3>Nhà hàng Royal Signature</h3>
            <p>
              Ẩm thực Châu Âu – Châu Á được chế biến bởi các đầu bếp giàu kinh nghiệm,
              mang đến trải nghiệm tinh tế cho mọi giác quan.
            </p>
          </div>

          <div className="card">
            <img src="/images/dining2.jpg" alt="Skyline Bar & Lounge" />
            <h3>Skyline Bar &amp; Lounge</h3>
            <p>
              Thư giãn cùng cocktail thượng hạng và ngắm nhìn toàn cảnh thành phố về đêm.
            </p>
          </div>

          <div className="card">
            <img src="/images/dining3.jpg" alt="Garden Terrace Café" />
            <h3>Garden Terrace Café</h3>
            <p>
              Không gian ngoài trời thoáng mát, lý tưởng để thưởng thức cà phê hoặc bữa sáng nhẹ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dining;
