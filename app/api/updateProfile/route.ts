import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { writeFile, access, mkdir, rm } from 'fs/promises';
import path from 'path';
import { fileService, userService } from '@/db/services';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

interface Payload {
  userId: number;
  email: string;
  role: string;
  departement: string;
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
}

async function ensureUploadDir(uploadDir: string) {
  try {
    await access(uploadDir);
  } catch {
    await mkdir(uploadDir, { recursive: true });
  }
}

// Allowed file extensions and MIME types
const ALLOWED_TYPES = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'You need to be logged in' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };

    const uploadDir = path.join(process.cwd(), 'public', 'files');
    await ensureUploadDir(uploadDir);

    const rawFile = formData.get('file');

    if (!rawFile || !(rawFile instanceof File)) {
      return NextResponse.json({ error: 'No valid files provided' }, { status: 400 });
    }

    const file = rawFile as File;

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds limit (5MB)' },
        { status: 413 }
      );
    }

    if (!Object.keys(ALLOWED_TYPES).includes(file.type)) {
      return NextResponse.json({
        error: 'File type not allowed',
        allowedTypes: Object.values(ALLOWED_TYPES),
      }, { status: 400 });
    }

    
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${sanitizeFilename(file.name)}`;
    const filePath = path.join(uploadDir, fileName);
    //const absoluteFilePath = path.join(process.cwd(), 'public', filePath);

    // Delete old image if exists
    const user = await userService.getUserById(payload.userId);
    if (user?.profileImage && user.profileImage !== "/images/avatar.png") {
      const publicFilePath = path.join(process.cwd(), 'public', user.profileImage);
      try {
        await access(publicFilePath);
        await rm(publicFilePath);
      } catch (err) {
        console.warn(`Could not delete old profile image: ${publicFilePath}`, err);
      }
    }

    // Write new image
    await writeFile(filePath, buffer);

    // Update DB with relative path
    await userService.updateUser(payload.userId, { profileImage: `/files/${fileName}` });

    return NextResponse.json({
      message: 'Profile image uploaded successfully',
      profileImage: `/files/${fileName}`,
    });

  } catch (error) {
    console.error('Error uploading profile image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}