import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { hash } from 'argon2';
import { userService } from '@/db/services';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
interface Payload {
    userId: number,
    email: string,
    role: string,
    departement: string
}

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };

    // Parse request body
    const { category, fileId } = await request.json();
    console.log(category, fileId)

    if (!category || !fileId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user file already added
    const existinguser = await userService.getUserByEmail(email);

    if (existinguser) {
      return NextResponse.json(
        { error: 'user already exist' },
        { status: 400 }
      );
    }

    // Generate random password
    const randomPassword = generateRandomPassword();
    console.log(randomPassword);

    // Hash the password using Argon2
    const hashedPassword = await hash(randomPassword);

    // Create department admin
    await userService.createUser(
      uname,
      hashedPassword,
      email,
      payload.departement,
      'user'
    );

    // Return success response with the generated password
    return NextResponse.json({
      message: 'user created successfully',
      department: {
        name: payload.departement
      },
      admin: {
        email: email,
        name: uname,
        role: 'user'
      },
      password: randomPassword // Include the generated password in the response
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
