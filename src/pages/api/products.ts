import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
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
      break;

    case "POST":
      try {
        const { client } = await connectToDatabase();
        const db = client.db("test");
        const product = req.body;
        const result = await db.collection("products").insertOne(product);
        console.log("Added new product:", result.insertedId);
        res
          .status(201)
          .json({
            message: "Product added successfully",
            productId: result.insertedId,
          });
      } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Error adding product" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
