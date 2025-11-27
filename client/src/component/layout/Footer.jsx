import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <h3>LaVila Booking</h3>
          <p>Ứng dụng quản lý phòng & lịch học cho đồ án MERN.</p>
          <p className="footer__copy">
            © {new Date().getFullYear()} LaVila. All rights reserved.
          </p>
        </div>

        <div>
          <h4>Chức năng</h4>
          <ul>
            <li>Quản lý phòng</li>
            <li>Quản lý lịch học</li>
            <li>Quản lý lịch thi</li>
          </ul>
        </div>

        <div>
          <h4>Liên hệ</h4>
          <ul>
            <li>Hotline: 0123 456 789</li>
            <li>Email: info@lavila.com</li>
            <li>TP.HCM</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
