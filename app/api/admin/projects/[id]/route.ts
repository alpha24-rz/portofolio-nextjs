// app/api/admin/projects/[id]/route.ts

import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';
import { getTokenFromCookie, validateSessionToken } from '@/lib/auth';

const uri = process.env.MONGODB_URI || '';

async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

// Helper untuk auth check
function checkAuth(request: Request) {
  const cookieHeader = (request.headers as any).get('cookie') as string | null;
  const token = getTokenFromCookie(cookieHeader);
  
  if (!token || !validateSessionToken(token)) {
    return NextResponse.json({ 
      error: 'Unauthorized',
      message: 'Session expired or invalid'
    }, { status: 401 });
  }
  return null;
}

// GET - Get single project
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🔍 GET request for project id:', id);
    
    // Auth check
    const authError = checkAuth(request);
    if (authError) return authError;

    if (!id) {
      return NextResponse.json({ 
        error: 'Missing project id' 
      }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ 
        error: 'Invalid project ID format' 
      }, { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db('portfolio_db');
    const collection = db.collection('projects');

    const project = await collection.findOne({ 
      _id: new ObjectId(id) 
    });

    await client.close();

    if (!project) {
      return NextResponse.json({ 
        error: 'Project not found' 
      }, { status: 404 });
    }

    // Convert _id to string for client
    const responseData = {
      ...project,
      _id: project._id.toString(),
      id: project._id.toString()
    };

    console.log('✅ Project found:', id);
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('❌ GET project error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch project',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// PUT - Update project
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('✏️ PUT request for project id:', id);
    
    // Auth check
    const authError = checkAuth(request);
    if (authError) return authError;

    if (!id) {
      return NextResponse.json({ 
        error: 'Missing project id' 
      }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ 
        error: 'Invalid project ID format' 
      }, { status: 400 });
    }

    // Parse request body
    let updateData;
    try {
      updateData = await request.json();
      console.log('📦 Update data received:', updateData);
    } catch (parseError) {
      return NextResponse.json({ 
        error: 'Invalid JSON payload',
        message: parseError instanceof Error ? parseError.message : 'Failed to parse request body'
      }, { status: 400 });
    }

    // Validasi required fields
    if (!updateData.title?.trim()) {
      return NextResponse.json({ 
        error: 'Validation error',
        message: 'Project title is required'
      }, { status: 400 });
    }

    if (!updateData.description?.trim()) {
      return NextResponse.json({ 
        error: 'Validation error',
        message: 'Project description is required'
      }, { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db('portfolio_db');
    const collection = db.collection('projects');

    // Check if project exists
    const existingProject = await collection.findOne({ 
      _id: new ObjectId(id) 
    });

    if (!existingProject) {
      await client.close();
      return NextResponse.json({ 
        error: 'Project not found' 
      }, { status: 404 });
    }

    // Prepare update object
    const updateObject = {
      title: updateData.title?.trim(),
      category: updateData.category || 'frontend',
      description: updateData.description?.trim(),
      details: updateData.details?.trim() || '',
      image: updateData.image || '',
      tech: Array.isArray(updateData.tech) ? updateData.tech : [],
      github: updateData.github || '',
      demo: updateData.demo || '',
      featured: Boolean(updateData.featured),
      order: Number(updateData.order) || 0,
      updatedAt: new Date()
    };

    // Update project
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateObject }
    );

    await client.close();

    if (result.modifiedCount === 0 && result.matchedCount === 1) {
      console.log('ℹ️ No changes detected for project:', id);
      return NextResponse.json({
        success: true,
        message: 'No changes detected',
        projectId: id
      });
    }

    console.log('✅ Project updated successfully:', id);
    return NextResponse.json({
      success: true,
      message: 'Project updated successfully',
      projectId: id,
      modifiedCount: result.modifiedCount,
      data: updateObject
    });

  } catch (error) {
    console.error('❌ PUT project error:', error);
    return NextResponse.json({ 
      error: 'Failed to update project',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE - Delete project
export async function DELETE(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('🔧 DELETE request for project id:', id);
    
    // Auth check
    const authError = checkAuth(request);
    if (authError) return authError;

    if (!id) {
      return NextResponse.json({ error: 'Missing project id' }, { status: 400 });
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid project ID format' }, { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db('portfolio_db');
    const collection = db.collection('projects');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    await client.close();

    if (result.deletedCount && result.deletedCount > 0) {
      console.log('✅ Project deleted successfully:', id);
      return NextResponse.json({ 
        success: true, 
        message: 'Project deleted',
        deletedId: id
      });
    }

    console.log('⚠️ Project not found:', id);
    return NextResponse.json({ 
      success: false, 
      message: 'Project not found' 
    }, { status: 404 });
    
  } catch (error) {
    console.error('❌ Delete project error:', error);
    return NextResponse.json({ 
      error: 'Failed to delete project',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}