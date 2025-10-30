// #!/usr/bin/env node
// /*
// 	MongoDB connectivity test

// 	Usage examples:
// 		# Uses MONGODB_STANDARD_URI if set, else MONGODB_URI
// 		node scripts/test-mongo-conn.js

// 		# Explicitly set URI for this run
// 		MONGODB_URI="mongodb://127.0.0.1:27017/seed_db" node scripts/test-mongo-conn.js

// 		# Choose a DB and run ping command (instead of listing databases)
// 		node scripts/test-mongo-conn.js --db seed_db --ping

// 	Exit codes:
// 		0 = success
// 		1 = missing configuration / usage error
// 		2 = connection or query failed
// */

// (async () => {
// 	const args = process.argv.slice(2);
// 	const getArg = (flag) => {
// 		const idx = args.indexOf(flag);
// 		if (idx >= 0 && idx + 1 < args.length) return args[idx + 1];
// 		return undefined;
// 	};
// 	const hasFlag = (flag) => args.includes(flag);

// 	const dbName = getArg("--db");
// 	const doPing = hasFlag("--ping");

// 	const uri = process.env.MONGODB_STANDARD_URI || process.env.MONGODB_URI;
// 	if (!uri) {
// 		console.error("[test-mongo] No MongoDB URI found. Set MONGODB_STANDARD_URI or MONGODB_URI in your environment.");
// 		console.error("Example: export MONGODB_STANDARD_URI=\"mongodb://host1,host2,host3/seed_db?replicaSet=atlas-XXXX&retryWrites=true&w=majority&tls=true\"");
// 		process.exit(1);
// 	}

// 	let MongoClient;
// 	try {
// 		({ MongoClient } = await import("mongodb"));
// 	} catch (e) {
// 		console.error("[test-mongo] Failed to import 'mongodb' package. Did you run 'npm install'?\n", e);
// 		process.exit(1);
// 	}

// 	const options = {
// 		connectTimeoutMS: 60000,
// 		serverSelectionTimeoutMS: 60000,
// 	};

// 	console.log("[test-mongo] Connecting using URI:");
// 	console.log(uri.replace(/:(?:[^@/]+)@/, ":******@")); // redact password

// 	const client = new MongoClient(uri, options);
// 	try {
// 		await client.connect();
// 		console.log("[test-mongo] Connected OK");

// 		if (doPing) {
// 			const targetDb = client.db(dbName || undefined);
// 			const pingRes = await targetDb.command({ ping: 1 });
// 			console.log("[test-mongo] Ping result:", pingRes);
// 		} else {
// 			const admin = client.db().admin();
// 			const dbs = await admin.listDatabases();
// 			console.log("[test-mongo] Databases:", JSON.stringify(dbs, null, 2));
// 		}

// 		await client.close();
// 		process.exit(0);
// 	} catch (err) {
// 		const code = err && typeof err === "object" && "code" in err ? err.code : undefined;
// 		const msg = err instanceof Error ? err.message : String(err);
// 		console.error("[test-mongo] Connection failed:", msg);
// 		if (code) console.error("[test-mongo] Error code:", code);

// 		if (msg.includes("querySrv ETIMEOUT")) {
// 			console.error("\nHint: SRV DNS lookup timed out.\n- Prefer using a standard (non-SRV) URI in .env.local: MONGODB_STANDARD_URI=mongodb://...\n- Or ensure your DNS/network can resolve SRV records for your Atlas cluster.");
// 		}
// 		if (msg.includes("ENOTFOUND") || msg.includes("getaddrinfo ENOTFOUND")) {
// 			console.error("\nHint: Hostname not found. Check your URI hostnames or network DNS settings.");
// 		}
// 		if (msg.toLowerCase().includes("authentication")) {
// 			console.error("\nHint: Authentication failed. Verify username/password and that the user has access to the target DB.");
// 		}

// 		try { await client.close(); } catch {}
// 		process.exit(2);
// 	}
// })();

