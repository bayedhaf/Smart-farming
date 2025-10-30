import { MongoClient, type MongoClientOptions } from "mongodb";

// Prefer a standard (non-SRV) URI if provided to avoid SRV DNS issues
const uri = (process.env.MONGODB_STANDARD_URI || process.env.MONGODB_URI) as string; // e.g. mongodb://host1,host2/?tls=true OR mongodb+srv://...
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
      global._mongoClientPromise = client.connect().catch((err: unknown) => {
        const code = (err as { code?: string } | undefined)?.code;
        const msg = err instanceof Error ? err.message : String(err);
        console.error("MongoDB connection error (dev):", msg);
        if (code === "ETIMEOUT" || msg.includes("querySrv ETIMEOUT")) {
          console.error("Hint: SRV DNS lookup timed out. Set MONGODB_STANDARD_URI (non-SRV) in .env.local to bypass SRV.");
        }
        throw err;
      });
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect().catch((err: unknown) => {
      const code = (err as { code?: string } | undefined)?.code;
      const msg = err instanceof Error ? err.message : String(err);
      console.error("MongoDB connection error:", msg);
      if (code === "ETIMEOUT" || msg.includes("querySrv ETIMEOUT")) {
        console.error("Hint: SRV DNS lookup timed out. Set MONGODB_STANDARD_URI (non-SRV) in your environment to bypass SRV.");
      }
      throw err;
    });
  }

export default clientPromise;
