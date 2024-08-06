const express = require("express");
const { refreshToken } = require("../../controllers/authController");
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  deleteUser,
} = require("../../controllers/user/userController");
// const authMiddleware = require("../../controllers/middleware/authMiddleware");

// Route for refreshing token
router.post("/refresh-token", refreshToken);
router.post("/register", register);
router.post("/login", login);
router.get("/getprofile/:id", getProfile);
router.put("/updateprofile/:id", updateProfile);
router.delete("/profile", deleteUser);

module.exports = router;
