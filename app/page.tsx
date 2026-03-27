"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { useState, useEffect, useCallback } from "react"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Intro from "@/components/Intro"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  _id?: string
  title: string
  category: "frontend" | "ui-ux" | "backend" | "fullstack"
  description: string
  image: string
  tech: string[]
  github: string
  demo: string
  details: string
  createdAt?: string
}

// Dynamic imports
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false })
const Hero = dynamic(() => import("@/components/pages/Hero"), { ssr: false })
const AboutSection = dynamic(() => import("@/components/pages/AboutSection"), { ssr: false })
const ProjectSection = dynamic(() => import("@/components/pages/ProjectSection"), { ssr: false })
const BlogSection = dynamic(() => import("@/components/pages/BlogSection"), { ssr: false })
const ContactSection = dynamic(() => import("@/components/pages/ContactSection"), { ssr: false })
const Footer = dynamic(() => import("@/components/pages/Footer"), { ssr: false })

// Fallback projects data
const fallbackProjects: Project[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
    title: "Portfolio Website",
    category: "frontend",
    description: "Responsive portfolio website with interactive animations and modern design",
    image: "/project/portofolio.png?height=200&width=300",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/alpha24-rz/Portofolio-Alpha",
    demo: "https://alpharizi.netlify.app/",
    details: "Portfolio website with glassmorphism design and smooth animations to showcase work."
  },
  {
    id: "5",
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

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectFilter, setProjectFilter] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(true)
  const router = useRouter()

  // Handle scroll to update active section
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

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/projects')

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.details || `HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        const formattedProjects = data.map((project: any) => ({
          ...project,
          image: project.image || '/placeholder.svg'
        }))
        setProjects(formattedProjects)
        setError(null)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setProjects(fallbackProjects)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setMobileMenuOpen(false)
  }, [])

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
    <>
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}
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
        <AboutSection />

        {/* Project Section */}
        <ProjectSection
          projectFilter={projectFilter}
          setProjectFilter={setProjectFilter}
          filteredProjects={filteredProjects}
          setSelectedProject={(project) => router.push(`/project/${project.id}`)}
        />

        {/* Blog Section */}
        <BlogSection />

        {/* Contact Section */}
        <ContactSection scrollToSection={scrollToSection} />

        {/* Footer */}
        <Footer scrollToSection={scrollToSection} />

        {/* Project Modal - Enhanced Version */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-2xl max-h-2xl p-0 overflow-hidden bg-background border border-border rounded-2xl shadow-xl">
            {selectedProject && (
              <div>
                {/* Image */}
                <div className="relative bg-muted h-56 flex items-center justify-center border-b border-border">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-xs text-muted-foreground">
                      {selectedProject.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">

                  {/* Title & Description */}
                  <div>
                    <DialogTitle className="text-xl font-medium text-foreground mb-1.5">
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.description}
                    </DialogDescription>
                  </div>

                  {/* Details */}
                  <div className="bg-muted/50 border border-border rounded-lg px-4 py-3 text-sm text-muted-foreground leading-relaxed">
                    {selectedProject.details}
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-2">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((tech: string) => (
                        <span
                          key={tech}
                          className="bg-muted border border-border rounded-full px-3 py-1 text-xs text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-1 border-t border-border">
                    <Button
                      className="flex-1 gap-2"
                      onClick={() => window.open(selectedProject.github, '_blank')}
                    >
                      <Github className="h-3.5 w-3.5" />
                      View Code
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => window.open(selectedProject.demo, '_blank')}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Live Demo
                    </Button>
                  </div>

                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}