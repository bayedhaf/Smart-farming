#!/usr/bin/env node
// Simple MongoDB connectivity test. It uses MONGODB_URI from the environment.
// Usage:
// 1) export MONGODB_URI="your-uri-here"
// 2) node scripts/test-mongo-conn.js

let MongoClient;

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI not set. Copy it from .env.local and run:');
  console.error('  export MONGODB_URI="<your-uri>"');
  process.exit(1);
}

const options = {
  connectTimeoutMS: 60000,
  serverSelectionTimeoutMS: 60000,
};

(async () => {
  try {
    const mongodb = await import('mongodb');
    MongoClient = mongodb.MongoClient;
  } catch (impErr) {
    console.error('Failed to import mongodb package:', impErr);
    process.exit(2);
  }

  const client = new MongoClient(uri, options);
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully. Listing databases:');
    const admin = client.db().admin();
    const result = await admin.listDatabases();
    console.log(JSON.stringify(result, null, 2));
    await client.close();
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:');
    console.error(err);
    if (err && err.stack) console.error(err.stack);
    process.exit(2);
  }
})();
