const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    vendor_id: String,
    vendor_name: String,
    product: Array,
    delivery_address: Object,
    cart_value: Number,
    gst_applied_value: Number,
    paid_amount: Number,
    payment_method: String,
    order_status: String,
    payment_status: String,
    order_date: { type: Date, default: new Date() },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("order", orderSchema);

module.exports = order;
