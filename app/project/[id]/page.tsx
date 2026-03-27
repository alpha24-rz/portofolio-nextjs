import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCachedProject, getAllProjectIds } from '@/lib/db/queries/projects'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

// Generate static paths untuk semua project
export async function generateStaticParams() {
  const projects = await getAllProjectIds()
  return projects.map(({ id }) => ({ id }))
}

// Dynamic metadata untuk SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const project = await getCachedProject(id)

  if (!project) {
    return {
      title: 'Project Not Found',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description.substring(0, 160),
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  }
}

// Main page component
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = await getCachedProject(id)

  if (!project) {
    notFound()
  }

  // JSON-LD untuk rich snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    image: project.image,
    applicationCategory: 'Portfolio',
    operatingSystem: 'Web',
    keywords: project.tech.join(', '),
    datePublished: project.created_at,
    dateModified: project.updated_at,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto px-6 pt-8 pb-16 space-y-8">
          {/* Back Navigation */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            prefetch={true}
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Projects</span>
          </Link>

          {/* Hero Image */}
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-border bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
              className="object-cover"
              quality={90}
            />
            <div className="absolute top-4 right-4">
              <span className="bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1 text-xs font-medium text-foreground">
                {project.category}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <header>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </header>

          {/* Details Content */}
          <article>
            <div
              className="bg-muted/30 border border-border rounded-xl px-6 py-5 text-muted-foreground leading-relaxed prose prose-neutral dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: project.details }}
            />
          </article>

          {/* Tech Stack */}
          <section>
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-muted border border-border rounded-full px-3 py-1.5 text-sm text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            {project.github && (
              <Button
                className="flex-1 gap-2"
                size="lg"
                asChild
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <Github className="h-4 w-4" />
                  View Source Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button
                variant="outline"
                className="flex-1 gap-2"
                size="lg"
                asChild
              >
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>

          {/* Last Updated */}
          <p className="text-xs text-muted-foreground text-center">
            Last updated: {new Date(project.updated_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </main>
    </>
  )
}