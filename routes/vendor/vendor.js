const express = require("express");
const { refreshToken } = require("../../controllers/authController");
const router = express.Router();
const {
  vendorRegister,
  addBusinessDetails,
  vendorLogin,
  getVendorProfile,
  // updateVendorProfile,
  deleteVendorProfile,
  addAddress,
  loginWithMobile,
  getAllFilteroutVendor,
} = require("../../controllers/vendor/vendorController");
// const authMiddleware = require("../../controllers/middleware/authMiddleware");
const multer = require("multer");

const path = require("path");

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/vendor_profile/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route for refreshing token
router.post("/refresh-token", refreshToken);
router.post("/register", vendorRegister);
router.put(
  "/add-shop-details/:id",
  upload.fields([
    { name: "shop_image_or_logo", maxCount: 1 },
    // { name: "shop_logo", maxCount: 1 },
    { name: "vehicle_image", maxCount: 1 },
  ]),
  addBusinessDetails
);
router.post("/login", vendorLogin);
router.post("/loginwithmobilenumber", loginWithMobile);
router.get("/getprofile/:id", getVendorProfile);
// router.put("/update-profile/:id", updateVendorProfile);
router.get("/filterout-vendors/:id", getAllFilteroutVendor);
router.delete("/delete-vendor-profile", deleteVendorProfile);
router.put("/add-address/:id", addAddress);

module.exports = router;
