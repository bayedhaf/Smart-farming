"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, UploadCloud } from "lucide-react"
import Image from "next/image"

export default function AddSeedForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const previews = files.map((file) => URL.createObjectURL(file))
    setPreviewImages(previews)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setLoading(true)
    setMessage(null)

    const formData = new FormData(form)

    try {
      const res = await fetch("/api/seeds", {
        method: "POST",
        body: formData, // FormData handles files
      })

      // Try to parse JSON safely; handle empty body
      const contentType = res.headers.get("content-type") || ""
      let data: unknown = null
      if (contentType.includes("application/json")) {
        try {
          data = await res.json()
        } catch {
          data = null
        }
      } else {
        try {
          const text = await res.text()
          if (text) {
            try { data = JSON.parse(text) } catch { data = { message: text } }
          }
        } catch {
          // ignore
        }
      }

      if (!res.ok) {
        const msg = (data as { message?: string } | null)?.message || res.statusText || "Failed to add seed"
        throw new Error(msg)
      }

  setMessage("✅ Seed added successfully!")
  form.reset()
      setPreviewImages([])
    } catch (err: unknown) {
      console.error(err)
      const msg = err instanceof Error ? err.message : "Unexpected error"
      setMessage(`❌ ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-semibold text-center text-green-700">
        🌱 Add New Seed
      </h2>

      {/* Seed Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Seed Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="e.g., Potato Germination"
          required
        />
      </div>

      {/* Plant Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Plant Category</Label>
        <select
          id="category"
          name="category"
          required
          className="w-full rounded-md border border-gray-300 bg-white p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="">Select Category</option>
          <option value="Vegetable">Vegetable</option>
          <option value="Fruit">Fruit</option>
          <option value="Grain">Grain</option>
          <option value="Legume">Legume</option>
          <option value="Herb">Herb</option>
          <option value="Flower">Flower</option>
        </select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe seed details, germination conditions, etc."
          required
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="images">Upload Images</Label>
        <span className="text-sm text-gray-500">
          Select 4 or more seed images from your device
        </span>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition">
          <Input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            required
            onChange={handleImageChange}
            className="cursor-pointer"
          />
          <div className="flex flex-col items-center mt-2 text-gray-500">
            <UploadCloud className="w-5 h-5 mb-1" />
            <span className="text-sm">Click or drag to upload</span>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {previewImages.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Preview ({previewImages.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {previewImages.map((src, idx) => (
              <div
                key={idx}
                className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 shadow-sm"
              >
                <Image
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  fill

                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          name="status"
          required
          className="w-full rounded-md border border-gray-300 bg-white p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
        >
          <option value="Germinated">Germinated</option>
          <option value="Ready for Planting">Ready for Planting</option>
          <option value="Shared">Shared</option>
        </select>
      </div>

      {/* Message Feedback */}
      {message && (
        <p
          className={`text-center text-sm ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin w-4 h-4" />
            Uploading...
          </span>
        ) : (
          "Add Seed"
        )}
      </Button>
    </form>
  )
}
