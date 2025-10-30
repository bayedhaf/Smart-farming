"use client"

import { Facebook, Twitter, Mail, Sprout } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative mt-auto bottom-0 w-full bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white py-10 px-6 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6 text-center md:text-left">
        
        {/* Logo */}
        <div className="flex items-center justify-center md:justify-start gap-2">
          <Sprout className="w-6 h-6 text-green-300 animate-pulse" />
          <span className="font-bold text-xl tracking-wide">Agri-Connect</span>
        </div>

        {/* Social Links */}
        <div className="flex justify-center md:justify-start gap-6">
          <Link
            href="#"
            className="hover:text-green-300 transition-transform hover:scale-110"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="#"
            className="hover:text-green-300 transition-transform hover:scale-110"
          >
            <Facebook className="w-5 h-5" />
          </Link>
          <a
            href="mailto:info@agri-connect.com"
            className="hover:text-green-300 transition-transform hover:scale-110"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Contact Info */}
        <div className="text-sm opacity-90 leading-relaxed">
          <p className="flex flex-col">
            Contact us at{" "}
            phone:{" "}
            <a
              href="tel:+251916656489"
              className="underline text-green-200 hover:text-green-100"
            >
              +251916656489
            </a>
            <a
              href="mailto:info@agri-connect.com"
              className="underline text-green-200 hover:text-green-100"
            >
              info@agri-connect.com
            </a>
          </p>
          <p className="mt-1">
            Co-Founder:{" "}
            <span className="text-green-300 font-medium">Bayisa Balcha</span>
          </p>
        </div>
      </div>

      <div className="border-t border-green-600 mt-8"></div>

      <div className="text-center text-xs text-green-100 mt-4">
        © {new Date().getFullYear()} Agri-Connect. All rights reserved.
      </div>
    </footer>
  )
}
