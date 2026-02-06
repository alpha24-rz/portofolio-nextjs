"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { useState, useEffect, useCallback } from "react"
import {
  ExternalLink,
  Github,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Interface langsung di file ini jika import error
// app/page.tsx (bagian atas file)
interface Project {
  _id: string;
  id: string;
  title: string;
  category: "frontend" | "ui-ux" | "backend" | "fullstack";
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  details: string;
  createdAt?: string;
}

// const Particles = dynamic(() => import("@/components/background/Particles/Particles"), { ssr: false })
const Navbar = dynamic(() => import("@/components/pages/Navbar"), { ssr: false })
const Hero = dynamic(() => import("@/components/pages/Hero"), { ssr: false })
const AboutSection = dynamic(() => import("@/components/pages/AboutSection"), { ssr: false })
const ProjectSection = dynamic(() => import("@/components/pages/ProjectSection"), { ssr: false })
const BlogSection = dynamic(() => import("@/components/pages/BlogSection"), { ssr: false })
const ContactSection = dynamic(() => import("@/components/pages/ContactSection"), { ssr: false })
const Footer = dynamic(() => import("@/components/pages/Footer"), { ssr: false })

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectFilter, setProjectFilter] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Effect untuk scroll
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

  // Effect untuk fetch projects dari API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProjects(data)

        const formattedProjects = data.map((project: any) => ({
          ...project,
          id: project.id || project._id, // Gunakan _id jika id tidak ada
          image: project.image || '/placeholder.svg'
        }));
        setProjects(formattedProjects);
        setError(null);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');

        // Fallback data jika API gagal
        const fallbackProjects: Project[] = [
          {
            id: 1,
            title: "Platform Ecosystem 4.0",
            category: "frontend",
            description: "A blockchain-based platform that provides NFT incentives to individuals or organizations contributing to environmental conservation and social activities.",
            image: "/project/ECO.png?height=200&width=300",
            tech: ["React", "TypeScript", "Tailwind CSS", "Blockchain", "NFT"],
            github: "https://github.com/alpha24-rz/Platform.Eco-4.0",
            demo: "https://platform-eco-4-0.vercel.app/",
            details: "An innovative platform integrating blockchain to provide incentives in the form of NFTs to contributors involved in environmental and social sustainability activities."
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
            details: "Website portfolio dengan design glassmorphism dan animasi yang smooth untuk showcase karya."
          },
          {
            id: 5,
            title: "Sahabat Moms Web Platform UI Design",
            category: "ui-ux",
            description: "UI/UX design for a web platform dedicated to independent midwife services",
            image: "/project/sahabatmoms-ui.png?height=200&width=300",
            tech: ["Figma"],
            github: "https://github.com/your-repo-link",
            demo: "https://your-demo-link.com",
            details: "Complete design for a web platform 'Sahabat Moms' offering independent midwife services."
          }
        ]

        setProjects(fallbackProjects)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, []) // Empty dependency array = hanya dijalankan sekali saat mount

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

  const filteredProjects =
    projectFilter === "all"
      ? projects
      : projects.filter((project) => project.category === projectFilter)

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="relative mx-auto mb-4 h-12 w-12 loader pb-2"></div>
          <p className="text-gray-600 pt-5">Loading projects...</p>
        </div>
      </div>

    )
  }

  return (
    <div className="w-screen overflow-hidden relative">

      {/* Navbar */}
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Hero Section */}
      <Hero scrollToSection={scrollToSection} />

      {/* About Section */}
      <AboutSection scrollToSection={scrollToSection} />

      {/* Project Section */}
      <ProjectSection
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        filteredProjects={filteredProjects}
        setSelectedProject={setSelectedProject}
        loading={loading}
        error={error}
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
                  width={500}
                  height={300}
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
                  <Button
                    className="flex-1 bg-black hover:bg-gray-800 text-white hover:scale-105 transition-all duration-500 ease-in-out"
                    onClick={() => window.open(selectedProject.github, '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-black hover:text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out"
                    onClick={() => window.open(selectedProject.demo, '_blank')}
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