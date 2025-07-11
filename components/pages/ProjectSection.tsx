import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Github, ExternalLink } from "lucide-react"
import Masonry from "../Masonry/Masonry"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"
import { useState } from "react"

interface ProjectSectionProps {
  projectFilter: string;
  setProjectFilter: (filter: string) => void;
  filteredProjects: any[];
  setSelectedProject: (project: any) => void;
}

interface MasonryItem {
  id: string;
  img: string;
  url: string;
  height: number;
  title?: string;
  description?: string;
}

const items = [
  {
    id: "1",
    img: "/ui-ux/image2.png",
    url: "#",
    title: "#1 Of The Winter Blues",
    description: "A collection of winter-themed UI/UX designs for a winter-themed website.",
    height: 250,
  },
  {
    id: "2",
    img: "/ui-ux/image.jpg",
    url: "#",
    height: 400,
  },
  {
    id: "3",
    img: "/ui-ux/image4.png",
    url: "#",
    height: 350,
  },
  {
    id: "4",
    img: "/ui-ux/image3.png",
    url: "#",
    height: 500,
  },
  {
    id: "5",
    img: "/ui-ux/image6.png",
    url: "#",
    height: 300,
  },
]


const ProjectSection = ({ projectFilter, setProjectFilter, filteredProjects, setSelectedProject }: ProjectSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<MasonryItem | null>(null)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 mb-8">
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
              { key: "ui-ux", label: "UI/UX" },
              { key: "design", label: "Creations" },
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
        <div className={projectFilter === "design" ? "w-full" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
          {projectFilter === "design" ? (
            <div className="flex justify-center items-center w-full" style={{ height: '300px', position: 'relative' }}> 
              <Masonry
                items={items}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.95}
                blurToFocus={true}
                colorShiftOnHover={false}
                onImageClick={(item) => setSelectedImage(item)}
              />
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
                      {project.tech.map((tech: string) => (
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

      {/* Dialog for UI/UX Image Details */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-3xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden">
            {selectedImage?.img && (
              <Image
                src={selectedImage.img}
                alt={selectedImage.title || "UI/UX Design"}
                fill
                className="object-contain"
              />
            )}
          </div>
          <p className="text-gray-700">{selectedImage?.description}</p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </Button>
            <Button
              onClick={() => window.open(selectedImage?.url, "_blank")}
              className="bg-black text-white hover:bg-gray-800"
            >
              View Full Design
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
export default ProjectSection;