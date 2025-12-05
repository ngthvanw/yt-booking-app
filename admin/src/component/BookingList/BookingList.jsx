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
              <th>Xác nhận</th>
              <th>Hành động</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td>{item.name || "Không có"}</td>
                <td>{item.email}</td>

                <td>{item.roomId?.name || "Chưa chọn phòng"}</td>

                <td>{item.confirmed ? "Đã xác nhận" : "Chưa xác nhận"}</td>

                <td>
                  <Link to={`/booking/${item._id}`} className="view-btn">
                    Xem
                  </Link>
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
