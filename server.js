import bcrypt from "bcrypt";
import { getDb } from "../db/db.js";

async function login(userId, password) {
    try {
        if (!userId || !password) {
            throw new Error("UserId and password are required");
        }

        const db = getDb();
        const collection = db.collection("login");

        // Find user by userId only
        const user = await collection.findOne({ userId: userId });

        if (!user) {
            return false;
        }

        // Compare password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);

        return isMatch;
    } catch (error) {
        console.error("Login failed:", error.message);
        return false;
    }
}

export { login };