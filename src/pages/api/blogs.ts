import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { client } = await connectToDatabase();
  const db = client.db("test"); // Use your actual database name

  switch (method) {
    case "GET":
      try {
        const blogs = await db.collection("blogs").find({}).toArray();
        res.status(200).json(blogs);
      } catch (error) {
        res.status(500).json({ error: "Error fetching blogs" });
      }
      break;

    case "POST":
      try {
        const blog = req.body;
        const result = await db.collection("blogs").insertOne(blog);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Error creating blog" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
