import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { hash } from 'argon2';
import { fileService } from '@/db/services';
import { param } from 'drizzle-orm';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
interface Payload {
    userId: number,
    email: string,
    role: string,
    departement: string
}

// Typescript type for better autocompletion and validation
type FileCategory = 'Pictures' | 'PDFs' | 'Words' | 'Exels';

const MAP_TYPES: Record<FileCategory, string[]> = {
  Pictures: ['image/png', 'image/jpeg', 'image/gif'],
  PDFs: ['application/pdf'],
  Words: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  Exels: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
};

function getMimeTypesForCategory(category: string): string[] {
  const validCategory = category as FileCategory;

  if (!(validCategory in MAP_TYPES)) {
    throw new Error(`Invalid file category: ${category}`);
  }

  return MAP_TYPES[validCategory];
}

export async function GET(request: Request, { params }: { params: { fileType: string } }) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };

    let mimeTypes: string[];
    const { fileType } = await params;

    try {
      mimeTypes = getMimeTypesForCategory(fileType);
    } catch (error) {
      return NextResponse.json(
        { error: `Unsupported file category: ${fileType}` },
        { status: 400 }
      );
    }
    console.log(payload.userId);

    const results = await fileService.getFilesByUserIdAndType(payload.userId, mimeTypes);

    return NextResponse.json({
      message: 'Files fetched successfully',
      files: results,
    });

  } catch (error) {
    console.error('Error fetching files:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}