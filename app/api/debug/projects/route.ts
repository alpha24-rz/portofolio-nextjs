// BUAT FILE: /app/api/debug/projects/route.ts
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';

export async function GET() {
  let client: MongoClient | null = null;
  
  try {
    client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('portfolio_db');
    const collection = db.collection('projects');
    
    // Get all projects with their IDs
    const projects = await collection.find({}).toArray();
    
    const projectsWithUrls = projects.map(project => ({
      id: project._id.toString(),
      title: project.title,
      category: project.category,
      editUrl: `/admin/projects/edit/${project._id.toString()}`,
      apiUrl: `/api/projects/${project._id.toString()}`
    }));
    
    return NextResponse.json({
      total: projects.length,
      projects: projectsWithUrls
    });
    
  } catch (error) {
    return NextResponse.json({
      error: 'Database error',
      message: error instanceof Error ? error.message : 'Unknown'
    }, { status: 500 });
  } finally {
    if (client) {
      await client.close();
    }
  }
}