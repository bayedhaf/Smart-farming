import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image"
import Link from "next/link"
import clientPromise from "@/lib/db"
import type { ObjectId } from "mongodb"

type SeedItem = {
  _id: ObjectId
  title: string
  description: string
  status: string
  images?: string[]
}

// Async server component
export default async function UserDashboard() {
  // Read seeds directly from MongoDB to avoid base URL issues
  let seeds: SeedItem[] = []
  try {
    const client = await clientPromise
    const dbName = process.env.MONGODB_DB || "seed_db"
    const db = client.db(dbName)
    const collection = db.collection<SeedItem>("seeds")
    seeds = await collection
      .find({}, { projection: { title: 1, description: 1, status: 1, images: 1 } })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()
  } catch (e) {
    // Swallow DB errors for UI; consider logging server-side
    console.error("Dashboard seeds load error:", e)
  }

  const statusColors: Record<string, string> = {
    "Germinated": "bg-green-200 text-green-800",
    "Ready for Planting": "bg-yellow-200 text-yellow-800",
    "Shared": "bg-blue-200 text-blue-800",
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 via-green-100 to-green-200 p-6">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-green-700">
          Germination & Seed Sharing Dashboard
        </h1>
        <p className="text-lg md:text-xl text-green-800">
          Track germination, multiply seeds, and share for planting areas
        </p>
      </div>

      {/* Seeds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {seeds.map((seed: SeedItem) => (
          <Card
            key={seed._id.toString()}
            className="bg-white hover:bg-green-50 transition-transform transform hover:scale-105 shadow-lg rounded-xl border-none"
          >
            <CardHeader className="p-0">
              <Image
    src={seed?.images?.[0] || "/images.jpg"}
                alt={seed.title}
                width={500}
                height={300}
                className="w-full h-40 object-cover rounded-t-xl"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg font-bold text-green-700">{seed.title}</CardTitle>
              <CardDescription className="text-gray-700 mb-2">{seed.description}</CardDescription>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[seed.status]}`}
              >
                {seed.status}
              </span>
            </CardContent>
            <CardFooter>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                View Details →
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add Seed Floating Button */}
      <Button
        className="fixed bottom-6 right-6 bg-linear-to-br from-green-400 to-green-600 text-white rounded-full w-14 h-14 text-2xl shadow-xl hover:scale-110 transition-transform"
        aria-label="Add Seed"
      >
        <Link href="/dashboard/add-seed">+</Link>
      </Button>
    </div>
  )
}
