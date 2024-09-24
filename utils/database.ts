import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "test";

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri!);

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
