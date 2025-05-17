import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { fileService, userService, categoryService } from '@/db/services';
import { access, rm } from 'fs/promises';
import path from 'path';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

interface Payload {
  userId: number;
  email: string;
  role: string;
  departement: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: { user: string } }
) {
  try {
    // Verify auth
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };

    if (payload.role !== 'departement_admin') {
      return NextResponse.json({ error: 'Unauthorized to delete user' }, { status: 403 });
    }

    const { user } = await params;
    const userId = Number(user);

    const User = await userService.getUserById(userId);

    if (!User) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Ensure admin and user belong to same department
    if (payload.departement !== User.departement) {
      return NextResponse.json({ error: 'Unauthorized to delete user' }, { status: 403 });
    }

    const files = await fileService.getNotSharedFilesByUserId(userId);

    const uploadDir = path.join(process.cwd(), 'public');
    console.log("dsfkejwekjfne;knew;nr;knvk;jfevkjrbkbrkj", uploadDir);

    // Attempt to delete each file
    for (const file of files) {
      const filePath = path.join(uploadDir, file.path);

      try {
        await access(filePath);
        await rm(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (err) {
        console.error(`Failed to delete file: ${filePath}`, err);
      }
    }

    // Delete files from DB
    await fileService.deleteNotSharedFilesByUserId(userId);

    // Delete category from DB
    await categoryService.deleteCategoryByUserId(userId);

    // Delete user
    await userService.updateUser(userId, {isActive: 0});

    return NextResponse.json({
      message: 'User and associated non-shared files deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}