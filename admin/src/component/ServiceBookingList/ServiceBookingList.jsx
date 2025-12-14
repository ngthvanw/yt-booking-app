import React from "react";
import "./serviceBookingList.styles.scss";

const ServiceBookingList = ({ data, setData }) => {
  // Xóa 1 booking dịch vụ
  const handleDelete = async (id) => {
    const ok = window.confirm("Bạn có chắc muốn xóa đặt dịch vụ này?");
    if (!ok) return;

    try {
      await fetch(`http://localhost:5000/api/service-bookings/${id}`, {
        method: "DELETE",
      });

      // Cập nhật lại bảng (không cần reload)
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      alert("Xóa không thành công!");
    }
  };

  return (
    <div className="container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Dịch vụ</th>
              <th>Họ và tên</th>
              <th>Số điện thoại</th>
              <th>Ngày</th>
              <th>Khung giờ</th>
              <th>Ghi chú</th>
              <th>Thời gian đặt</th>
              <th>Hành động</th> {/* 👈 thêm */}
            </tr>
          </thead>

          <tbody>
            {data?.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  Không có dữ liệu
                </td>
              </tr>
            )}

            {data?.map((item) => (
              <tr key={item._id}>
                <td>{item.serviceName}</td>
                <td>{item.customerName || "—"}</td>
                <td>{item.phoneNumber || "—"}</td>

                <td>
                  {new Date(item.date).toLocaleDateString("vi-VN")}
                </td>

                <td>{item.timeSlot}</td>
                <td>{item.note || "-"}</td>

                <td>
                  {new Date(item.createdAt).toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>

                {/* 👇 NÚT XÓA */}
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceBookingList;
