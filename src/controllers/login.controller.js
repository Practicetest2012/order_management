import crypto from "crypto"

import { getDb } from "../db/db.js"


 async function login(userId, password) {
    try {
         const db = getDb()
        const collection =  await db.collection('login')
        const result =  await collection.findOne({ userId : userId , password : password })
        return result? true:false
    }
    catch {
        console.error("login failed ")
    }
   

    
    
}
export {login};