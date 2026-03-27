import 'server-only'
import { supabaseServer } from '@/lib/db/supabase'
import { cache } from 'react'
import { unstable_cache as unstableCache } from 'next/cache'
import type { Project, ProjectMinimal } from '@/types/project'

/**
 * Get single project by ID - dengan React cache
 * React cache mencegah duplicate requests dalam 1 render pass
 */
export const getProjectById = cache(async (id: string): Promise<Project | null> => {
  try {
    const { data, error } = await supabaseServer
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error(`[Database Error] getProjectById(${id}):`, error.message)
      return null
    }

    if (!data) return null

    // Transform data to match Project type
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      category: data.category,
      description: data.description,
      image: data.image,
      tech: Array.isArray(data.tech) ? data.tech : [],
      github: data.github || '',
      demo: data.demo || '',
      details: data.details || '',
      featured: data.featured || false,
      order: data.order || 0,
      created_at: data.created_at,
      updated_at: data.updated_at,
    } as Project
  } catch (error) {
    console.error(`[Database Error] getProjectById(${id}):`, error)
    return null
  }
})

/**
 * Get cached project dengan Next.js ISR
 * Data akan di-cache dan revalidate setiap 1 jam
 */
export const getCachedProject = (id: string) => {
  return unstableCache(
    async () => getProjectById(id),
    ['project', id],
    {
      revalidate: 3600, // 1 hour
      tags: [`project-${id}`, 'projects'],
    }
  )()
}

/**
 * Get all project IDs untuk generateStaticParams
 */
export const getAllProjectIds = cache(async (): Promise<{ id: string }[]> => {
  try {
    const { data, error } = await supabaseServer
      .from('projects')
      .select('id')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[Database Error] getAllProjectIds:', error.message)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[Database Error] getAllProjectIds:', error)
    return []
  }
})

/**
 * Get all projects for listing (minimal data)
 */
export const getAllProjects = cache(async (options?: {
  limit?: number
  featured?: boolean
}): Promise<ProjectMinimal[]> => {
  try {
    let query = supabaseServer
      .from('projects')
      .select('id, title, slug, category, description, image, tech, created_at')
      .order('order', { ascending: true })
      .order('created_at', { ascending: false })

    if (options?.featured !== undefined) {
      query = query.eq('featured', options.featured)
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('[Database Error] getAllProjects:', error.message)
      return []
    }

    return (data || []).map(item => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      category: item.category,
      description: item.description,
      image: item.image,
      tech: Array.isArray(item.tech) ? item.tech : [],
      created_at: item.created_at,
    }))
  } catch (error) {
    console.error('[Database Error] getAllProjects:', error)
    return []
  }
})