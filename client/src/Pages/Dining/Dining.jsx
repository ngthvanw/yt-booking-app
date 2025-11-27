import "./dining.styles.scss";

const Dining = () => {
  return (
    <div id="dining-page">
      <div className="dining-header">
        <h1>Dining & Restaurant</h1>
        <p>Trải nghiệm ẩm thực sang trọng chuẩn 5 sao.</p>
      </div>

      <div className="dining-gallery">
        <img src="/dining/d1.jpg" alt="dining" />
        <img src="/dining/d2.jpg" alt="dining" />
        <img src="/dining/d3.jpg" alt="dining" />
        <img src="/dining/d4.jpg" alt="dining" />
      </div>

      <div className="dining-info">
        <h2>Món ăn đặc biệt</h2>
        <p>
          Nhà hàng phục vụ đa dạng món Á – Âu với nguyên liệu cao cấp, 
          đảm bảo trải nghiệm tuyệt vời cho mọi thực khách.
        </p>
      </div>
    </div>
  );
};

export default Dining;
