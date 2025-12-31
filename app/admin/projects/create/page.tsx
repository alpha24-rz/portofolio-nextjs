// app/admin/project/create/page.tsx

"use client"

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Link, 
  Tag, 
  Upload, 
  X 
} from 'lucide-react'

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

export default function CreateProject() {
  const [formData, setFormData] = useState({
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
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()


  // Handle file selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, GIF, etc.)')
      return
    }
    
    // Validasi ukuran file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB')
      return
    }
    
    setImageFile(file)
    setError('')
    
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview('')
    setFormData({...formData, image: ''})
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    setUploadProgress(0)

    try {
      // Basic validation
      if (!formData.title.trim()) {
        throw new Error('Project title is required')
      }
      if (!formData.description.trim()) {
        throw new Error('Project description is required')
      }
      if (!formData.details.trim()) {
        throw new Error('Project details are required')
      }
      if (!formData.title.trim()) {
        throw new Error('Project title is required')
      }
      if (!formData.description.trim()) {
        throw new Error('Project description is required')
      }

      let imageUrl = formData.image
      
      // Jika ada file yang diupload
      if (imageFile) {
        const formDataToSend = new FormData()
        formDataToSend.append('image', imageFile)
        
        // Upload gambar ke API
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formDataToSend
        })
        
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          throw new Error(errorData.error || 'Failed to upload image')
        }
        
        const uploadData = await uploadResponse.json()
        imageUrl = uploadData.url
        setUploadProgress(100)
      }

      const projectData = {
        ...formData,
        image: imageUrl,
        tech: formData.tech.split(',').map(t => t.trim()).filter(t => t.length > 0)
      }
      

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Project created successfully!')
        setTimeout(() => {
          router.push('/admin/projects')
        }, 1500)
      } else {
        throw new Error(data.error || 'Failed to create project')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/admin/projects')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
          <p className="text-gray-600 mt-1">Add a new project to your portfolio</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-6 bg-red-50 border-red-200">
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <AlertDescription className="text-green-700">
                  {success}
                </AlertDescription>
              </Alert>
            )}

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

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the project (appears in listings)"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  required
                  disabled={loading}
                />
                <p className="text-xs text-gray-500">Keep it concise, around 1-2 sentences</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Project Details *</Label>
                <Textarea
                  id="details"
                  placeholder="Detailed description of the project, technologies used, challenges faced, solutions implemented..."
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                  rows={6}
                  required
                  disabled={loading}
                />
                <p className="text-xs text-gray-500">Full project story and implementation details</p>
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="tech">Technologies Used</Label>
                  <Tag className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  id="tech"
                  placeholder="React, TypeScript, MongoDB (comma separated)"
                  value={formData.tech}
                  onChange={(e) => setFormData({...formData, tech: e.target.value})}
                  disabled={loading}
                />
                
                {/* Selected Tech Tags */}
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
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Suggestions */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Quick add:</p>
                  <div className="flex flex-wrap gap-2">
                    {techSuggestions.map((tech, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => addTechSuggestion(tech)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg transition-colors"
                        disabled={currentTech.includes(tech)}
                      >
                        + {tech}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* BAGIAN GAMBAR YANG DIUBAH */}
              <div className="space-y-4">
                <Label>Project Image</Label>
                
                {/* Upload File Section */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                    id="file-upload"
                  />
                  
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mx-auto max-h-64 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        Selected: {imageFile?.name}
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <Label 
                        htmlFor="file-upload" 
                        className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Click to upload image
                      </Label>
                      <p className="text-sm text-gray-500 mt-2">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </>
                  )}
                </div>
                
                {/* Progress Bar */}
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                
                {/* Atau Masukkan URL (Alternatif) */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="h-4 w-4 text-gray-400" />
                    <Label htmlFor="image-url">Or enter image URL</Label>
                  </div>
                  <Input
                    id="image-url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    disabled={loading || !!imageFile}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty if uploading file above
                  </p>
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
                  />
                  <p className="text-xs text-gray-500">Lower numbers appear first</p>
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  disabled={loading}
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Mark as Featured Project
                </Label>
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
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Creating Project...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save className="mr-2 h-4 w-4" />
                      Create Project
                    </span>
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