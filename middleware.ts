import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the request is for the API
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Skip auth check for login, register, and other public endpoints
    if (
      request.nextUrl.pathname.startsWith('/api/auth/login') ||
      request.nextUrl.pathname.startsWith('/api/auth/register')
    ) {
      return NextResponse.next();
    }

    // Check for token in the authorization header
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: 'Authentication required' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      );
    }
    
    // Let the request through - token validation will happen in the API handlers
    return NextResponse.next();
  }
  
  // For non-API routes, just continue
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/api/expenses/:path*',
    '/api/categories/:path*',
    '/api/export/:path*',
    '/api/report/:path*',
  ],
}; 