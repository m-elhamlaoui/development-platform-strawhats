// middleware.js
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
interface Payload {
    userId: number;
    email: string;
    role: string;
    departement: string;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log(JWT_SECRET);

  // If no token, redirect to login
  if (!token) {
    console.log('no token');
    if(req.nextUrl.pathname.startsWith('/login')){
      return NextResponse.next();
    }else{
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  try {
    // Verify the token
    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };

    // Check if the user has a role
    if (payload.role !== 'platform_admin' && payload.role !== 'departement_admin' && payload.role !== 'user') {
      console.log('not user');
      if(req.nextUrl.pathname.startsWith('/login')){
        return NextResponse.next();
      }else{
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    if(req.nextUrl.pathname.startsWith('/login')){
      return NextResponse.redirect(new URL(`/space/${payload.userId}`, req.url));
    }

    // Allow access to the admin panel
    return NextResponse.next();
  } catch (err) {
    // Invalid token, redirect to login
    console.error(err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Apply middleware to the space panel routes
export const config = {
  matcher: ['/space/:path*', '/login/:path*'], // Protect all routes under /space
};