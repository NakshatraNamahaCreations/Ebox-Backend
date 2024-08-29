const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id: String,
    product_id: String,
    product_image: String,
    store_or_seller: String,
    product_price: Number,
    applied_quantity: Number,
    totalPrice: Number,
    product_mrp: Number,
    product_name: String,

    vendor_id: String,
    vendor_name: String,
    // product: Array,
    delivery_address: Object,
    cart_value: Number,
    gst_applied_value: Number,
    paid_amount: Number,
    payment_method: String,
    order_status: String,
    payment_status: String,
    ordered_date: { type: Date, default: new Date() },
    returned_date: { type: Date },
    // cancelled_date: { type: Date },
    delivered_date: { type: Date },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("order", orderSchema);

module.exports = order;
