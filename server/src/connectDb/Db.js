import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDatabase = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const url = process.env.MONGO_URI;

      if (!url) {
        throw new Error("MONGO_URI not found");
      }

      cached.promise = mongoose.connect(url, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      });
    }

    cached.conn = await cached.promise;

    console.log("Database connected");

    return cached.conn;
  } catch (error) {
    cached.promise = null;

    console.log("Database connection error:", error);

    throw error;
  }
};

export default connectDatabase;