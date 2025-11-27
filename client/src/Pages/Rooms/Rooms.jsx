import "./rooms.style.scss";
import RoomList from "../../component/RoomList/RoomList";

const Rooms = () => {
  return (
    <div id="rooms-page">

      {/* BANNER */}
      <div className="rooms-banner">
        <div className="overlay" />
        <h1 className="title">Danh sách phòng</h1>
        <p className="subtitle">Chọn phòng nghỉ phù hợp cho kỳ ở tuyệt vời của bạn</p>
      </div>

      {/* LIST ROOM */}
      <div className="rooms-container">
        <RoomList />
      </div>

    </div>
  );
};

export default Rooms;
