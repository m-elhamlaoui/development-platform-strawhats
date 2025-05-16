import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { fileService, sharedFileService } from '@/db/services';
import { writeFile, access, rm } from 'fs/promises';
import path from 'path';


const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
interface Payload {
    userId: number,
    email: string,
    role: string,
    departement: string
}

export async function DELETE(request: Request, { params }: { params: { file: string } }) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };
    const {file} = await params;
    console.log(file);
    const File = await fileService.getFilesByIds([Number(file)]);
    console.log(File);
    if (!(File.length > 0)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    if(File[0].userId !== payload.userId){
      return NextResponse.json({ error: 'Unauthorized to delete file' }, { status: 401 });
    }

    const publicFilePath = path.join(process.cwd(), 'public', File[0].path);


    try {
      await access(publicFilePath); // Check if file exists
      await rm(publicFilePath);  // Delete file from filesystem
      await fileService.deleteFile(Number(file));
    } catch (err) {
      console.error('Error accessing/deleting file:', err);
      return NextResponse.json(
        { error: 'Failed to delete file from filesystem' },
        { status: 500 }
      );
    }

    return NextResponse.json({
        message: 'file deleted succesufully',
    });

    

  } catch (error) {
    console.error('Error deleting files:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
