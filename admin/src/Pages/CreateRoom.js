import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../helper/utils";
import { createRoom, reset } from "../features/room/roomSlice";

const CreateRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isSuccess } = useSelector((state) => state.room);

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    roomNumbers: "",
  });

  const { name, price, desc, roomNumbers } = formData;

  // Kiểm tra đăng nhập
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  // Chuyển hướng khi tạo thành công
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess]);

  // Xử lý thay đổi text
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Xử lý thay đổi file
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Gửi form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !roomNumbers) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }

    // Chuyển roomNumbers thành object
    const roomArray = roomNumbers.split(",").map((num) => ({
      number: parseInt(num.trim()),
      unavailableDates: [],
    }));

    // Upload toàn bộ ảnh
    let list = [];
    list = await Promise.all(
      Object.values(files).map(async (file) => {
        const url = await uploadImage(file);
        return url;
      })
    );

    const dataToSubmit = {
      name,
      price,
      desc,
      roomNumbers: roomArray,
      img: list,
    };

    dispatch(createRoom(dataToSubmit));
  };

  return (
    <div className="container">
      <h1 className="heading center">Tạo phòng</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="input-group">
            <label>Tên phòng</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Nhập tên phòng"
              onChange={handleChange}
            />
          </div>

          {/* PRICE */}
          <div className="input-group">
            <label>Giá phòng</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Nhập giá phòng"
              onChange={handleChange}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="input-group">
            <label>Mô tả</label>
            <textarea
              name="desc"
              value={desc}
              onChange={handleChange}
              placeholder="Mô tả phòng"
            ></textarea>
          </div>

          {/* ROOM NUMBERS */}
          <div className="input-group">
            <label>Số phòng</label>
            <textarea
              name="roomNumbers"
              value={roomNumbers}
              onChange={handleChange}
              placeholder="Ngăn cách bởi dấu phẩy (ví dụ: 101, 102, 201)"
            ></textarea>
          </div>

          {/* IMAGES */}
          <div className="input-group">
            <label>Hình ảnh</label>
            <input
              type="file"
              name="image"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <button type="submit">Tạo phòng</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
