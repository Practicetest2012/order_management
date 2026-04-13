import { Router } from 'express';
import { login } from "./src/controllers/login.controller.js";
import { getUserById, updateUser } from "./src/controllers/user.controller.js";
import { getOrders, getPaymentForOrder } from "./src/controllers/order.controller.js";

const router = Router();

/* -------------------- HEALTH CHECK -------------------- */
router.get('/', (req, res) => {
  res.send("API is running...");
});

/* -------------------- USERS -------------------- */

// Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Update user
router.put('/users/:id', async (req, res) => {
  try {
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

    return res.status(200).json({ message: "User updated successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/* -------------------- AUTH -------------------- */

router.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ message: "userId and password are required" });
    }

    const result = await login(userId, password);

    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Assuming login() returns a token
    const { token } = result;

    return res
      .status(200)
      .setHeader("auth-token", token)
      .json({ message: "Login successful", token });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/* -------------------- ORDERS -------------------- */

// Get orders by userId
router.get('/orders', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const orders = await getOrders(userId);

    return res.status(200).json(orders);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get payment by orderId
router.get('/payment', async (req, res) => {
  try {
    const { orderId } = req.query;

    if (!orderId) {
      return res.status(400).json({ message: "orderId is required" });
    }

    const payment = await getPaymentForOrder(orderId);

    return res.status(200).json(payment);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/* -------------------- TEST -------------------- */
router.get('/hello', (req, res) => {
  res.send('Hello from Express route using ES6!');
});

export default router;git 