// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/db/supabase'

// GET /api/projects - Get all projects (untuk listing)
export async function GET(request: NextRequest) {
  try {
    // Ambil query parameters untuk filtering
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode') // 'minimal' atau undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const featured = searchParams.get('featured') === 'true'

    // Build query
    let query = supabaseServer
      .from('projects')
      .select(mode === 'minimal' ? 'id, title, slug, category, image' : '*')
      .order('order', { ascending: true })
      .order('created_at', { ascending: false })

    if (featured) {
      query = query.eq('featured', true)
    }

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('[API Error] GET /api/projects:', error.message)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }

    // Cache headers
    const headers = new Headers()
    headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')

    return NextResponse.json(data || [], { headers })
  } catch (error) {
    console.error('[API Error] GET /api/projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new project (admin only)
export async function POST(request: NextRequest) {
  // Auth check - sesuaikan dengan sistem auth Anda
  const authHeader = request.headers.get('authorization')
  const adminToken = process.env.ADMIN_API_TOKEN
  
  if (adminToken && authHeader !== `Bearer ${adminToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Validasi required fields
    if (!body.title || !body.category || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, category, description' },
        { status: 400 }
      )
    }

    const projectData = {
      ...body,
      tech: Array.isArray(body.tech) ? body.tech : 
            typeof body.tech === 'string' ? body.tech.split(',').map((t: string) => t.trim()) : [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabaseServer
      .from('projects')
      .insert(projectData)
      .select()
      .single()

    if (error) {
      console.error('[API Error] POST /api/projects:', error.message)
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error('[API Error] POST /api/projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}