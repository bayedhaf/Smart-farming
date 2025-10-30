import { NextResponse } from "next/server"
import clientPromise from "@/lib/db"
import { ObjectId } from "mongodb"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const revalidate = 0

type SeedDoc = {
  _id: unknown
  title?: string
  description?: string
  status?: string
  category?: string
  images?: string[]
  createdAt?: Date | string | null
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id?: string }> }
) {
  try {
    const { id } = await context.params
    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 })
    }
    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 })
    }

    const client = await clientPromise
    const dbName = process.env.MONGODB_DB || "seed_db"
    const db = client.db(dbName)
    const seeds = db.collection("seeds")

    const doc = (await seeds.findOne(
      { _id: objectId },
      { projection: { title: 1, description: 1, status: 1, images: 1, category: 1, createdAt: 1 } }
    )) as SeedDoc | null

    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 })
    }

    const safe = {
      _id: String(id),
      title: doc.title ?? "",
      description: doc.description ?? "",
      status: doc.status ?? "",
      category: doc.category ?? "",
      images: Array.isArray(doc.images) ? doc.images : [],
      createdAt: doc.createdAt ?? null,
    }

    return NextResponse.json(safe, { status: 200 })
  } catch (error) {
    console.error("❌ Error fetching seed by id:", error)
    return NextResponse.json(
      { message: "Error fetching seed", error: String(error) },
      { status: 500 }
    )
  }
}
