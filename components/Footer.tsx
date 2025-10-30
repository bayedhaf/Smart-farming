"use client"
import React from "react"
import { Facebook, Twitter, Mail, Sprout } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-700 via-green-800 to-green-900 text-white py-8 mt-1 flex flex-rows-2 shadow-lg">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-3">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2 mb-2">
          <Sprout className="w-6 h-6 text-green-300 animate-pulse" />
          <span className="font-bold text-lg tracking-wide">Agri-Connect</span>
          
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 my-2">
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
          <p>
            Contact us at{" "}
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

        {/* Copyright */}
        <div className="text-xs mt-3 text-green-100">
          © {new Date().getFullYear()} Agri-Connect. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
