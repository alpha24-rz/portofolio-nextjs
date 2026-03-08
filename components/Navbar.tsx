'use client'

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { X, Menu } from "lucide-react"
import { useEffect, useState } from "react"
import clsx from "clsx"

interface NavbarProps {
  activeSection: string
  scrollToSection: (section: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (state: boolean) => void
}

export default function Navbar({
  activeSection,
  scrollToSection,
  mobileMenuOpen,
  setMobileMenuOpen,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 w-screen overflow-hidden transition-all duration-500 ease-in-out",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-black/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="w-screen px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span
              className={clsx(
                "text-2xl md:text-4xl font-logo font-bold transition-colors duration-300 text-black",
          
              )}
            >
              Alpharz
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden font-logo md:flex pr-3 gap-8 justify-items-end items-center">
            {["home", "about", "projects", "blog", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={clsx(
                  "capitalize relative transition-all duration-300 hover:scale-105 text-black ",
                )}
              >
                {item}
                {activeSection === item && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/90 backdrop-blur-md border-t border-black/10"
          >
            <div className="px-4 py-2 space-y-2">
              {["home", "about", "projects", "blog", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 rounded-md hover:bg-black/5"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
