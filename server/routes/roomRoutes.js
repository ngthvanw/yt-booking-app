const express = require("express");
const {
  getRooms,
  createRoom,
  getRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

// nếu có middleware auth thì import ở đây
// const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(getRooms)
  .post(/*protect, isAdmin,*/ createRoom);

router.route("/:id")
  .get(getRoom)
  .put(/*protect, isAdmin,*/ updateRoom)
  .delete(/*protect, isAdmin,*/ deleteRoom);

module.exports = router;
