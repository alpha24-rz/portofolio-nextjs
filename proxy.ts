import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { validateSessionToken, getTokenFromCookie } from '@/lib/auth';

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Public routes that don't require authentication
  const publicRoutes = [
    '/', 
    '/admin/login', 
    '/api/admin/login',
    '/api/projects',
    '/api/admin/logout'
  ];
  
  // Check if it's an admin route
  const isAdminRoute = path.startsWith('/admin') || path.startsWith('/api/admin');
  
  // If not an admin route, allow access
  if (!isAdminRoute) {
    return NextResponse.next();
  }
  
  // If it's a public route, allow access
  const isPublicRoute = publicRoutes.some(route => 
    path === route || path.startsWith(route + '/')
  );
  
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // For protected routes, check authentication
  const cookieHeader = request.headers.get('cookie');
  const token = getTokenFromCookie(cookieHeader);
  
  if (!token || !validateSessionToken(token)) {
    // Redirect to login for admin pages
    if (path.startsWith('/admin')) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', path);
      return NextResponse.redirect(loginUrl);
    }
    
    // Return 401 for API routes
    if (path.startsWith('/api/admin')) {
      return NextResponse.json(
        { error: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};