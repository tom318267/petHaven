const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");

    // Create a simple schema and model for testing
    const TestSchema = new mongoose.Schema({ name: String });
    const Test = mongoose.model("Test", TestSchema);

    // Try to create a document
    await Test.create({ name: "Test Document" });
    console.log("Test document created successfully");

    // Find the document
    const doc = await Test.findOne({ name: "Test Document" });
    console.log("Found document:", doc);

    // Clean up: delete the test document and collection
    await Test.deleteMany({});
    await mongoose.connection.db.dropCollection("tests");

    console.log("Test completed successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

connectDB();
