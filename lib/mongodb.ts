import mongoose from "mongoose";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const MONGODB_URI = (process.env.MONGODB_URI || process.env.MONGO_URI) as string;
const DB_NAME = process.env.DB_NAME; // Removed hardcoded default

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }
  if (cached.conn) {
    // If DB_NAME is provided, ensure we are connected to it. 
    // Otherwise, assume the connection from URI is sufficient.
    if (!DB_NAME || cached.conn.connection?.db?.databaseName === DB_NAME) {
      return cached.conn;
    }
    await cached.conn.disconnect();
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };
    if (DB_NAME) {
      opts.dbName = DB_NAME;
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
