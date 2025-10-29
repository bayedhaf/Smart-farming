import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/db";

export async function POST(req: Request) {
  const { phone, password } = await req.json();

  if (!phone || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("seed_db");
  const users = db.collection("users");
  const user = await users.findOne({ phone });
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ message: "Invalid password" }, { status: 401 });

  return NextResponse.json({ message: "Login successful", user }, { status: 200 });
}
