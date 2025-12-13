import mongoose from "mongoose";

// MongoDB URI - Next.js automatically loads .env files
const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectToDB() {
  try {
    // Check if already connected
    if (mongoose.connections[0].readyState) {
      console.log("Already connected to database");
      return;
    }

    // Validate MongoDB URI
    if (!MONGODB_URI) {
      console.error("MONGODB_URI is not defined in environment variables");
      throw new Error("Please define MONGODB_URI in your .env file");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully");
  } catch (e) {
    console.error("Database connection error:", e.message);
    throw e;
  }
}
