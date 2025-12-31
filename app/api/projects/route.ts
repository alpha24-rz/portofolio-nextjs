import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db('portfolio_db');
    const collection = db.collection('projects');
    
    // Get all projects, sorted by creation date (newest first)
    const projects = await collection.find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Convert ObjectId to string for each project
    const serializedProjects = projects.map(project => ({
      ...project,
      _id: project._id.toString(),
      id: project._id.toString()
    }));
    
    await client.close();
    return NextResponse.json(serializedProjects);
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch projects from database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required' },
        { status: 400 }
      );
    }
    
    const client = await connectToDatabase();
    const db = client.db('portfolio_db');
    const collection = db.collection('projects');
    
    const projectData = {
      ...data,
      tech: Array.isArray(data.tech) ? data.tech : 
            typeof data.tech === 'string' ? data.tech.split(',').map((t: string) => t.trim()) : [],
      createdAt: new Date(),
      updatedAt: new Date(),
      featured: data.featured || false,
      order: data.order || 0
    };
    
    const result = await collection.insertOne(projectData);
    
    await client.close();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Project created successfully',
      projectId: result.insertedId.toString(),
      project: {
        ...projectData,
        _id: result.insertedId.toString(),
        id: result.insertedId.toString()
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}