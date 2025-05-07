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

function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
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
    //console.log(payload);
    if (payload.role !== 'departement_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Parse request body
    const { uname, email } = await request.json();
    console.log(uname, email)

    if (!uname || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user email already exists
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
