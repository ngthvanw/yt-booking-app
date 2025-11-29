import "./footer.styles.scss";

const Footer = () => {
  return (
    <footer className="info-footer">
      <div className="container">

        <div className="footer-grid">

          {/* Cột 1 */}
          <div className="col">
            <h3 className="brand">Royal Hotel</h3>
            <p className="desc">
              Khách sạn 5 sao mang đến sự sang trọng, đẳng cấp và trải nghiệm hoàn hảo.
            </p>

            <p className="section-title">Hotline</p>
            <p className="highlight">028 3827 0404</p>

            <p className="section-title">Email</p>
            <p>contact@royalhotel.com</p>
          </div>

          {/* Cột 2 */}
          <div className="col">
            <p className="section-title">Địa chỉ</p>
            <p>Hồ Chí Minh: 164 Lê Thánh Tôn, Bến Thành</p>
            <p>Hà Nội: 11B Nguyễn Siêu, Hoàn Kiếm</p>
            <p>Đà Nẵng: 12 Phạm Phú Thứ, Hải Châu</p>
          </div>

          {/* Cột 3 */}
          <div className="col">
            <p className="section-title">Giờ làm việc</p>
            <p>Thứ 2 – Chủ nhật</p>
            <p>08:00 – 22:00</p>

            <p className="section-title">Theo dõi chúng tôi</p>
            <div className="social">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Royal Hotel. Tất cả quyền được bảo lưu.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
