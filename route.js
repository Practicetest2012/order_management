import express from "express";
import { Router } from 'express';
import { login } from "./src/controllers/login.controller.js";
import { getUserById, updateUser } from "./src/controllers/user.controller.js"
import { getOrders , getPaymentForOrder } from "./src/controllers/order.controller.js";

const router = Router();


// Define a simple GET endpoint
router.get('/', (req, res) => {
  res.send("iam the / one ")
})
router.get('/users', (req, res) => {
  res.json(users)

})
router.get('/users/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (user) res.send(user)
  
    else res.status(404).json({ message: "user not found" })
  }
  catch {
    res.status(404).send({ message: "internal server error" })
  }
})
router.put('/users/:id', async (req, res) => {
  const id = req.params.id
  const requestbody = req.body
  console.log(requestbody)
  const user = await getUserById(id, requestbody)
  if (!requestbody) {
    res.status(404).send({ message: "invalid requst pay load" })
  }
  if (user) {
    try {
      await updateUser(id, requestbody)
      res.status(200).send({ message: "updated the users profile" })

    }
    catch (error) {
      res.status(500).send({ message: "internal server error" })
    }
  }
})
router.post("/login", async (req, res) => {
  try {
    const output = await login(req.body.userId, req.body.password)
    console.log(output)
    if (output) {
      res.setHeader("auth-token", token);
      res.json({ message: "login succesful" })
    }
    else {
      res.status(404).json({ message: "user not found" })
    }
  }
  catch {
    res.status(500).send({ message: "internal server errror" })
  }
  //  if(isValidUser){
  //   res.json({success: true , message: "login successful"})
  //  }else{
  //   res.status(401).json({success: false, message: "invalid ccredentials"})
  //  }

})
router.get('/orders', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: "userId is required" })
    }
    const Orders = await getOrders(userId)
    res.json(Orders)
  }
  catch (error) {
    res.status(404).send({ message: "internal server error" })
  }
})
router.get('/payment', async (req,res) => {
  try{
  const orderId = req.query.orderId;
  if(!orderId){
    return res.status(200).json({error : "orderId is required"})
  }
  const payment =await getPaymentForOrder(orderId)
  res.json(payment)
}
catch (error) {
  res.status(404).send({message:"internal server error"})
}

})


router.get('/hello', (req, res) => {
  res.send('Hello from Express route using ES6!');
});

export default router;