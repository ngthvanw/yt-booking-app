import React from "react";
import { Link } from "react-router-dom";
import "./bookingList.styles.scss";

const BookingList = ({ data }) => {
  return (
    <div className="container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Phòng</th>
              <th>Thanh toán</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td>{item.name || "Không có"}</td>

                <td>{item.email}</td>

                <td>{item.roomId?.name || "Chưa chọn phòng"}</td>

                {/* ===== HÌNH THỨC THANH TOÁN ===== */}
                <td>
                  <span className={`method ${item.paymentMethod}`}>
                    {item.paymentMethod
                      ? item.paymentMethod.toUpperCase()
                      : "—"}
                  </span>
                </td>

                {/* ===== TRẠNG THÁI THANH TOÁN ===== */}
                <td>
                 <span
                    className={`status ${
                      item.paymentStatus === "paid" ? "paid" : "pending"
                    }`}
                  >
                    {item.paymentStatus === "paid"
                      ? "Đã thanh toán"
                      : "Chưa thanh toán"}
                  </span>

                </td>

                <td>
                  <Link to={`/booking/${item._id}`} className="view-btn">
                    Xem
                  </Link>
                </td>
                <td>
                  {item.totalAmount
                    ? item.totalAmount.toLocaleString() + " ₫"
                    : "—"}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
