import mongoose from "mongoose";

const MONGO_DB_SERVER = process.env.MONGO_DB_SERVER as string;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_DB_SERVER);
  console.log("Connected to MongoDB");
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
};
