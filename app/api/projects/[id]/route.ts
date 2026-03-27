// app/api/projects/[id]/route.ts (public API)
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 })
    }

    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
      console.error('Supabase GET project error:', error)
      return NextResponse.json({ error: 'Failed to fetch project', details: error.message }, { status: 500 })
    }

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const mappedProject = {
      ...project,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    }

    return NextResponse.json(mappedProject)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}
