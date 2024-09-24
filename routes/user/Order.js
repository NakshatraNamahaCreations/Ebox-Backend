const express = require("express");
const router = express.Router();
const {
  userOrder,
  getUserOrder,
  getAllOrder,
} = require("../../controllers/user/Order");

router.post("/user-order", userOrder);
router.get("/getorder/:id", getUserOrder);
router.get("/getallorder", getAllOrder);

module.exports = router;
