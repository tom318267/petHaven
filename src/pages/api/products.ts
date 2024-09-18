import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { client } = await connectToDatabase();
      const db = client.db("test");
      const products = await db.collection("products").find({}).toArray();
      console.log("Fetched products:", products);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Error fetching products" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
