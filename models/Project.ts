// models/Project.ts
export interface IProject {
    id: number
    title: string
    category: 'frontend' | 'ui-ux' | 'backend' | 'fullstack'
    description: string
    image: string
    tech: string[]
    github: string
    demo: string
    details: string
    createdAt: Date
    updatedAt: Date
    featured?: boolean
    order?: number
  }