import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { fullname, phone, password } = await req.json();

    if (!fullname || !phone || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("seed_db"); // database name
    const users = db.collection("users");

    // Check for existing phone
    const existingUser = await users.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { message: "Phone number already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    await users.insertOne({
      fullname,
      phone,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "User registered" }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Registration error:", message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
