import "./profile.styles.scss";

const Profile = () => {
  // TODO: sau này lấy data thật từ API hoặc AuthContext
  const user = {
    name: "Nguyễn Văn A",
    email: "student@lavila.com",
    studentId: "2200006158",
    role: "student",
  };

  const bookings = [
    {
      id: "1",
      roomName: "test room 4",
      checkIn: "2025-01-24",
      checkOut: "2025-01-26",
      status: "Confirmed",
    },
  ];

  return (
    <div id="profile-page" className="container">
      <div className="profile-header">
        <div className="profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>MSSV: {user.studentId}</p>
        </div>
      </div>

      <div className="profile-grid">
        <section className="profile-card">
          <h2>Thông tin tài khoản</h2>
          <div className="profile-info-row">
            <span>Vai trò</span>
            <span>{user.role === "admin" ? "Quản trị viên" : "Sinh viên"}</span>
          </div>
          <div className="profile-info-row">
            <span>Mã số sinh viên</span>
            <span>{user.studentId}</span>
          </div>
        </section>

        <section className="profile-card profile-bookings">
          <h2>Lịch đặt phòng gần đây</h2>
          {bookings.length === 0 ? (
            <p>Chưa có lịch đặt nào.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Phòng</th>
                  <th>Nhận phòng</th>
                  <th>Trả phòng</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.roomName}</td>
                    <td>{b.checkIn}</td>
                    <td>{b.checkOut}</td>
                    <td>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
