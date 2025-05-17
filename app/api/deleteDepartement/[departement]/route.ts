import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { fileService, userService, categoryService, sharedFileService } from '@/db/services';
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
  { params }: { params: { departement: string } }
) {
  try {
    // Verify auth
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: Payload };

    if (payload.role !== 'platform_admin') {
      return NextResponse.json({ error: 'Unauthorized to delete user' }, { status: 403 });
    }

    const { departement } = await params;
    const deptId = Number(departement);

    const Departement = await userService.getUserById(deptId);

    if (!Departement) {
      return NextResponse.json({ error: 'departement not found' }, { status: 404 });
    }

    const DepartementUsers = await userService.getUsersByDepartement(Departement.departement);
    const DepartementUsersIds = DepartementUsers.map((user) => user.id);

    const files = await fileService.getFilesByUsersIds(DepartementUsersIds);

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

    await sharedFileService.deleteSharedFilesBydepartement(Departement.departement);
    await sharedFileService.deleteSharedFilesByChangersIds(DepartementUsersIds);
    await fileService.deleteFilesByUsersIds(DepartementUsersIds);
    await categoryService.deleteCategoryByUsersIds(DepartementUsersIds);
    await userService.deleteUsersByIds(DepartementUsersIds);


    

    return NextResponse.json({
      message: 'Departement deleted succefully',
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}