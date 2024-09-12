const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/pet-haven", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
