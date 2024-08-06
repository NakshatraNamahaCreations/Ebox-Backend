const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    vendor_id: String,
    product_type: String,
    product_name: String,
    product_image: [String],
    product_video: String,
    product_category: String,
    product_price: Number,
    mrp_rate: Number,
    discount: Number,
    brand: String,
    stock_in_hand: Number,
    model_name: String,
    material_type: String,
    product_dimension: String,
    product_weight: String,
    country_of_orgin: String,
    warranty: String,
    manufature_name: String,
    product_color: String,
    Specifications: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    Reviews: [
      {
        user_id: String,
        user_name: String,
        review_title: String,
        review_description: String,
        ratings: Number,
        review_on: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const product = mongoose.model("Product", productSchema);

module.exports = product;
