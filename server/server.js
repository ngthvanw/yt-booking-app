const dotenv = require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");

const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const chatRoutes = require("./routes/chat.route");
const serviceBookingRoutes = require("./routes/serviceBookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");


const app = express();
const port = process.env.PORT || 5000;

// connect DB
connectDB();

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// routes API
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/service-bookings", serviceBookingRoutes);
app.use("/api/payment", paymentRoutes);



// phục vụ file ảnh
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// production build (nếu có)
if (process.env.NODE_ENV === "production") {
  const publicpath = path.join(__dirname, ".", "build");
  const filePath = path.resolve(__dirname, ".", "build", "index.html");
  app.use(express.static(publicpath));

  app.get("*", (req, res) => {
    return res.sendFile(filePath);
  });
}

app.use(errorHandler);

app.listen(port, () => console.log(`listening on port ${port}`));
console.log("BACKEND ĐANG CHẠY TẠI:", __dirname);
