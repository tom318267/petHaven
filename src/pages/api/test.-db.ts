import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!mongoose.connections[0].readyState) {
    try {
      if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
      await mongoose.connect(MONGODB_URI);
      res.status(200).json({ message: "Connected to MongoDB successfully!" });
    } catch (error) {
      res.status(500).json({
        error: "Failed to connect to MongoDB",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  } else {
    res.status(200).json({ message: "Already connected to MongoDB" });
  }
}
