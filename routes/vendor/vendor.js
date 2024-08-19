const express = require("express");
const { refreshToken } = require("../../controllers/authController");
const router = express.Router();
const {
  vendorRegister,
  vendorLogin,
  getVendorProfile,
  updateVendorProfile,
  deleteVendorProfile,
  addAddress,
  loginWithMobile,
  getAllFilteroutVendor,
} = require("../../controllers/vendor/vendorController");
// const authMiddleware = require("../../controllers/middleware/authMiddleware");

// Route for refreshing token
router.post("/refresh-token", refreshToken);
router.post("/register", vendorRegister);
router.post("/login", vendorLogin);
router.post("/loginwithmobilenumber", loginWithMobile);
router.get("/getprofile/:id", getVendorProfile);
router.put("/update-profile/:id", updateVendorProfile);
router.get("/filterout-vendors/:id", getAllFilteroutVendor);
router.delete("/delete-vendor-profile", deleteVendorProfile);
router.put("/add-address/:id", addAddress);

module.exports = router;
