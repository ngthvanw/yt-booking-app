import React from "react";
import "./serviceBookingList.styles.scss";

const ServiceBookingList = ({ data }) => {
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
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                {/* Tên dịch vụ */}
                <td>{item.serviceName}</td>

                {/* Họ tên khách */}
                <td>{item.customerName || "—"}</td>

                {/* SĐT khách */}
                <td>{item.phoneNumber || "—"}</td>

                {/* Ngày */}
                <td>{new Date(item.date).toLocaleDateString("vi-VN")}</td>

                {/* Khung giờ */}
                <td>{item.timeSlot}</td>

                {/* Ghi chú */}
                <td>{item.note || "-"}</td>

                {/* Thời gian đặt */}
                <td>
                  {new Date(item.createdAt).toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
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
