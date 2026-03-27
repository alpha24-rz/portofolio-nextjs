// models/Project.ts
export interface IProject {
    id: string
    title: string
    category: 'frontend' | 'ui-ux' | 'backend' | 'fullstack'
    description: string
    image: string
    tech: string[]
    github: string
    demo: string
    details: string
    createdAt: string
    updatedAt: string
    featured?: boolean
    order?: number
  }