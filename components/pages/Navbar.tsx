import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { X, Menu } from "lucide-react";
import { AnimatePresence } from "framer-motion";

interface NavbarProps {
  activeSection: string;
  scrollToSection: (section: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (state: boolean) => void;
}

const Navbar = ({ activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-black/10 w-screen overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex items-center"
          >
            <img
              src="/Alph@.gif" // pastikan logo.gif ada di folder /public
              alt="Logo"
              className="h-10 w-auto object-contain select-none"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["home", "about", "projects", "blog", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-all duration-500 ease-out hover:text-black hover:scale-105 ease-in-out relative ${activeSection === item ? "text-black font-semibold" : "text-gray-600"
                  }`}
              >
                {item === "home"
                  ? "Home"
                  : item === "about"
                    ? "About"
                    : item === "projects"
                      ? "Projects"
                      : item === "contact"
                        ? "Contact"
                        : item}
                {activeSection === item && (
                  <motion.div layoutId="activeSection" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 hover:bg-black/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
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
                  className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-500 ease-out hover:bg-black/5 hover:scale-105 ease-in-out ${activeSection === item ? "text-black bg-black/5 font-semibold" : "text-gray-600"
                    }`}
                >
                  {item === "home"
                    ? "Home"
                    : item === "about"
                      ? "About"
                      : item === "projects"
                        ? "Projects"
                        : item === "contact"
                          ? "Contact"
                          : item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
