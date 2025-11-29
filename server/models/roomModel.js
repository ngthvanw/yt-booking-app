const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  img: {
    type: [String], // mảng đường dẫn ảnh
  },
  roomNumbers: {
    type: [
      {
        number: Number,
        unavailableDates: [Date],
      },
    ],
  },
});

module.exports = mongoose.model("Room", roomSchema);
