"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Testimonials", href: "#testimonials" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white shadow-md py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="#home" className="flex items-center">
            <div className="h-4 w-auto relative -mt-8">
              <Image
                src="/images/astroop-logo.png"
                alt="Astroop CRE Logo"
                width={96}
                height={20}
                className="object-contain"
              />
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium transition-colors duration-300 text-gray-700 hover:text-[#FF7A00]"
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="rounded-full px-6 btn-animated bg-[#FF7A00] hover:bg-[#FF9A40] text-white">
              <a href="#contact">Contact Us</a>
            </Button>
          </nav>

          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="text-[#003366]" /> : <Menu className="text-[#003366]" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-700 hover:text-[#FF7A00]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="bg-[#FF7A00] hover:bg-[#FF9A40] text-white rounded-full w-full btn-animated">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact Us
                </a>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
