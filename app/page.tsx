"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import AISeedInsightsCard from "./ai/AiPage"
import Header from "@/components/HomeHeader/Header"

export default function HomePage() {
  return (
  <div className="flex flex-col min-h-screen bg-linear-to-b from-green-50 via-white to-green-100 overflow-hidden">
   
      <Header/>

    
      <section className="relative h-[100vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/farm1e.jpg"
          alt="Farm field"
          fill
          priority
          className="object-cover object-center scale-105 brightness-[0.9] transition-transform duration-700 ease-out"
        />

  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent md:from-black/70 md:via-black/30" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg leading-tight">
            Connecting Farmers, <br className="hidden sm:block" /> Sharing Growth.
          </h1>
          <p className="text-base md:text-lg text-gray-100 mt-3 opacity-90 max-w-2xl mx-auto">
            Bridging communities for better seed exchange and collaboration.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg hover:scale-105 transition-transform duration-300 px-4 py-3 md:px-6 md:py-5 text-sm md:text-base rounded-full">
              Browse Seeds
            </Button>
            <Button className="bg-white/90 text-gray-800 border-gray-300 hover:bg-green-50 transition-all rounded-full px-4 py-3 md:px-6 md:py-5 text-sm md:text-base">
              <Link href="/auth/signup">Register as Farmer</Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-gray-200">
            Already a member?{" "}
            <Link
              href="/auth/login"
              className="underline text-green-300 hover:text-green-200"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
  <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 space-y-10 bg-linear-to-b from-white via-green-50/30 to-green-100/50 rounded-t-3xl -mt-5 md:-mt-10 z-20 relative">
        <div className="max-w-4xl mx-auto">
          <AISeedInsightsCard />

          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              🌾 More Coming Soon
            </h2>
            <p className="text-gray-500 text-sm">
              Stay tuned for seed marketplace and AI-based growth analysis tools.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
