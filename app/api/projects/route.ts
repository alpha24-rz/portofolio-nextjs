import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase GET projects error:', error)
      return NextResponse.json({ error: 'Failed to fetch projects', details: error.message }, { status: 500 })
    }

    const projects = (data ?? []).map((project: any) => ({
      ...project,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    }))

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch projects from database',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      )
    }

    const projectData = {
      ...data,
      tech: Array.isArray(data.tech)
        ? data.tech
        : typeof data.tech === 'string'
        ? data.tech.split(',').map((t: string) => t.trim())
        : [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      featured: Boolean(data.featured),
      order: Number(data.order) || 0,
    }

    const { data: insertedProject, error } = await supabase
      .from('projects')
      .insert(projectData)
      .single()

    if (error) {
      console.error('Supabase POST create project error:', error)
      return NextResponse.json({ error: 'Failed to create project', details: error.message }, { status: 500 })
    }

    const mappedProject = {
      ...insertedProject,
      createdAt: insertedProject.created_at,
      updatedAt: insertedProject.updated_at,
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Project created successfully',
        project: mappedProject,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
