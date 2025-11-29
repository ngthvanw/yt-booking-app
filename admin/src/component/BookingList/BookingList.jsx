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
              <th>Full Name</th>
              <th>Email</th>
              <th>Room</th>
              <th>Confirmed</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data
              ?.filter(Boolean)
              ?.map((item) => (
                <tr key={item._id}>
                  <td>{item.fullName || "N/A"}</td>
                  <td>{item.email || "N/A"}</td>
                  <td>{item.room?.roomNumber || "No Room"}</td>
                  <td>{item.confirmed ? "Yes" : "No"}</td>
                  <td>
                    <Link to={`/bookings/${item._id}`}>View</Link>
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
