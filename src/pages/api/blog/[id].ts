import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../utils/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query; // Fetching the id from the query
      console.log("Attempting to find blog post with _id:", id);

      const { db } = await connectToDatabase();
      console.log("Connected to database");

      if (!ObjectId.isValid(id as string)) {
        console.log("Invalid ObjectId:", id);
        return res.status(400).json({ message: "Invalid blog post ID" });
      }

      const blogPost = await db
        .collection("blogs")
        .findOne({ _id: new ObjectId(id as string) });

      console.log("Query result:", blogPost);

      if (!blogPost) {
        console.log("Blog post not found in database");
        return res.status(404).json({ message: "Blog post not found" });
      }

      console.log("Blog post found:", blogPost);
      res.status(200).json(blogPost);
    } catch (error) {
      console.error("Error in API route:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
