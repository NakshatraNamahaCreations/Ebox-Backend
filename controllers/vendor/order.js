const orderSchema = require("../../models/vendor/order");

exports.vendorOrder = async (req, res) => {
  try {
    const {
      vendor_id,
      vendor_name,
      product,
      delivery_address,
      cart_value,
      gst_applied_value,
      paid_amount,
      payment_method,
      payment_status,
      order_status,
      order_date,
    } = req.body;
    const newOrder = new orderSchema({
      vendor_id,
      vendor_name,
      product,
      delivery_address,
      cart_value,
      gst_applied_value,
      paid_amount,
      payment_method,
      order_status,
      payment_status,
      order_date,
    });
    await newOrder.save();
    res.status(200).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getVendorOrder = async (req, res) => {
  try {
    const vendorOrder = await orderSchema.find({
      vendor_id: String(req.params.id),
    });
    if (!vendorOrder) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ vendorOrder: vendorOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
