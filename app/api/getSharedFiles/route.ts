// app/api/shared-files/route.ts or similar path

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { fileService, sharedFileService, departmentService } from '@/db/services';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

// Define types
interface Payload {
  userId: number;
  email: string;
  role: string;
  departement: string;
}

interface SharedFile {
  id: number; fileId: number;
  senderId: number;
  departement: string;
  createdAt: string | null;
}

export async function GET(request: Request) {
  try {
    // Step 1: Get auth token
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Step 2: Verify JWT and extract user data
    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };

    // Step 3: Fetch collaborations for current department
    const colabs = await departmentService.getCollaboratingDepartements(payload.departement);

    // Step 4: Fetch shared files from collaborating departments
    let sharedColabFiles: SharedFile[] = [];

    if (colabs.length > 0) {
      const colabPromises = colabs.map(async (colab) => {
        const otherDepartement =
          colab.sourceDepartement === payload.departement
            ? colab.targetDepartement
            : colab.sourceDepartement;

        return await sharedFileService.getDepartmentSharedFiles(otherDepartement);
      });

      const colabFilesArrays = await Promise.all(colabPromises);
      sharedColabFiles = colabFilesArrays.flat(); // Flatten arrays
    }

    // Step 5: Get files shared directly with the user
    const FilesSharedBySender = await sharedFileService.getSharedFilesByReceiver(payload.userId);

    // Step 6: Get files shared in the department (including collaboration files)
    const FilesSharedInDepartement = await sharedFileService.getDepartmentSharedFiles(payload.departement);

    const filesSharedById = FilesSharedBySender ?? [];
    const filesSharedInDept = [...(FilesSharedInDepartement ?? []), ...sharedColabFiles];

    // Step 7: Check if no files found
    if (
      (filesSharedById.length === 0 && !filesSharedById) ||
      (filesSharedInDept.length === 0 && !filesSharedInDept)
    ) {
      return NextResponse.json(
        { error: 'No files are shared with you' },
        { status: 404 }
      );
    }

    // Step 8: Extract unique file IDs to fetch full file details
    const FileIds = [
      ...new Set([
        ...filesSharedById.map((f) => f.fileId),
        ...filesSharedInDept.map((f) => f.fileId),
      ]),
    ];

    // Step 9: Get actual files by ID
    const result = await fileService.getFilesByIds(FileIds);

    // Step 10: Return final response
    return NextResponse.json({
      message: 'Shared files fetched successfully',
      sharedFiles: result,
    });

  } catch (error) {
    console.error('Error fetching shared files:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}