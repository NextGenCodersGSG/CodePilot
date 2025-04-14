import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI as string;

if (!MONGO_URI) {
  throw new Error("⚠️ Error: MONGO_URI environment variable is missing!");
}

export async function connection() {
  if (mongoose.connection?.readyState >= 1) {
    return mongoose.connection; 
  }
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "CodePilot",
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    throw new Error("⚠️ Database connection attempt unsuccessful.");
  }
}