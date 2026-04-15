import { Router } from "express";
import jwt from "jsonwebtoken";

import { login } from "./src/controllers/login.controller.js";
import { getUserById, updateUser } from "./src/controllers/user.controller.js";
import { getOrders, getPaymentForOrder } from "./src/controllers/order.controller.js";

const router = Router();
const JWT_SECRET = "your_secret_key"; // ⚠️ move to .env in production

/* -------------------- HELPER -------------------- */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* -------------------- HEALTH CHECK -------------------- */
router.get("/", (req, res) => {
  res.send("API is running...");
});

/* -------------------- USERS -------------------- */

// Get user by ID
router.get(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  })
);

// Update user
router.put(
  "/users/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    if (!payload || Object.keys(payload).length === 0) {
      return res.status(400).json({ message: "Invalid request payload" });
    }

    const existingUser = await getUserById(id);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await updateUser(id, payload);

    res.status(200).json({ message: "User updated successfully" });
  })
);

/* -------------------- AUTH -------------------- */

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res
        .status(400)
        .json({ message: "userId and password are required" });
    }

    const isValid = await login(userId, password);

    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

    res
      .status(200)
      .setHeader("auth-token", token)
      .json({
        message: "Login successful",
        token,
      });
  })
);

/* -------------------- ORDERS -------------------- */

// Get orders by userId
router.get(
  "/orders",
  asyncHandler(async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const orders = await getOrders(userId);

    res.status(200).json(orders);
  })
);

// Get payment by orderId
router.get(
  "/payment",
  asyncHandler(async (req, res) => {
    const { orderId } = req.query;

    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    const payment = await getPaymentForOrder(orderId);

    res.status(200).json(payment);
  })
);

/* -------------------- TEST -------------------- */
router.get("/hello", (req, res) => {
  res.send("Hello from Express route using ES6!");
});

/* -------------------- GLOBAL ERROR HANDLER -------------------- */
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

export default router;