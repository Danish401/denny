import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export default async function connectToDB() {
  try {
    if (mongoose.connections[0].readyState) return; // Check if already connected
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully", process.env.MONGODB_URI);
  } catch (e) {
    console.log("Database connection error: ", e);
  }
}
