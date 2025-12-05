import { useState } from "react";
import { registerUser, reset } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      dispatch(reset());
    }
  }, [isSuccess, user, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      name,
      email,
      password,
    };

    dispatch(registerUser(dataToSubmit));
  };
  return (
    <div className="container">
      <h1 className="heading center">Đăng Ký</h1>

      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Tên</label>
            <input
              type="text"
              placeholder="Vui lòng nhập tên"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Vui lòng nhập Email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="Vui lòng nhập password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Xác Nhận</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
