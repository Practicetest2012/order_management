import { getDb } from "../db/db.js";

async function getOrders(userId) {
    try {
        const db = getDb()
        const collection = db.collection('orders')

        const result = await collection.find({ userId: userId }, { projection: { _id: 0 } }).toArray()

        return result
    }
    catch {
        console.error("Invalid User Orders")
    }
}
async function getPaymentForOrder(orderId) {
    try {
        const db = getDb()
        const collection = db.collection('payment')
        const result = await collection.findOne({ orderId: orderId }, { projection: { _id: 0 } })
        return result
    }
    catch (error) {
        console.error(error)
        console.error("Invalid order ")
    }
}

export { getOrders, getPaymentForOrder };