const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const { createOrder, getMyOrders, getAllOrders } = require("../controllers/orderController");

const router = express.Router();

router.route("/")
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

router.get("/my", protect, getMyOrders);

module.exports = router;
