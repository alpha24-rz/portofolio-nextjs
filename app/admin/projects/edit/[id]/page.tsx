"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Save, RefreshCw, Image as ImageIcon, Link, Tag } from 'lucide-react'

const categories = [
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'fullstack', label: 'Fullstack Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'devops', label: 'DevOps' }
]

const techSuggestions = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS',
  'Node.js', 'Express', 'MongoDB', 'MySQL', 'PostgreSQL',
  'Docker', 'AWS', 'Firebase', 'Figma', 'Adobe XD',
  'GraphQL', 'REST API', 'Git', 'GitHub', 'Vercel'
]

interface ProjectData {
  title: string
  category: string
  description: string
  image: string
  tech: string
  github: string
  demo: string
  details: string
  featured: boolean
  order: number
}

// Fungsi untuk validasi MongoDB ObjectId
function isValidObjectId(id: string): boolean {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

// Komponen utama yang menggunakan Suspense
function EditProjectContent() {
  const [formData, setFormData] = useState<ProjectData>({
    title: '',
    category: 'frontend',
    description: '',
    image: '',
    tech: '',
    github: '',
    demo: '',
    details: '',
    featured: false,
    order: 0
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  
  // PERBAIKAN: Gunakan useParams dengan benar (Next.js 15)
  const params = useParams()
  
  // PERBAIKAN: Pastikan params.id ada dan valid
  const id = params?.id as string

  useEffect(() => {
    console.log('🔄 EditProject component mounted');
    console.log('📌 URL params:', params);
    console.log('🆔 Project ID from params:', id);
    
    if (id) {
      fetchProject()
    } else {
      setError('No project ID found in URL')
      setFetching(false)
    }
  }, [id]) // Hanya depend on id

  const fetchProject = async () => {
    try {
      setFetching(true)
      setError('')
      
      console.log(`🔄 Starting fetch for project ID: "${id}"`)
      
      // Validasi ID sebelum fetch
      if (!id || typeof id !== 'string') {
        throw new Error('Invalid project ID')
      }
      
      if (!isValidObjectId(id)) {
        throw new Error(`Invalid project ID format: "${id}". Must be a 24-character hex string.`)
      }
      
      const apiUrl = `/api/projects/${id}`
      console.log(`📡 Calling API: ${apiUrl}`)
      
      const response = await fetch(apiUrl, {
        cache: 'no-store',
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      })
      
      console.log(`📊 Response status: ${response.status}`)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        switch (response.status) {
          case 400:
            throw new Error(`Bad request: ${errorData.error || 'Invalid ID format'}`)
          case 404:
            throw new Error('Project not found. It may have been deleted.')
          case 500:
            throw new Error('Server error. Please try again later.')
          default:
            throw new Error(`Failed to fetch project: ${response.status}`)
        }
      }
      
      const data = await response.json()
      console.log('✅ Project data received:', { 
        id: data.id, 
        title: data.title,
        hasTech: Array.isArray(data.tech)
      })
      
      // Format tech dari array ke string
      const techString = Array.isArray(data.tech) 
        ? data.tech.join(', ')
        : typeof data.tech === 'string'
          ? data.tech
          : ''
      
      setFormData({
        title: data.title || '',
        category: data.category || 'frontend',
        description: data.description || '',
        image: data.image || '',
        tech: techString,
        github: data.github || '',
        demo: data.demo || '',
        details: data.details || '',
        featured: Boolean(data.featured),
        order: Number(data.order) || 0
      })
      
    } catch (err) {
      console.error('❌ Fetch error details:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to load project'
      setError(errorMessage)
      
      // Set form data kosong untuk error state
      setFormData({
        title: '',
        category: 'frontend',
        description: '',
        image: '',
        tech: '',
        github: '',
        demo: '',
        details: '',
        featured: false,
        order: 0
      })
      
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Validasi form
      const validations = [
        { condition: !formData.title.trim(), message: 'Project title is required' },
        { condition: !formData.description.trim(), message: 'Project description is required' },
        { condition: !formData.details.trim(), message: 'Project details are required' },
        { condition: formData.tech.split(',').filter(t => t.trim()).length === 0, message: 'At least one technology is required' }
      ]
      
      for (const validation of validations) {
        if (validation.condition) {
          throw new Error(validation.message)
        }
      }

      // Siapkan data untuk API
      const projectData = {
        ...formData,
        tech: formData.tech.split(',')
          .map(t => t.trim())
          .filter(t => t.length > 0),
        order: Number(formData.order) || 0,
        featured: Boolean(formData.featured)
      }

      console.log('📤 Sending update for project:', id)
      
      const response = await fetch(`/api/admin/projects/${id}`, { // PERBAIKAN: Gunakan admin route
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(projectData)
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin/login?expired=true')
          return
        }
        throw new Error(data.error || data.message || `Update failed: ${response.status}`)
      }

      setSuccess('Project updated successfully! Redirecting...')
      
      setTimeout(() => {
        router.push('/admin/projects')
        router.refresh() // Refresh cache data projects
      }, 1500)
      
    } catch (err) {
      console.error('Update error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred while updating')
    } finally {
      setLoading(false)
    }
  }

  const addTechSuggestion = (tech: string) => {
    const currentTech = formData.tech.split(',').map(t => t.trim()).filter(t => t.length > 0)
    if (!currentTech.includes(tech)) {
      const newTech = [...currentTech, tech].join(', ')
      setFormData({ ...formData, tech: newTech })
    }
  }

  const removeTech = (techToRemove: string) => {
    const currentTech = formData.tech.split(',').map(t => t.trim()).filter(t => t.length > 0)
    const newTech = currentTech.filter(t => t !== techToRemove).join(', ')
    setFormData({ ...formData, tech: newTech })
  }

  const currentTech = formData.tech.split(',').map(t => t.trim()).filter(t => t.length > 0)

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project details...</p>
          {id && <p className="text-sm text-gray-500 mt-2">ID: {id}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/admin/projects')}
            className="mb-4 text-gray-600 hover:text-gray-900"
            disabled={loading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {formData.title || 'Edit Project'}
              </h1>
              <p className="text-gray-600 mt-1">
                {id ? `Editing project: ${id.substring(0, 8)}...` : 'Update project details'}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={fetchProject}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                disabled={loading || fetching}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reload
              </Button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
            <div className="mt-3 flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/admin/projects')}
                className="border-red-300 text-red-600 hover:bg-red-100"
              >
                Back to Projects
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchProject}
                className="border-red-300 text-red-600 hover:bg-red-100"
              >
                Try Again
              </Button>
            </div>
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-700">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., E-commerce Platform"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    disabled={loading}
                    className="disabled:bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                    disabled={loading}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description (appears in listings)"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500">1-2 sentences for listings</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Project Details *</Label>
                  <Textarea
                    id="details"
                    placeholder="Detailed project story, challenges, solutions..."
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    rows={6}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-500">Full implementation details</p>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tech">Technologies Used *</Label>
                    <Tag className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="tech"
                    placeholder="React, TypeScript, MongoDB (comma separated)"
                    value={formData.tech}
                    onChange={(e) => setFormData({...formData, tech: e.target.value})}
                    disabled={loading}
                  />
                  
                  {currentTech.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentTech.map((tech, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => removeTech(tech)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            disabled={loading}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tech Suggestions */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Quick add:</p>
                  <div className="flex flex-wrap gap-2">
                    {techSuggestions.map((tech) => (
                      <button
                        key={tech}
                        type="button"
                        onClick={() => addTechSuggestion(tech)}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                          currentTech.includes(tech)
                            ? 'bg-blue-600 text-white cursor-default'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                        disabled={loading || currentTech.includes(tech)}
                      >
                        {currentTech.includes(tech) ? '✓ ' : '+ '}{tech}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* URLs & Order */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-gray-400" />
                    <Label htmlFor="image">Image URL</Label>
                  </div>
                  <Input
                    id="image"
                    placeholder="/projects/project-name.png or https://..."
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <Label htmlFor="github">GitHub Repository</Label>
                  </div>
                  <Input
                    id="github"
                    placeholder="https://github.com/username/repository"
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                    type="url"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Link className="h-4 w-4 text-gray-400" />
                    <Label htmlFor="demo">Live Demo URL</Label>
                  </div>
                  <Input
                    id="demo"
                    placeholder="https://project-demo.vercel.app"
                    value={formData.demo}
                    onChange={(e) => setFormData({...formData, demo: e.target.value})}
                    type="url"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    placeholder="0"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                    disabled={loading}
                    min="0"
                  />
                  <p className="text-xs text-gray-500">Lower numbers appear first</p>
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  disabled={loading}
                />
                <Label htmlFor="featured" className="cursor-pointer font-medium">
                  Mark as Featured Project
                </Label>
                <span className="text-xs text-gray-500 ml-auto">
                  {formData.featured ? 'Will appear in featured section' : 'Will not appear in featured section'}
                </span>
              </div>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/admin/projects')}
                  className="flex-1 sm:flex-none border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
                  disabled={loading || fetching}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Update Project
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Wrap dengan Suspense
export default function EditProject() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project editor...</p>
        </div>
      </div>
    }>
      <EditProjectContent />
    </Suspense>
  )
}