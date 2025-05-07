import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { writeFile, access, mkdir } from 'fs/promises';
import path from 'path';
import { createReadStream } from 'fs';
import { fileService } from '@/db/services';

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
    // Images
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    // PDF
    'application/pdf': '.pdf',
    // Word
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    // Excel
    'application/vnd.ms-excel': '.xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  };

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

    const files = formData.getAll('file').filter(f => f instanceof File) as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: 'No valid files provided' }, { status: 400 });
    }

    // Validate file types
    const invalidFiles = files.filter(file => !Object.keys(ALLOWED_TYPES).includes(file.type));

    if (invalidFiles.length > 0) {
      const rejectedFileNames = invalidFiles.map(f => f.name);
      return NextResponse.json({
        error: 'Some files are not allowed.',
        rejectedFiles: rejectedFileNames,
        allowedTypes: Object.values(ALLOWED_TYPES),
      }, { status: 400 });
    }

    const uploadedFiles = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${sanitizeFilename(file.name)}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);

      uploadedFiles.push({
        name: fileName,
        type: file.type,
        size: file.size,
        path: `/files/${fileName}`,
        owner: payload.userId,
      });
    }

    // Save each file in DB
    for (const file of uploadedFiles) {
      await fileService.createFile(file.name, file.type, file.size, file.path, file.owner);
    }

    return NextResponse.json({
      message: 'Files uploaded successfully',
      files: uploadedFiles,
    });

  } catch (error) {
    console.error('Error uploading files:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}