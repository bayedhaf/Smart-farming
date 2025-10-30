"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"

type SeedItem = {
  _id: string
  title: string
  description: string
  category?: string
  status: string
  images?: string[]
}

export default function ViewDetails() {
  const { id } = useParams() // dynamic seed ID
  const [seed, setSeed] = useState<SeedItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchSeed = async () => {
      try {
        const res = await fetch(`/api/seeds/${id}`)
        if (!res.ok) throw new Error("Failed to fetch seed details")
        const data = await res.json()
        setSeed(data)
        setSelectedImage(data.images?.[0] || "/images.jpg")
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Something went wrong"
        setError(msg)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchSeed()
  }, [id])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-green-700 text-lg font-medium">
        <Loader2 className="animate-spin w-5 h-5 mr-2" /> Loading seed details...
      </div>
    )

  if (error)
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        ❌ {error}
      </div>
    )

  if (!seed)
    return (
      <div className="text-center mt-10 text-gray-700">
        No details available for this seed.
      </div>
    )

  return (
  <div className="min-h-screen bg-linear-to-b from-green-50 via-green-100 to-green-200 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <CardHeader className="bg-green-700 text-white p-6">
          <CardTitle className="text-3xl font-bold">{seed.title}</CardTitle>
          <p className="text-green-100">{seed.category || "Uncategorized"}</p>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-6 space-y-6">
          {/* Image Gallery */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Image */}
            <div className="flex-1">
              <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={selectedImage || "/images.jpg"}
                  alt={seed.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Thumbnail images */}
              {seed.images && seed.images.length > 1 && (
                <div className="flex flex-wrap gap-3 mt-4 justify-center">
                  {seed.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === img
                          ? "border-green-600 scale-105"
                          : "border-transparent hover:border-green-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Seed ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex-1 space-y-4">
              <h3 className="text-lg font-semibold text-green-800">Description</h3>
              <p className="text-gray-700 leading-relaxed">{seed.description}</p>

              <div className="pt-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    seed.status === "Germinated"
                      ? "bg-green-200 text-green-800"
                      : seed.status === "Ready for Planting"
                      ? "bg-yellow-200 text-yellow-800"
                      : seed.status === "Shared"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {seed.status}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-6">
            <Link href="/dashboard">
              <Button variant="outline" className="mr-3 border-green-600 text-green-700">
                ← Back to Dashboard
              </Button>
            </Link>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Share Seed
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  )
}
