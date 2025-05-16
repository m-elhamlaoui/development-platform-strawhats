import { NextResponse } from 'next/server';
import { userService } from '@/db/services';
import * as argon2 from 'argon2';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';



export async function POST(request: Request) {
  
    const response = NextResponse.json({
      message: "logout successfully",
      logout: true
    });

    // Set cookie in the response
    response.cookies.set({
      name: 'token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 // 24 hours
    });

    return response;
}
