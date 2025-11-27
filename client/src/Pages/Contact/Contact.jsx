import "./contact.styles.scss";

const Contact = () => {
  return (
    <div id="contact-page">
      {/* HEADER */}
      <div className="contact-header">
        <h1>Liên hệ với chúng tôi</h1>
        <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
      </div>

      {/* CONTENT */}
      <div className="contact-container">

        <div className="contact-info">
          <h2>Thông tin liên hệ</h2>

          <p><strong>📍 Địa chỉ:</strong> 123 Nguyễn Huệ, Quận 1, TP.HCM</p>
          <p><strong>📞 Điện thoại:</strong> 0123 456 789</p>
          <p><strong>📧 Email:</strong> support@lavila.com</p>

          <h3>Giờ làm việc</h3>
          <p>Thứ 2 - Thứ 6: 08:00 - 22:00</p>
          <p>Thứ 7 - Chủ nhật: 09:00 - 18:00</p>
        </div>

        <div className="contact-map">
          <iframe
            title="google-map"
            src="https://maps.google.com/maps?q=ho%20chi%20minh&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
