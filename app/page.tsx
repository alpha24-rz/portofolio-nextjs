"use client"

import { useState, useEffect, useCallback } from "react"
import {
  ExternalLink,
  Github,
  Linkedin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Particles from "@/components/background/Particles/Particles"
import Navbar from "@/components/pages/Navbar"
import Hero from "@/components/pages/Hero"
import AboutSection from "@/components/pages/AboutSection"
import ProjectSection from "@/components/pages/ProjectSection"
import BlogSection from "@/components/pages/BlogSection"
import ContactSection from "@/components/pages/ContactSection"
import Footer from "@/components/pages/Footer"
import Image from "next/image"
import Squares from "@/components/background/Squares/Squares"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [projectFilter, setProjectFilter] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "blog", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMobileMenuOpen(false);
  }, []);


  const projects = [
    {
      id: 1,
      title: "Platform Ecosystem 4.0",
      category: "frontend",
      description: "A blockchain-based platform that provides NFT incentives to individuals or organizations contributing to environmental conservation and social activities.",
      image: "/project/ECO.png?height=200&width=300",
      tech: ["React", "TypeScript", "Tailwind CSS", "Blockchain", "NFT"],
      github: "https://github.com/alpha24-rz/Platform.Eco-4.0",
      demo: "https://platform-eco-4-0.vercel.app/",
      details: "An innovative platform integrating blockchain to provide incentives in the form of NFTs to contributors involved in environmental and social sustainability activities. It supports various initiatives promoting sustainability and well-being."
    },
    {
      id: 2,
      title: "IoT-Based Smart Library System with RFID",
      category: "frontend",
      description: "A smart library system that automates book borrowing using IoT and RFID technology.",
      image: "/project/book.png?height=200&width=300",
      tech: ["ESP32", "RFID", "Google Sheets", "OLED", "Buzzer", "Web Application"],
      github: "https://github.com/alpha24-rz/iot-Rfidlibrary",
      demo: "https://iot-rfidlibrary.vercel.app/",
      details: "Web application integrated with RFID for book borrowing, real-time data tracking, and notifications via OLED and buzzer."
    },
    {
      id: 3,
      title: "Mobile App UI Design",
      category: "ui-ux",
      description: "UI/UX design for a news mobile app with a focus on user experience.",
      image: "/project/ui.png?height=200&width=300",
      tech: ["Figma", "Adobe XD"],
      github: "https://github.com/your-repo-link",
      demo: "https://your-demo-link.com",
      details: "Complete design for a news mobile app with an optimal user flow and user-friendly interface."
    },
    {
      id: 4,
      title: "Portfolio Website",
      category: "frontend",
      description: "Website portfolio responsif dengan animasi interaktif dan design modern",
      image: "/project/portofolio.png?height=200&width=300",
      tech: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/alpha24-rz/Portofolio-Alpha",
      demo: "https://alpharizi.netlify.app/",
      details: "Website portfolio dengan design glassmorphism dan animasi yang smooth untuk showcase karya.",
    },
    {
      id: 5,
      title: "Sahabat Moms Web Platform UI Design",
      category: "ui-ux",
      description: "UI/UX design for a web platform dedicated to independent midwife services, focused on providing a seamless experience for pregnant women and families seeking reliable healthcare support.",
      image: "/project/sahabatmoms-ui.png?height=200&width=300",
      tech: ["Figma"],
      github: "https://github.com/your-repo-link",
      demo: "https://your-demo-link.com",
      details: "Complete design for a web platform ‘Sahabat Moms’ offering independent midwife services. The design emphasizes user-friendly navigation, easy appointment booking, and access to valuable maternal and child health information, ensuring a smooth user flow for expectant mothers and families."
    },
  ]

  const filteredProjects =
    projectFilter === "all" ? projects : projects.filter((project) => project.category === projectFilter)

  return (
    <div className="w-screen overflow-hidden relative">
      <Particles
        particleColors={['#000000', '#000000']}
        particleCount={1000}
        particleSpread={10}
        speed={0.5}
        particleBaseSize={300}
        moveParticlesOnHover={false}
        alphaParticles={true}
        disableRotation={true}
        className="absolute w-screen h-screen overflow-hidden z-0"
      />
      {/* Navbar */}
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      {/* Hero Section */}
      <Hero
        scrollToSection={scrollToSection}
      />

      {/* About Section */}
      <AboutSection scrollToSection={scrollToSection} />

      {/* Project Section */}
      <ProjectSection
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        filteredProjects={filteredProjects}
        setSelectedProject={setSelectedProject}
      />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection scrollToSection={scrollToSection} />

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-white/90 backdrop-blur-md border border-black/10">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-black">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-gray-700">{selectedProject.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  width={500}  // Tentukan lebar gambar sesuai kebutuhan
                  height={300} // Tentukan tinggi gambar sesuai kebutuhan
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-gray-700">{selectedProject.details}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech: string) => (
                    <Badge key={tech} variant="outline" className="border-black/20">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1 bg-black hover:bg-gray-800 text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-black hover:text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
