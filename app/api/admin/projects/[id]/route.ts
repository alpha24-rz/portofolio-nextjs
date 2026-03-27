// app/api/admin/projects/[id]/route.ts

import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'
import { getTokenFromCookie, validateSessionToken } from '@/lib/auth'

function checkAuth(request: Request) {
  const cookieHeader = (request.headers as any).get('cookie') as string | null
  const token = getTokenFromCookie(cookieHeader)

  if (!token || !validateSessionToken(token)) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'Session expired or invalid',
      },
      { status: 401 }
    )
  }
  return null
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const authError = checkAuth(request)
    if (authError) return authError

    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json({ error: 'Missing or invalid project id' }, { status: 400 })
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
    console.error('❌ GET project error:', error)
    return NextResponse.json({ error: 'Failed to fetch project', details: (error as Error).message }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const authError = checkAuth(request)
    if (authError) return authError

    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json({ error: 'Missing or invalid project id' }, { status: 400 })
    }

    let updateData
    try {
      updateData = await request.json()
    } catch (parseError) {
      return NextResponse.json(
        {
          error: 'Invalid JSON payload',
          message: (parseError as Error).message,
        },
        { status: 400 }
      )
    }

    if (!updateData.title?.trim() || !updateData.description?.trim()) {
      return NextResponse.json({ error: 'Validation error', message: 'Title and description are required' }, { status: 400 })
    }

    const updateObject = {
      title: updateData.title.trim(),
      category: updateData.category || 'frontend',
      description: updateData.description.trim(),
      details: updateData.details?.trim() || '',
      image: updateData.image || '',
      tech: Array.isArray(updateData.tech) ? updateData.tech : [],
      github: updateData.github || '',
      demo: updateData.demo || '',
      featured: Boolean(updateData.featured),
      order: Number(updateData.order) || 0,
      updated_at: new Date().toISOString(),
    }

    const { data: updatedProject, error } = await supabase
      .from('projects')
      .update(updateObject)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
      console.error('Supabase PUT project error:', error)
      return NextResponse.json({ error: 'Failed to update project', details: error.message }, { status: 500 })
    }

    const mappedProject = {
      ...updatedProject,
      createdAt: updatedProject.created_at,
      updatedAt: updatedProject.updated_at,
    }

    return NextResponse.json({ success: true, message: 'Project updated successfully', project: mappedProject })
  } catch (error) {
    console.error('❌ PUT project error:', error)
    return NextResponse.json({ error: 'Failed to update project', details: (error as Error).message }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const authError = checkAuth(request)
    if (authError) return authError

    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json({ error: 'Missing or invalid project id' }, { status: 400 })
    }

    const { error } = await supabase.from('projects').delete().eq('id', id)

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 })
      }
      console.error('Supabase DELETE project error:', error)
      return NextResponse.json({ error: 'Failed to delete project', details: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Project deleted', deletedId: id })
  } catch (error) {
    console.error('❌ Delete project error:', error)
    return NextResponse.json({ error: 'Failed to delete project', details: (error as Error).message }, { status: 500 })
  }
}
