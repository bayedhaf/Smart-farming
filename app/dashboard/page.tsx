'use client'

import { useEffect, useState } from "react"
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

type SeedItem = {
  _id: string
  title: string
  description: string
  status: string
  images?: string[]
}

export default function UserDashboard() {
  const [seeds, setSeeds] = useState<SeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ Fetch seed data from backend
  useEffect(() => {
    const fetchSeeds = async () => {
      try {
        const res = await fetch("/api/seeds", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to fetch seeds")
        const data = await res.json()
        setSeeds(data)
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Something went wrong"
        setError(msg)
      } finally {
        setLoading(false)
      }
    }
    fetchSeeds()
  }, [])

  // ✅ Status color mapping
  const statusColors: Record<string, string> = {
    Germinated: "bg-green-200 text-green-800",
    "Ready for Planting": "bg-yellow-200 text-yellow-800",
    Shared: "bg-blue-200 text-blue-800",
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

      {/* Loading / Error States */}
      {loading && (
        <div className="text-center text-green-700 font-medium text-lg">
          🌱 Loading your seeds...
        </div>
      )}
      {error && (
        <div className="text-center text-red-600 font-semibold">
          ❌ {error}
        </div>
      )}

      {/* Seeds Grid */}
      {!loading && !error && seeds.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seeds.map((seed) => (
            <Card
              key={seed._id}
              className="bg-white hover:bg-green-50 transition-transform transform hover:scale-105 shadow-lg rounded-xl border-none"
            >
              <CardHeader className="p-0">
                <Image
                  src={seed?.images?.[0] || "/images.jpg"}
                  alt={seed.title}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-lg font-bold text-green-700">
                  {seed.title}
                </CardTitle>
                <CardDescription className="text-gray-700 mb-2 line-clamp-3">
                  {seed.description}
                </CardDescription>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[seed.status] || "bg-gray-200 text-gray-700"}`}
                >
                  {seed.status}
                </span>
              </CardContent>
              <CardFooter>
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700 text-white w-full"
                >
                  <Link href={`/dashboard/view-details/${seed._id}`}>  View Details →</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && seeds.length === 0 && (
        <div className="text-center text-gray-700 mt-10">
          No seeds found. 🌾 <br />
          <span className="text-green-700 font-medium">Add your first seed below!</span>
        </div>
      )}

      {/* Add Seed Floating Button */}
      <Link href="/dashboard/add-seed">
        <Button
          className="fixed bottom-6 right-6 bg-linear-to-br from-green-400 to-green-600 text-white rounded-full w-14 h-14 text-3xl shadow-xl hover:scale-110 transition-transform"
          aria-label="Add Seed"
        >
          +
        </Button>
      </Link>
    </div>
  )
}
