// types/project.ts
export interface Project {
  id: string
  title: string
  slug?: string
  category: string
  description: string
  image: string
  tech: string[]
  github: string
  demo: string
  details: string
  featured?: boolean
  order?: number
  created_at: string
  updated_at: string
}

export interface ProjectMinimal {
  id: string
  title: string
  slug?: string
  category: string
  description: string
  image: string
  tech: string[]
  created_at: string
}

export interface ProjectCreateInput {
  title: string
  category: string
  description: string
  image: string
  tech?: string[]
  github?: string
  demo?: string
  details?: string
  featured?: boolean
  order?: number
}

export interface ProjectUpdateInput extends Partial<ProjectCreateInput> {
  id: string
}