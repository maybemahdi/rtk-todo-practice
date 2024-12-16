import mongoose, { Mongoose } from "mongoose";

let isConnected = false; // Track the connection status

export const connectDB = async (): Promise<Mongoose> => {
  // Get the MongoDB URI from environment variables
  const uri: string = process.env.MONGODB_URI || "mongodb://localhost:27017/";

  try {
    if (isConnected) {
      console.log("Already connected to MongoDB");
      return mongoose;
    }

    const connection = await mongoose.connect(uri);

    isConnected = true; // Set the connection flag to true
    console.log("Connected to MongoDB with Mongoose");

    return connection;
  } catch (error) {
    console.error("Failed to connect to MongoDB with Mongoose", error);
    throw error;
  }
};
