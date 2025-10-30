import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import clientPromise from "@/lib/db"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type SeedDoc = {
  _id: unknown
  title?: string
  description?: string
  status?: string
  category?: string
  images?: string[]
  createdAt?: Date | string | null
}

export async function POST(req: Request) {
  try {
    // Ensure a single MongoClient connection is available
    const client = await clientPromise
  const dbName = process.env.MONGODB_DB || "seed_db"
  const db = client.db(dbName)
    const seeds = db.collection("seeds")

    const formData = await req.formData()
    const title = formData.get("title") as string
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as string
    const files = formData.getAll("images") as File[]

    // ✅ Create uploads directory if not exists
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })

    // ✅ Save files locally
    const savedFiles: string[] = []

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const uniqueName = `${uuidv4()}-${file.name}`
      const filePath = path.join(uploadDir, uniqueName)
      await writeFile(filePath, buffer)
      savedFiles.push(`/uploads/${uniqueName}`)
    }

    // save data to MongoDB (native driver)
    const insertResult = await seeds.insertOne({
      title,
      category,
      description,
      status,
      images: savedFiles,
      createdAt: new Date(),
    })
    const newSeed = await seeds.findOne({ _id: insertResult.insertedId })
    const safeSeed = newSeed
      ? {
          _id: String(newSeed._id),
          title: newSeed.title,
          category: newSeed.category,
          description: newSeed.description,
          status: newSeed.status,
          images: newSeed.images ?? [],
          createdAt: newSeed.createdAt,
        }
      : null

    return NextResponse.json(
      { message: "✅ Seed saved successfully!", seed: safeSeed },
      { status: 201 }
    )
  } catch (error) {
    console.error("❌ Error saving seed:", error)
    return NextResponse.json(
      { message: "Error saving seed", error: String(error) },
      { status: 500 }
    )
  }
}

// -------------------- GET (Fetch All Seeds) --------------------
export async function GET() {
  try {
  const client = await clientPromise
  const dbName = process.env.MONGODB_DB || "seed_db"
  const db = client.db(dbName)
    const seeds = db.collection("seeds")

    const allSeeds = await seeds
      .find({}, { projection: { title: 1, description: 1, status: 1, images: 1, category: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .toArray()

  const safe = allSeeds.map((doc: SeedDoc) => ({
      _id: String(doc._id),
      title: doc.title ?? "",
      description: doc.description ?? "",
      status: doc.status ?? "",
      category: doc.category ?? "",
      images: Array.isArray(doc.images) ? doc.images : [],
      createdAt: doc.createdAt ?? null,
    }))

    // Return array directly for client code expecting an array
    return NextResponse.json(safe, { status: 200 })
  } catch (error) {
    console.error("❌ Error fetching seeds:", error)
    return NextResponse.json(
      { message: "Error fetching seeds", error: String(error) },
      { status: 500 }
    )
  }
}