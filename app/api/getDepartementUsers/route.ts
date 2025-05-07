import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { userService } from '@/db/services';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
interface Payload {
    userId: number,
    email: string,
    role: string,
    departement: string
}

export async function GET(request: Request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };
    
    if (payload.role !== 'departement_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const results = await userService.getUsersByDepartement(payload.departement);
    console.log(results);
    const filteredResults = results.map((user: any) => ({
        userName: user.name,
        role: user.role,
        imgurl: user.profileImage,
        createdAt: user.createdAt,
      }));
    return NextResponse.json({
        message: 'users fetched succesufuly',
        departments: filteredResults
      });

    

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
