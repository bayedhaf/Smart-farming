"use client"

import { useState } from "react"
import { Sprout, Menu, X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms" },
    { href: "/help", label: "Help" },
  ]

  return (
    <div className="">
      <header className="bg-white/80 fixed top-0 w-full  backdrop-blur-md border-b shadow-sm px-6 py-4  z-50">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
         
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <Sprout className="w-7 h-7 text-green-600 animate-pulse" />
            <span className="font-extrabold text-xl tracking-tight text-gray-800">
              Agri-Connect
            </span>
          </motion.div>

          
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`flex-col md:flex-row md:flex md:gap-6 md:justify-center md:items-center absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent overflow-hidden transition-all ${
              isOpen ? "flex px-6 py-4" : "hidden md:flex"
            }`}
            aria-label="Main Navigation"
          >
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="w-full md:w-auto"
                >
                  <Link
                    href={link.href}
                    className={`block relative px-2 py-1 transition-all text-center md:text-left ${
                      isActive
                        ? "text-green-700 font-semibold after:w-full"
                        : "hover:text-green-600 after:w-0"
                    } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-green-600 after:transition-all`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)} 
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            })}
          </motion.nav>
        </div>
      </header>
    </div>
  )
}
