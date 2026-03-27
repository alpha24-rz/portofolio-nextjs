import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id,title,category')

    if (error) {
      console.error('Supabase debug GET projects error:', error)
      return NextResponse.json({ error: 'Database error', message: error.message }, { status: 500 })
    }

    const projects = (data ?? []).map((project: any) => ({
      id: project.id,
      title: project.title,
      category: project.category,
      editUrl: `/admin/projects/edit/${project.id}`,
      apiUrl: `/api/projects/${project.id}`,
    }))

    return NextResponse.json({ total: projects.length, projects })
  } catch (error) {
    return NextResponse.json({ error: 'Database error', message: error instanceof Error ? error.message : 'Unknown' }, { status: 500 })
  }
}
