"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import GlassIcons from "@/components/GlassIcons"
import {
  ChevronDown,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Eye,
  Filter,
  X,
  Menu,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ScrollVelocity from "@/components/ScrollVelocity"
import ScrambledText from "@/components/ScrambledText"
import TrueFocus from "@/components/TrueFocus"
import RotatingText from "@/components/RotatingText"
import Particles from "@/components/Particles"
import ProfileCard from "@/components/ProfileCard/ProfileCard"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [projectFilter, setProjectFilter] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)

  const typingTexts = ["Web Developer", "UI/UX Designer", "AI Engineer", "Tech Enthusiast"]

  // GlassIcons items for UI/UX projects
  const items = [
    {
      icon: <img src="/svg/component.svg" alt="components" className="w-6 h-6" />,
      color: "purple",
      label: "Animated Bottom",
    },
    {
      icon: <img src="/svg/component.svg" alt="documents" className="w-6 h-6" />,
      color: "blue",
      label: "Hover Effects",
    },
    {
      icon: <img src="/svg/component.svg" alt="documents" className="w-6 h-6" />,
      color: "indigo",
      label: "Toggle Switch ",
    },
    {
      icon: <img src="/svg/component.svg" alt="documents" className="w-6 h-6" />,
      color: "green",
      label: "Checkbox",
    },
    {
      icon: <img src="/svg/component.svg" alt="documents" className="w-6 h-6" />,
      color: "orange",
      label: "Radio Button",
    },
    {
      icon: <img src="/svg/component.svg" alt="documents" className="w-6 h-6" />,
      color: "green",
      label: "Carousel (Image Slider)",
    },
  ]

  // Scroll spy effect
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setMobileMenuOpen(false)
  }

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "SQL",
    "Node.js",
    "Tailwind CSS",
    "Git",
    "MongoDB",
    "Figma",
  ]

  const projects = [
    {
      "id": 1,
      "title": "Platform Ecosystem 4.0",
      "category": "frontend",
      "description": "A blockchain-based platform that provides NFT incentives to individuals or organizations contributing to environmental conservation and social activities.",
      "image": "/project/ECO.png?height=200&width=300",
      "tech": ["React", "TypeScript", "Tailwind CSS", "Blockchain", "NFT"],
      "github": "https://github.com/alpha24-rz/Platform.Eco-4.0",
      "demo": "https://platform-eco-4-0.vercel.app/",
      "details": "An innovative platform integrating blockchain to provide incentives in the form of NFTs to contributors involved in environmental and social sustainability activities. It supports various initiatives promoting sustainability and well-being."
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
      "id": 3,
      "title": "Mobile App UI Design",
      "category": "ui-ux",
      "description": "UI/UX design for a news mobile app with a focus on user experience.",
      "image": "/project/ui.png?height=200&width=300",
      "tech": ["Figma", "Adobe XD"],
      "github": "https://github.com/your-repo-link",
      "demo": "https://your-demo-link.com",
      "details": "Complete design for a news mobile app with an optimal user flow and user-friendly interface."
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
  ]
  const blogPosts = [
    {
      id: 1,
      title: "Innovations in IoT, AI, Blockchain, and NFT for Environmental Sustainability",
      summary: "Mengeksplorasi inovasi terbaru dalam IoT, AI, Blockchain, dan NFT yang dapat mendukung keberlanjutan lingkungan dan pelestarian ekosistem. Artikel ini membahas potensi teknologi tersebut dalam mengatasi tantangan lingkungan global.",
      date: "15 Januari 2025",
      category: "Enverionment",
      url: "https://blog-eco.vercel.app/",
    },
  ]


  const filteredProjects =
    projectFilter === "all" ? projects : projects.filter((project) => project.category === projectFilter)

  return (
    <div className="w-screen overflow-hidden">
      <Particles
        particleColors={['#000000', '#000000']}
        particleCount={1000}
        particleSpread={10}
        speed={0.5}
        particleBaseSize={300}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={true}
        className="fixed top-0 left-0 w-full h-full z-0"
      />

      {/* Navigation */}
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

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-16"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-black/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-black/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 pt-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              className="mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative inline-block pt-3">
                <img
                  src="/profile.jpg?height=250&width=250"
                  alt="Profile"
                  className="w-32 h-32 rounded-full mx-auto mb-6 shadow-2xl shadow-black/20 border-4 border-white/50 backdrop-blur-sm"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white animate-pulse" />
              </div>
            </motion.div>
            <div className="flex items-center justify-center w-full">
              <TrueFocus
                sentence="Alpha Rizi"
                manualMode={false}
                blurAmount={5}
                borderColor="cyan"
                animationDuration={1}
                pauseBetweenAnimations={1}
              />
            </div>
            <div className="flex items-center justify-center w-full font-extrabold font-josefin pt-5">
              <div className="text-2xl flex items-center"><Sparkles className="mr-2 h-5 w-5 text-black" />
                I'am
              </div>
              <div className="ml-2 text-sm">
                <RotatingText
                  texts={['UI/UX Designer', 'Web Developer', 'Data Analyst']}
                  mainClassName="px-1 sm:px-1 md:px-1 bg-black text-white overflow-hidden py-1 sm:py-1 md:py-1 justify-center rounded-lg"
                  staggerFrom={"last"}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <ScrambledText
                className="scrambled-text-demo text-black"
                radius={50}
                duration={1.2}
                speed={0.5}
                scrambleChars=".:"
              >
                Passionate developer dan data enthusiast yang berfokus pada pembuatan solusi digital inovatif dengan
                pengalaman dalam full-stack development dan data science.
              </ScrambledText>
            </div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.2, ease: "easeOut", staggerChildren: 0.2 }}
            >
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out shadow-lg hover:shadow-xl group"
              >
                <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                Unduh CV
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-black hover:text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out shadow-lg hover:shadow-xl group"
              >
                <Eye className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Lihat Proyek
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="h-6 w-6 animate-bounce text-gray-400" />
          </motion.div>
        </div>
      </section>
      <div className="flex items-center justify-center w-full pt-5 overflow-hidden">
        <ScrollVelocity
          texts={['UI/UX Designer', 'Web Developer']}
          velocity={100}
          className="custom-scroll-text"
        />
      </div>


      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Tentang Saya</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </motion.div>

          <div className="flex items-center justify-center w-full">
            <ProfileCard
              name="M Alpha.Rizi"
              title="Web Developer"
              handle="Alpha Rizi"
              status="Online"
              contactText="Contact"
              avatarUrl="/profile.jpg"
              iconUrl="/iconpattern.png"
              grainUrl="/grain.webp"
              showUserInfo={true}
              enableTilt={true}
              onContactClick={() => console.log('Contact clicked')}
            />
          </div>


          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Saya adalah seorang UI/UX Designer sekaligus Web Developer yang antusias dalam menciptakan antarmuka digital yang fungsional dan estetis. Dengan dasar pengalaman di pengembangan web dan desain pengalaman pengguna, saya berfokus pada bagaimana teknologi dapat memberikan pengalaman yang intuitif dan bermakna.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Saya terus mengembangkan kemampuan saya di berbagai aspek teknologi, terutama dalam memahami tren baru seperti Artificial Intelligence (AI). Bagi saya, proses belajar adalah bagian tak terpisahkan dari perjalanan berkarya, dan saya selalu terbuka untuk eksplorasi hal-hal baru yang dapat memperkaya solusi digital yang saya bangun.
              </p>


              <Tabs defaultValue="education" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-black/10">
                  <TabsTrigger
                    value="education"
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Pendidikan
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Pengalaman
                  </TabsTrigger>
                  <TabsTrigger
                    value="certifications"
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Sertifikasi
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="education" className="mt-4">
                  <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-black">S1 Teknik Komputer</h4>
                          <p className="text-gray-700">Universitas Negeri Makassar • 2023 - Present</p>
                          <p className="text-sm text-gray-600">IPK: 3.77/4.00</p>
                          <p className="text-sm text-gray-600">Fakultas Teknik • Jurusan Teknik Informatika & Komputer</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience" className="mt-4">
                  <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-black">Web Developer</h4>
                          <p className="text-gray-700">Freelance • 2024 - Present</p>
                          <p className="text-sm text-gray-600">
                            Mengembangkan aplikasi web modern menggunakan React dan Next.js
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="certifications" className="mt-4">
                  <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-black">Certified in UI/UX Research and Design</h4>
                          <p className="text-gray-700">MySkill • 2025</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-black">Certified intro to UI/UX Design</h4>
                          <p className="text-gray-700">Purwadhika digital technology school • 2025</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="mr-2 h-5 w-5 text-black" />
                    Tech Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-hidden">
                    <motion.div
                      className="flex gap-8 items-center"
                      animate={{
                        x: [0, -1920],
                      }}
                      transition={{
                        x: {
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          duration: 20,
                          ease: "linear",
                        },
                      }}
                    >
                      {/* First set of logos */}
                      {[
                        { name: "React", icon: "/svg/react.svg" },
                        { name: "Next.js", icon: "/svg/next.svg" },
                        { name: "TypeScript", icon: "/svg/typescript.svg" },
                        { name: "JavaScript", icon: "/svg/js.svg" },
                        { name: "Python", icon: "/svg/python.svg" },
                        { name: "SQL", icon: "/svg/sql.svg" },
                        { name: "Node.js", icon: "/svg/node-js.svg" },
                        { name: "Tailwind", icon: "/svg/tailwind.svg" },
                        { name: "Git", icon: "/svg/git.svg" },
                        { name: "MongoDB", icon: "/svg/mongodb.svg" },
                        { name: "Figma", icon: "/svg/figma.svg" },
                      ].map((tech, index) => (
                        <motion.div
                          key={`first-${tech.name}`}
                          className="flex flex-col items-center justify-center min-w-[80px] h-20 bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                          whileHover={{ y: -5 }}
                        >
                          <img src={tech.icon} alt={tech.name} className="w-6 h-6 mb-1" />
                          <div className="text-xs font-medium text-black text-center">{tech.name}</div>
                        </motion.div>
                      ))}

                      {/* Duplicate set for seamless loop */}
                      {[
                        { name: "React", icon: "/svg/react.svg" },
                        { name: "Next.js", icon: "/svg/next.svg" },
                        { name: "TypeScript", icon: "/svg/typescript.svg" },
                        { name: "JavaScript", icon: "/svg/js.svg" },
                        { name: "Python", icon: "/svg/python.svg" },
                        { name: "SQL", icon: "/svg/sql.svg" },
                        { name: "Node.js", icon: "/svg/node-js.svg" },
                        { name: "Tailwind", icon: "/svg/tailwind.svg" },
                        { name: "Git", icon: "/svg/git.svg" },
                        { name: "MongoDB", icon: "/svg/mongodb.svg" },
                        { name: "Figma", icon: "/svg/figma.svg" },
                      ].map((tech, index) => (
                        <motion.div
                          key={`second-${tech.name}`}
                          className="flex flex-col items-center justify-center min-w-[80px] h-20 bg-white/80 backdrop-blur-sm border border-black/10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                          whileHover={{ y: -5 }}
                        >
                          <img src={tech.icon} alt={tech.name} className="w-6 h-6 mb-1" />
                          <div className="text-xs font-medium text-black text-center">{tech.name}</div>
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Gradient overlays for smooth edges */}
                    <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
                    <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Project Saya</h2>
            <div className="w-20 h-1 bg-black mx-auto mb-8"></div>

            {/* Project Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { key: "all", label: "Semua" },
                { key: "frontend", label: "Frontend" },
                { key: "data-science", label: "Data Science" },
                { key: "ui-ux", label: "UI/UX" },
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={projectFilter === filter.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProjectFilter(filter.key)}
                  className={
                    projectFilter === filter.key
                      ? "bg-black hover:bg-gray-800 text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out"
                      : "bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-black hover:text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out"
                  }
                >
                  <Filter className="mr-2 h-3 w-3" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Conditionally Render Projects */}
          <div className={projectFilter === "ui-ux" ? "w-full" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
            {projectFilter === "ui-ux" ? (
              <div className="flex justify-center items-center w-full" style={{ height: '300px', position: 'relative' }}>
                {/* Use GlassIcons Component for UI/UX Projects */}
                <GlassIcons items={items} className="custom-class" />
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer h-full bg-white/80 backdrop-blur-md border border-black/10 overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center backdrop-blur-sm">
                        <Button
                          size="sm"
                          onClick={() => setSelectedProject(project)}
                          className="bg-white text-black hover:bg-gray-100 hover:scale-110 transition-all duration-500 ease-out shadow-lg"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Lihat Detail
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-xl mb-2 text-black group-hover:text-gray-700 transition-colors duration-500 ease-out">
                        {project.title}
                      </h3>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs border-black/20 hover:bg-black hover:text-white transition-all duration-500 ease-out"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-black hover:text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out"
                          onClick={() => window.open(project.github, "_blank")}
                        >
                          <Github className="mr-2 h-3 w-3" />
                          Code
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-black hover:bg-gray-800 text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out"
                          onClick={() => window.open(project.demo, "_blank")}
                        >
                          <ExternalLink className="mr-2 h-3 w-3" />
                          Demo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Blog</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer h-full bg-white/80 backdrop-blur-md border border-black/10">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                      <span>{post.date}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs border-black/20">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-black group-hover:text-gray-700 transition-colors duration-500 ease-out">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 mb-4">{post.summary}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-black hover:text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out group"
                      onClick={() => window.open(post.url, "_blank")}
                    >
                      Baca Selengkapnya
                      <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">Hubungi Saya</h2>
            <div className="w-20 h-1 bg-black mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                <CardHeader>
                  <CardTitle>Kirim Pesan</CardTitle>
                  <CardDescription>Saya akan merespon pesan Anda dalam 24 jam</CardDescription>
                </CardHeader>
                <CardContent>
                  <form action="https://formspree.io/f/mkgbpjao" method="POST">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Input
                          placeholder="Nama Lengkap"
                          className="bg-white/80 backdrop-blur-sm border-black/20 focus:border-black transition-all duration-500 ease-out"
                          name="name"
                        />
                      </div>
                      <div>
                        <Input
                          type="email"
                          placeholder="Email"
                          className="bg-white/80 backdrop-blur-sm border-black/20 focus:border-black transition-all duration-500 ease-out"
                          name="email"
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <Input
                        placeholder="Subjek"
                        className="bg-white/80 backdrop-blur-sm border-black/20 focus:border-black transition-all duration-500 ease-out"
                        name="subject"
                      />
                    </div>
                    <div className="mt-2">
                      <Textarea
                        placeholder="Pesan Anda"
                        rows={5}
                        className="bg-white/80 backdrop-blur-sm border-black/20 focus:border-black transition-all duration-500 ease-out"
                        name="message"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-black hover:bg-gray-800 text-white hover:scale-105 transition-all duration-500 ease-out ease-in-out group"
                    >
                      <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>

                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 text-black">Informasi Kontak</h3>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center hover:translate-x-2 transition-transform duration-500 ease-out"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Mail className="h-5 w-5 text-black mr-3" />
                      <a
                        href="mailto:alfakiddrock7@email.com"
                        className="text-gray-700 hover:underline"
                      >
                        alfakiddrock7@gmail.com
                      </a>
                    </motion.div>
                    <motion.div
                      className="flex items-center hover:translate-x-2 transition-transform duration-500 ease-out"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Phone className="h-5 w-5 text-black mr-3" />
                      <span className="text-gray-700">+62 858-2436-4689</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center hover:translate-x-2 transition-transform duration-500 ease-out"
                      whileHover={{ scale: 1.05 }}
                    >
                      <MapPin className="h-5 w-5 text-black mr-3" />
                      <span className="text-gray-700">Makassar, Indonesia</span>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-md border border-black/10 shadow-lg hover:shadow-xl transition-all duration-500 ease-out hover:scale-105 ease-in-out">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-4 text-black">Media Sosial</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/in/muhammad-alfarizi-710476312/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                    <a
                      href="https://github.com/alpha24-rz"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-gray-800 hover:text-white hover:border-gray-800 hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    </a>
                    <a
                      href="https://www.instagram.com/alpha_rz24"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white/80 backdrop-blur-sm text-black border-black/20 hover:bg-[#FD1D1D] hover:text-white hover:border-[#EA4335] hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                      >
                        <img src="/svg/ig.svg" alt="instagram" className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 w-screen overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img
                src="/Alph@_dark.gif" // pastikan logo.gif ada di folder /public
                alt="Logo"
                className="h-10 w-auto object-contain select-none"
              />
              <p className="text-gray-400">
                A passionate developer, always ready for new challenges and exciting collaborations.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 hover:text-light-blue-400 transition-colors duration-300 ease-in-out">Navigasi</h4>
              <div className="space-y-2">
                {["Beranda", "Tentang", "Proyek", "Blog", "Kontak"].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(["home", "about", "projects", "blog", "contact"][index])}
                    className="block text-gray-400 hover:text-white transition-colors hover:translate-x-2 duration-500 ease-out transform hover:scale-105"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4 hover:text-light-blue-400 transition-colors duration-300 ease-in-out">Ikuti Saya</h4>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-[#0077B5] hover:bg-[#0077B5]/10 p-2 hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 p-2 hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-[#EA4335] hover:bg-[#EA4335]/10 p-2 hover:scale-110 transition-all duration-500 ease-out ease-in-out"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm md:text-base">
              © 2023 Alpha Rizi. <span className="text-light-blue-400">Empowering Innovation, Preserving Excellence.</span>
            </p>
          </div>
        </div>
      </footer>


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
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-gray-700">{selectedProject.details}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech) => (
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
