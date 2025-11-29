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

  // Check login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  // Redirect when created successfully
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      navigate("/rooms");
    }
  }, [isSuccess]);

  // Handle text change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !roomNumbers) {
      alert("Please fill all required fields");
      return;
    }

    // Convert roomNumbers into objects
    const roomArray = roomNumbers.split(",").map((num) => ({
      number: parseInt(num.trim()),
      unavailableDates: [],
    }));

    // Upload all images
    let list = [];
    list = await Promise.all(
      Object.values(files).map(async (file) => {
        const url = await uploadImage(file); // <-- trả về "/uploads/...png"
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
      <h1 className="heading center">Create Room</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter room name"
              onChange={handleChange}
            />
          </div>

          {/* PRICE */}
          <div className="input-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Enter price"
              onChange={handleChange}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="input-group">
            <label>Description</label>
            <textarea
              name="desc"
              value={desc}
              onChange={handleChange}
              placeholder="Room description"
            ></textarea>
          </div>

          {/* ROOM NUMBERS */}
          <div className="input-group">
            <label>Room Numbers</label>
            <textarea
              name="roomNumbers"
              value={roomNumbers}
              onChange={handleChange}
              placeholder="Separate by commas (ex: 101, 102, 201)"
            ></textarea>
          </div>

          {/* IMAGES */}
          <div className="input-group">
            <label>Images</label>
            <input
              type="file"
              name="image"     // <-- FIX QUAN TRỌNG!!!
              multiple
              onChange={handleFileChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
