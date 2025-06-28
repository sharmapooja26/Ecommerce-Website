import express from "express";
import {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
  placeOrderRazorpay,
  verifyRazorpay,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// verfiy payment
orderRouter.post("/verifyRazorpay", authUser, verifyRazorpay);

// User Feature
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;
