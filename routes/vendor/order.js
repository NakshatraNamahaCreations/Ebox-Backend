const express = require("express");
const router = express.Router();
const {
  vendorOrder,
  getVendorOrder,
} = require("../../controllers/vendor/order");

router.post("/create-order", vendorOrder);
router.get("/get-vendor-order/:id", getVendorOrder);

module.exports = router;
