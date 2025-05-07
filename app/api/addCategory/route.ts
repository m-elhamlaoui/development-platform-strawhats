import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { hash } from 'argon2';
import { categoryService } from '@/db/services';

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
   

    // Parse request body
    const { category } = await request.json();
    console.log(category)

    if (!category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user category already exists
    const existingCategory = await categoryService.getCategoriesByName(category);

    if (existingCategory && existingCategory.length > 0) {
      return NextResponse.json(
        { error: 'category already exist' },
        { status: 400 }
      );
    }


    // Create new Category
    categoryService.createCategory(category, payload.userId);

    // Return success response with the generated password
    return NextResponse.json({
      message: 'category created successfully',
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
