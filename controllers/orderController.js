const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  });

  const created = await order.save();
  res.status(201).json(created);
};

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// Admin: Get all orders
const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate("user", "name email");
  res.json(orders);
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
};
