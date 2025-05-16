import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { fileService, sharedFileService, departmentService } from '@/db/services';

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

    

    const FilesSharedBySender = await sharedFileService.getSharedFilesByReceiver(payload.userId);
    const FilesSharedInDepartement = await sharedFileService.getDepartmentSharedFiles(payload.departement);

    if(!FilesSharedBySender && !FilesSharedInDepartement){
        return NextResponse.json(
            { error: 'no files are shared with you' },
            { status: 400 }
          );
    }

    const FileIds = [
        ...new Set([
          ...FilesSharedBySender.map(f => f.fileId),
          ...FilesSharedInDepartement.map(f => f.fileId)
        ])
    ];

    //console.log(FileIds);

    const result = await fileService.getFilesByIds(FileIds);
    //console.log(result);
    return NextResponse.json({
        message: 'shared files shared succesufully',
        sharedFiles: result
      });

    

  } catch (error) {
    console.error('Error fetching shared files:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
