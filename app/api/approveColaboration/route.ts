import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { hash } from 'argon2';
import { departmentService } from '@/db/services';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
interface Payload {
    userId: number,
    email: string,
    role: string,
    departement: string
}

export async function POST(request: Request) {
  try {
    // Verify user authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };

    if (payload.role !== 'departement_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
   

    // Parse request body
    const { colab } = await request.json();
    console.log(colab)

    if (!colab) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }



    // approve colabe
    departmentService.approveCollaboration(colab, payload.departement);

    // Return success response 
    return NextResponse.json({
      message: 'colaboration approved successfully',
    });

  } catch (error) {
    console.error('Error approving colaboration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
