import { getDb } from "../db/db.js"; 



async function getUserById(userId){
    try{
     console.log(userId)
    const db = getDb()
    const collection = await db.collection("users")
    const result =  await collection.findOne({userId : userId})
     
    return result
    }
    catch {
        console.log("connection is not happening ")
    }
    
}
async function updateUser(userId, userDetails){
    try{
        const db = getDb();
        const collection =  await db.collection("users");
         await collection.updateOne({userId : userId  }, { $set: {address : userDetails.address , updated : true}})

    }
    catch(error){
        console.error("error")
        throw new Error ("update failed")
    }
    

    


}
export {getUserById,updateUser};