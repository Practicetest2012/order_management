import { MongoClient } from "mongodb";

// Connection URL
const url = 'mongodb://localhost:27017';

let db;
let client;
// Database Name
const dbName = 'order_management';

export  async function init() {
  if(db) return db;
  client = new MongoClient(url, {maxPoolSize:10});
  await client.connect();
  db = client.db(dbName)
  return db;
}

export function getDb() {
  if (!db) throw new Error("not intialized");
return db;

}

export  async function closeConnection() {
  if(client) await client.close();
  client = undefined;
   db = undefined;
}

