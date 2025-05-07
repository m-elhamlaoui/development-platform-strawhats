import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    return NextResponse.json({ 
      user: {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
        departement: payload.departement
      }
    });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
} 