// app/api/admin/projects/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/db/supabase' // Ubah ke supabaseServer
import { getTokenFromCookie, validateSessionToken } from '@/lib/auth'

// Helper untuk validasi UUID
function isValidUUID(id: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(id)
}

// Helper untuk autentikasi
function checkAuth(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie')
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

// GET /api/admin/projects/[id] - Get single project (admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Autentikasi
    const authError = checkAuth(request)
    if (authError) return authError

    // Validasi ID
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid project id' },
        { status: 400 }
      )
    }

    // Validasi format UUID
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID format' },
        { status: 400 }
      )
    }

    const { data: project, error } = await supabaseServer
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        )
      }
      console.error('[Admin API] GET project error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch project', details: error.message },
        { status: 500 }
      )
    }

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Mapping response
    const mappedProject = {
      ...project,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    }

    return NextResponse.json(mappedProject)
  } catch (error) {
    console.error('[Admin API] GET project error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project', details: (error as Error).message },
      { status: 500 }
    )
  }
}

// PUT /api/admin/projects/[id] - Update project (admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Autentikasi
    const authError = checkAuth(request)
    if (authError) return authError

    // Validasi ID
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid project id' },
        { status: 400 }
      )
    }

    // Validasi format UUID
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID format' },
        { status: 400 }
      )
    }

    // Parse request body
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

    // Validasi required fields
    if (!updateData.title?.trim() || !updateData.description?.trim()) {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: 'Title and description are required',
        },
        { status: 400 }
      )
    }

    // Prepare update object
    const updateObject = {
      title: updateData.title.trim(),
      category: updateData.category || 'frontend',
      description: updateData.description.trim(),
      details: updateData.details?.trim() || '',
      image: updateData.image || '',
      tech: Array.isArray(updateData.tech)
        ? updateData.tech
        : typeof updateData.tech === 'string'
        ? updateData.tech.split(',').map((t: string) => t.trim())
        : [],
      github: updateData.github || '',
      demo: updateData.demo || '',
      featured: Boolean(updateData.featured),
      order: Number(updateData.order) || 0,
      updated_at: new Date().toISOString(),
    }

    const { data: updatedProject, error } = await supabaseServer
      .from('projects')
      .update(updateObject)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 404 }
        )
      }
      console.error('[Admin API] PUT project error:', error)
      return NextResponse.json(
        { error: 'Failed to update project', details: error.message },
        { status: 500 }
      )
    }

    const mappedProject = {
      ...updatedProject,
      createdAt: updatedProject.created_at,
      updatedAt: updatedProject.updated_at,
    }

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      project: mappedProject,
    })
  } catch (error) {
    console.error('[Admin API] PUT project error:', error)
    return NextResponse.json(
      { error: 'Failed to update project', details: (error as Error).message },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/projects/[id] - Delete project (admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Autentikasi
    const authError = checkAuth(request)
    if (authError) return authError

    // Validasi ID
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return NextResponse.json(
        { error: 'Missing or invalid project id' },
        { status: 400 }
      )
    }

    // Validasi format UUID
    if (!isValidUUID(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID format' },
        { status: 400 }
      )
    }

    // Cek apakah project ada sebelum delete (opsional)
    const { data: existingProject, error: checkError } = await supabaseServer
      .from('projects')
      .select('id')
      .eq('id', id)
      .single()

    if (checkError || !existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    const { error } = await supabaseServer
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('[Admin API] DELETE project error:', error)
      return NextResponse.json(
        { error: 'Failed to delete project', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
      deletedId: id,
    })
  } catch (error) {
    console.error('[Admin API] DELETE project error:', error)
    return NextResponse.json(
      { error: 'Failed to delete project', details: (error as Error).message },
      { status: 500 }
    )
  }
}