import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  tech: string[]
  github: string
  demo: string
  details: string
}

interface Props {
  params: { id: string }
}

async function getProject(id: string): Promise<Project | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/projects/${id}`, {
      cache: 'no-store'
    })

    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const project = await getProject(id)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) notFound()

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-16 space-y-8">

        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Image */}
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-border bg-muted">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute top-4 right-4">
            <span className="bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-xs text-muted-foreground">
              {project.category}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div>
          <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
            {project.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {project.description}
          </p>
        </div>

        {/* Details */}
        <div className="bg-muted/50 border border-border rounded-xl px-5 py-4 text-sm text-muted-foreground leading-relaxed">
          {project.details}
        </div>

        {/* Tech Stack */}
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
            Technologies
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech?.map((tech: string) => (
              <span
                key={tech}
                className="bg-muted border border-border rounded-full px-3 py-1.5 text-xs text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-border">
          <Button className="flex-1 gap-2" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              View Code
            </a>
          </Button>
          <Button variant="outline" className="flex-1 gap-2" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          </Button>
        </div>

      </div>
    </main>
  )
}