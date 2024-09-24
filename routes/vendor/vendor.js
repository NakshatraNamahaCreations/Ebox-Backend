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
  getAllVendor,
  loginWithMobile,
  getAllFilteroutVendor,
  addServiceRequiredFields,
  addServiceAdditionalDetails,
  getOnlyProductVendor,
  getVendorByServiceName,
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

// Configure storage for file uploads
const storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/additional_images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload1 = multer({ storage: storage1 });

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
router.post("/save-vendor-details/:id", addServiceRequiredFields);
router.put(
  "/add-service-additional-details/:id",
  upload1.fields([{ name: "images", maxCount: 5 }]),
  addServiceAdditionalDetails
);
router.post("/loginwithmobilenumber", loginWithMobile);
router.get("/getprofile/:id", getVendorProfile);
router.get("/getallvendor", getAllVendor);
router.get("/get-product-vendor", getOnlyProductVendor);
router.get("/filterout-vendors/:id", getAllFilteroutVendor);
router.get("/get-vendor-by-servicename/:name", getVendorByServiceName);
router.delete("/delete-vendor-profile", deleteVendorProfile);
router.put("/add-address/:id", addAddress);

module.exports = router;
