const express = require("express");
const Order = require("../model/Order");
const Product = require("../model/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Validasi order
const validateOrder = (req, res, next) => {
  const { items, shippingAddress, paymentMethod } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Items array is required and must not be empty" });
  }

  if (!shippingAddress || !shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.country) {
    return res.status(400).json({ error: "Complete shipping address is required" });
  }

  if (!paymentMethod || !["credit_card", "bank_transfer", "e_wallet"].includes(paymentMethod)) {
    return res.status(400).json({ error: "Valid payment method is required" });
  }

  next();
};

// CREATE ORDER (Checkout)
router.post("/", authMiddleware, validateOrder, async (req, res, next) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Validate and get product details
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }

      totalPrice += product.price * item.quantity;
      orderItems.push({
        product: item.productId,
        quantity: item.quantity,
        price: product.price
      });

      // Update product quantity
      product.quantity -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice,
      shippingAddress,
      paymentMethod
    });

    await order.populate("items.product user");

    res.status(201).json({
      message: "Order created successfully",
      order
    });
  } catch (err) {
    next(err);
  }
});

// GET USER ORDERS
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// GET SINGLE ORDER
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .populate("user", "-password");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Check if user owns this order
    if (order.user._id.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
});

// UPDATE ORDER STATUS (admin only - untuk demo bisa dari user)
router.put("/:id/status", authMiddleware, async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["pending", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("items.product");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
