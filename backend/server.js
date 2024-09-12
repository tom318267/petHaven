require("dotenv").config();
const express = require("express");
const path = require("path");
const productRoutes = require("./routes/product"); // This line needs to be updated
const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/pet-haven";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the uploads directory
app.use("/uploads", express.static("uploads"));

// Use product routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5001; // Change 5000 to 3000 or any other available port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
