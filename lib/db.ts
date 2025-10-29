import { MongoClient, type MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI as string; // e.g. "mongodb+srv://user:pass@cluster.mongodb.net"
// Increase timeouts to handle slower network / Atlas connections and provide better diagnostics
const options: MongoClientOptions = {
  // Increase socket/connect timeouts (ms)
  connectTimeoutMS: 60000,
  serverSelectionTimeoutMS: 60000,
};

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      // attach a catch so connection errors are logged early
      global._mongoClientPromise = client.connect().catch((err) => {
        console.error("MongoDB connection error (dev):", err);
        throw err;
      });
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }

export default clientPromise;
