import { NextResponse } from 'next/server';
import { verifyAdmin, generateSessionToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }
    
    if (verifyAdmin(username, password)) {
      const token = generateSessionToken();
      
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login successful',
        user: { username }
      });
      
      // Set session cookie
      response.cookies.set({
        name: 'admin-auth',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
        sameSite: 'strict'
      });
      
      return response;
    }
    
    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
  
  // Clear the cookie
  response.cookies.set({
    name: 'admin-auth',
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0, // Expire immediately
    path: '/',
  });
  
  return response;
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Admin login API',
    endpoints: {
      POST: 'Login with username and password',
      DELETE: 'Logout'
    }
  });
}