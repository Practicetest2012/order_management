import { Router } from "express";
import jwt from "jsonwebtoken";

import { login } from "./src/controllers/login.controller.js";
import { getUserById, updateUser } from "./src/controllers/user.controller.js";
import { getOrders, getPaymentForOrder } from "./src/controllers/order.controller.js";

const router = Router();
const JWT_SECRET = "your_secret_key";

/* Health */
router.get("/", (req, res) => res.send("API running"));

/* Users */
router.get("/users/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.put("/users/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const user = await getUserById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await updateUser(id, req.body);
  res.json({ message: "Updated successfully" });
});

/* Auth */
router.post("/login", async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const isValid = await login(userId, password);
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

  res.setHeader("auth-token", token).json({ token });
});

/* Orders */
router.get("/orders", async (req, res) => {
  if (!req.query.userId) {
    return res.status(400).json({ message: "userId required" });
  }

  const orders = await getOrders(req.query.userId);
  res.json(orders);
});

router.get("/payment", async (req, res) => {
  if (!req.query.orderId) {
    return res.status(400).json({ message: "orderId required" });
  }

  const payment = await getPaymentForOrder(req.query.orderId);
  res.json(payment);
});

/* Error handler */
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

export default router;