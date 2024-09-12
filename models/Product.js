const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    petType: { type: String, required: true },
    petAge: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    // Add other fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
