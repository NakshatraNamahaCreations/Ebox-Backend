const UserOrder = require("../../models/user/Order");

// exports.userOrder = async (req, res) => {
//   try {
//     const orders = req.body;
//     console.log("orders", orders);

//     const savedOrders = await Promise.all(
//       orders?.map(async (orderData) => {
//         const newOrder = new UserOrder(orderData);
//         await newOrder.save();
//         return newOrder;
//       })
//     );
//     if (!savedOrders) {
//       return res.status(404).json({ message: "Order not found" });
//     }
//     res.status(200).json({ message: "Orders placed", success: savedOrders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.userOrder = async (req, res) => {
//   try {
//     const { constructingCart } = req.body; // Extract 'constructingCart' array from the request body
//     console.log("constructingCart", constructingCart);

//     if (!Array.isArray(constructingCart)) {
//       return res.status(400).json({ message: "Invalid order data" });
//     }

//     const savedOrders = await Promise.all(
//       constructingCart.map(async (orderData) => {
//         const newOrder = new UserOrder(orderData);
//         await newOrder.save();
//         return newOrder;
//       })
//     );

//     if (!savedOrders || savedOrders.length === 0) {
//       return res.status(404).json({ message: "Orders not found" });
//     }

//     res.status(200).json({ message: "Orders placed", success: savedOrders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.userOrder = async (req, res) => {
  try {
    const {
      productdata,
      receiver_mobilenumber,
      receiver_name,
      delivery_address,
      gst_applied_value,
      paid_amount,
      payment_method,
      payment_status,
      order_status,
      user_id,
      user_name,
      event_data,
      event_name,
    } = req.body;
    const newOrder = new UserOrder({
      productdata,
      receiver_mobilenumber,
      receiver_name,
      delivery_address,
      gst_applied_value,
      paid_amount,
      payment_method,
      payment_status,
      order_status,
      user_id,
      user_name,
      event_data,
      event_name,
    });
    await newOrder.save();
    res.status(200).json({ message: "Order placed", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const allProduct = await UserOrder.find();

    if (allProduct.length < 0) {
      return res.status(404).json({ message: "products not found" });
    }
    res.status(200).json(allProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const userOrder = await UserOrder.find({
      user_id: String(req.params.id),
    });
    if (!userOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ userOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
