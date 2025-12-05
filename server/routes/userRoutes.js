const express = require("express");
const router = express.Router();

// ⭐ FIX QUAN TRỌNG
const auth = require("../middleware/authMiddleware");

const { 
  getUsers,
  createUser,
  loginUser,
  logoutUser
} = require("../controllers/userController");

// ⭐ ROUTES
router.get("/", auth, getUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
