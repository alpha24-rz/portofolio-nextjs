// app/api/projects/[id]/route.ts (public API)
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ 
        error: 'Invalid project ID' 
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

    // Remove sensitive/optional fields for public API
    const { _id, ...rest } = project;
    const responseData = {
      ...rest,
      id: _id.toString()
    };

    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch project' 
    }, { status: 500 });
  }
}