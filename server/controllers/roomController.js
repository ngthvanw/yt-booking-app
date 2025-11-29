const Room = require("../models/roomModel");

// GET /api/rooms
const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    return res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};

// POST /api/rooms
const createRoom = async (req, res, next) => {
  try {
    console.log("REQ BODY:", req.body);

    const { name, price, desc, img, roomNumbers } = req.body;

    if (!name || !price || !roomNumbers) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const room = await Room.create({
      name,
      price,
      desc,
      img,          // <- QUAN TRỌNG
      roomNumbers,
    });

    return res.status(201).json(room); // trả về room mới tạo
  } catch (error) {
    next(error);
  }
};

// GET /api/rooms/:id
const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      res.status(404);
      throw new Error("room not found");
    }

    return res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

// PUT /api/rooms/:id
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedRoom) {
      res.status(400);
      throw new Error("cannot update room");
    }

    return res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/rooms/:id
const deleteRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      res.status(400);
      throw new Error("room not deleted");
    }

    return res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
};
